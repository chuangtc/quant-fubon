import signal
import sys
import traceback
from threading import Thread
from datetime import datetime
import time
from fubon_neo.sdk import FubonSDK, FutOptOrder, FutOptConditionOrder, Condition, Mode
import os
from dotenv import load_dotenv
load_dotenv()

""" Login 所需資料 """
username = os.getenv('USER_ID')  # 身分證字號
password = os.getenv('USER_PASSWORD')  # 登入密碼
credential_filename = os.getenv('PFX_PATH')   # 憑證完整路徑檔名
ca_password = os.getenv('PFX_PASSWORD')  # 憑證密碼

""" 富邦新一代API """
sdk = FubonSDK()

class EventHandler(Thread):  ### 單獨運行在一個Thread內，訂閱接收回報 ###
    def __init__(self):
        Thread.__init__(self)
        self.is_login = False
        self.stop = False
        self.daemon = True  # Set the thread as a daemon thread
        self.last_pong_time = time.time()
        self.pong_timeout = 30  # seconds

    def on_event(self, code, content):
        # '100': 連線建立成功
        # '200': 登入成功
        # '201': 登入警示, Ex: 90天未更換密碼
        # '300': 斷線
        # '301': 未收到連線pong回傳
        # '302': 登出, 並斷線
        # '500': 錯誤
        print(f'回傳事件代碼: {code}, 內容: {content} [{datetime.now()}]', flush=True)
        
        if code in ['200', '201']:
            self.is_login = True
            self.last_pong_time = time.time()
        elif code == '301':  # pong missed
            if time.time() - self.last_pong_time > self.pong_timeout:
                self.is_login = False
        elif code in ['300', '302', '500']:
            self.is_login = False

    def run(self):
        print(f'執行緒 EventHandler 開始運行! [{datetime.now()}]', flush=True)
        sdk.set_on_event(self.on_event)

        while not self.stop:
            time.sleep(1.0)
            #print(f'執行緒運行! [{datetime.now()}]', flush=True)

        print(f'執行緒 EventHandler 結束! [{datetime.now()}]', flush=True)

class Fubon:
    def __init__(self, event_handler):
        self.cb = event_handler
        self.accounts = None
        self.is_login = False
        self._running = True  
        self.retry_count = 0 
        self.max_retries = 3
        self.retry_delay = 5  # seconds


    def login(self):
        while not self.is_login and self._running:
            try:
                print(f'登入「富邦新一代API」中... (嘗試 {self.retry_count + 1}/{self.max_retries}) [{datetime.now()}]', flush=True)
                self.accounts = sdk.login(username, password, credential_filename, ca_password).data

                """ 必要! 登入後，系統需要一點時間差傳回event! """
                t0 = time.time()
                while not self.cb.is_login:
                    time.sleep(0.1)
                    if (time.time() - t0) > 60.0:  # Reduced timeout to 60 seconds
                        print(f'事件碼回傳Timeout... [{datetime.now()}]!', flush=True)
                        break

                if self.cb.is_login:
                    self.is_login = True
                    print(f'成功登入「富邦新一代API」 [{datetime.now()}]', flush=True)
                    self.retry_count = 0  # Reset retry count on successful login
                else:
                    self.is_login = False
                    print(f'登入「富邦新一代API」回傳事件有誤，正在重新登入... [{datetime.now()}]', flush=True)
                    self.retry_count += 1
                    if self.retry_count >= self.max_retries:
                        print(f'登入失敗次數過多，程式結束 [{datetime.now()}]', flush=True)
                        self._running = False
                        break
                    print(f'登入失敗，{self.retry_delay}秒後重試... [{datetime.now()}]', flush=True)
                    time.sleep(self.retry_delay)

            except KeyboardInterrupt:
                self._running = False
                break         
            except Exception as e:
                print(f'登入「富邦新一代API」程式錯誤: {e}', flush=True)
                traceback.print_exc()
                self.retry_count += 1
                if self.retry_count >= self.max_retries:
                    print(f'錯誤次數過多，程式結束 [{datetime.now()}]', flush=True)
                    self._running = False
                    break
                print(f'錯誤後{self.retry_delay}秒重試... [{datetime.now()}]', flush=True)
                time.sleep(self.retry_delay)

    def stop(self):
        self._running = False

    def logout(self):
        self.is_login = False
        is_logout = sdk.logout()
        if is_logout:
            print(f'成功登出「富邦新一代API」 [{datetime.now()}]', flush=True)
        else:
            print(f'登出「富邦新一代API」錯誤 [{datetime.now()}]', flush=True)

def signal_handler(sig, frame):
    print(f'收到 Ctrl+C 訊號! [{datetime.now()}]', flush=True)
    api.stop()  # Stop the login loop
    api.logout()
    cb.stop = True  # Stop the EventHandler thread
    sys.exit(0)

if __name__ == '__main__':
    try:
        signal.signal(signal.SIGINT, signal_handler)
        
        cb = EventHandler()
        api = Fubon(cb)

        cb.start()
        api.login()

        # Add main loop to keep program running
        while api.is_login and not cb.stop:
            time.sleep(10)  # Check connection status more frequently
            if not cb.is_login:  # If connection lost
                print(f'檢測到連線中斷，嘗試主動斷線重連... [{datetime.now()}]', flush=True)
                api.stop()
                api.logout()
                cb.stop = True
                time.sleep(30)  # Wait 30 seconds before reconnecting
                
                cb = EventHandler()
                api = Fubon(cb)

                cb.start()
                api.login()
            
    except KeyboardInterrupt:
        print(f'收到 Ctrl+C 訊號! [{datetime.now()}]', flush=True)
        api.stop()
        api.logout()
        cb.stop = True
    finally:
        if 'cb' in locals():
            cb.join(timeout=1)  # Wait max 1 second for thread to finish
        print(f'程式結束! [{datetime.now()}]', flush=True)