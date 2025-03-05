import signal
import sys
import traceback
from threading import Thread
from datetime import datetime
import time
import random
from fubon_neo.sdk import FubonSDK, FutOptOrder, FutOptConditionOrder, Condition, Mode
import os
from dotenv import load_dotenv

""" 富邦新一代API """
sdk = FubonSDK()

class Config:
    def __init__(self):
        load_dotenv()
        self.username = os.getenv('USER_ID')
        self.password = os.getenv('USER_PASSWORD')
        self.credential_filename = os.getenv('PFX_PATH')
        self.ca_password = os.getenv('PFX_PASSWORD')
        self.pong_timeout = 30  # seconds
        self.max_retries = 3
        self.retry_delay = 5  # seconds
        self.reconnect_delay = 30  # seconds

class EventHandler(Thread):
    EVENT_CODES = {
        '100': 'Connection established', # '100': 連線建立成功
        '200': 'Login successful',  # '200': 登入成功
        '201': 'Login warning',  # '201': 登入警示, Ex: 90天未更換密碼
        '300': 'Disconnected', # '300': 斷線
        '301': 'Pong missed',  # '301': 未收到連線pong回傳
        '302': 'Logged out', # '302': 登出, 並斷線
        '500': 'Error' # '500': 錯誤
    }

    def __init__(self, config):
        super().__init__()
        self.config = config
        self.is_login = False
        self.stop = False
        self.daemon = True
        self.last_pong_time = time.time()

    def on_event(self, code, content):
        event_type = self.EVENT_CODES.get(code, 'Unknown event')
        print(f'Event: {event_type} ({code}), Content: {content} [{datetime.now()}]', flush=True)
        
        if code in ['200', '201']:
            self._handle_login_success()
        elif code == '301':
            self._handle_pong_missed()
        elif code in ['300', '302', '500']:
            self._handle_disconnect()

    def _handle_login_success(self):
        self.is_login = True
        self.last_pong_time = time.time()

    def _handle_pong_missed(self):
        if time.time() - self.last_pong_time > self.config.pong_timeout:
            self.is_login = False

    def _handle_disconnect(self):
        self.is_login = False

    def run(self):
        print(f'EventHandler thread started [{datetime.now()}]', flush=True)
        
        try: 
            sdk.set_on_event(self.on_event)
        
            while not self.stop:
                time.sleep(1.0) # working hard               

        except Exception as e:
            print(f'EventHandler thread error: {e} [{datetime.now()}]', flush=True)
        finally:
            sdk.set_on_event(None)  # Remove event handler
            print(f'EventHandler thread stopped [{datetime.now()}]', flush=True)

class Fubon:
    def __init__(self, event_handler, config):
        self.cb = event_handler
        self.config = config
        self.accounts = None
        self.is_login = False
        self._running = True
        self.retry_count = 0

    def login(self):
        while not self.is_login and self._running:
            try:
                self._attempt_login()
            except KeyboardInterrupt:
                self._handle_interrupt()
            except Exception as e:
                self._handle_error(e)

    def stop(self):
        self._running = False

    def logout(self):
        self.is_login = False
        is_logout = sdk.logout()
        if is_logout:
            print(f'成功登出「富邦新一代API」 [{datetime.now()}]', flush=True)
        else:
            print(f'登出「富邦新一代API」錯誤 [{datetime.now()}]', flush=True)


    def _attempt_login(self):
        print(f'Attempting login ({self.retry_count + 1}/{self.config.max_retries}) [{datetime.now()}]', flush=True)
        self.accounts = sdk.login(
            self.config.username,
            self.config.password,
            self.config.credential_filename,
            self.config.ca_password
        ).data

        if self._wait_for_login():
            self._handle_login_success()
        else:
            self._handle_login_failure()

    def _wait_for_login(self, timeout=60):
        start_time = time.time()
        while not self.cb.is_login:
            if time.time() - start_time > timeout:
                print(f'Login timeout [{datetime.now()}]', flush=True)
                return False
            time.sleep(0.1)
        return True

    def _handle_login_success(self):
        self.is_login = True
        self.retry_count = 0
        print(f'成功登入「富邦新一代API」 [{datetime.now()}]', flush=True)

    def _handle_login_failure(self):
        self.is_login = False
        self.retry_count += 1
        if self.retry_count >= self.config.max_retries:
            self._handle_max_retries()
        else:
            print(f'Login failed, retrying in {self.config.retry_delay}s [{datetime.now()}]', flush=True)
            time.sleep(self.config.retry_delay)

    def _handle_max_retries(self):
        print(f'Max retry attempts reached [{datetime.now()}]', flush=True)
        self._running = False

    def _handle_error(self, error):
        print(f'Login error: {error} [{datetime.now()}]', flush=True)
        traceback.print_exc()
        self.retry_count += 1
        if self.retry_count >= self.config.max_retries:
            self._handle_max_retries()
        else:
            print(f'Retrying in {self.config.retry_delay}s [{datetime.now()}]', flush=True)
            time.sleep(self.config.retry_delay)

class SignalHandler:
    def __init__(self):
        self.api = None
        self.cb = None

    def set_resources(self, api, cb):
        self.api = api
        self.cb = cb

    def handle(self, sig, frame):
        print(f'收到 Ctrl+C 訊號! [{datetime.now()}]', flush=True)
        if self.api:
            self.api.stop()
            self.api.logout()
        if self.cb:
            self.cb.stop = True
        sys.exit(0)

# Create a single instance of SignalHandler
signal_handler = SignalHandler()

def main():
    config = Config()
    cb = None
    api = None

    try:
        signal.signal(signal.SIGINT, signal_handler.handle)
        
        while True:  # Add outer loop for continuous operation
            cb = EventHandler(config)
            api = Fubon(cb, config)
            signal_handler.set_resources(api, cb)  # Update signal handler resources

            cb.start()
            api.login()

            # Inner loop for monitoring connection
            while api.is_login and not cb.stop:
                time.sleep(config.retry_delay)
                if not cb.is_login:
                    print(f'Connection lost, attempting reconnection [{datetime.now()}]', flush=True)
                    api.stop()
                    api.logout()
                    cb.stop = True
                    cb.join(timeout=2)  # Wait for thread to stop
                    time.sleep(config.reconnect_delay)
                    break  # Break inner loop to create new connection
            
            if cb.stop:  # If stopped by Ctrl+C
                break  # Break outer loop
            
            
    except KeyboardInterrupt:
        handle_shutdown(api, cb)
    finally:
        cleanup(cb)


def handle_shutdown(api, cb):
    print(f'Shutting down... [{datetime.now()}]', flush=True)
    api.stop()
    api.logout()
    cb.stop = True

def cleanup(cb):
    if cb:
        cb.stop = True  # Signal thread to stop
        cb.join(timeout=2)  # Wait up to 2 seconds for thread to finish
        if cb.is_alive():
            print(f'Warning: EventHandler thread did not stop cleanly [{datetime.now()}]', flush=True)
    print(f'Program terminated [{datetime.now()}]', flush=True)

if __name__ == '__main__':
    main()