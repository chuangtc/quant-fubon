import os
from datetime import datetime, timedelta, time
from typing import List, Dict

from dotenv import load_dotenv

from fubon_neo.sdk import FubonSDK

load_dotenv()

USER_ID = os.getenv("USER_ID")
USER_PASSWORD = os.getenv("USER_PASSWORD")
PFX_PATH = os.getenv("PFX_PATH")
PFX_PASSWORD = os.getenv("PFX_PASSWORD")


def _timestamp_to_time(ts: str) -> time:
    """Convert ISO format timestamp string to time object."""
    return datetime.fromisoformat(ts.replace('Z', '+00:00')).time()


def fetch_intraday_candles(sdk: FubonSDK, symbol: str) -> List[Dict]:
    """Fetch today's intraday 1-minute candles for the given symbol."""
    rest_stock = sdk.marketdata.rest_client.stock
    result = rest_stock.intraday.candles(symbol=symbol, timeframe="1")
    if isinstance(result, dict) and 'data' in result:
        return result['data']
    return []


def calculate_orb(candles: List[Dict], minutes: int = 30) -> Dict:
    """Return high, low and volume for the opening range."""
    start = time(9, 0)
    end = (datetime.combine(datetime.today(), start) + timedelta(minutes=minutes)).time()

    opening = [c for c in candles if start <= _timestamp_to_time(c["date"]) < end]
    if not opening:
        return {}

    high = max(c["high"] for c in opening)
    low = min(c["low"] for c in opening)
    volume = sum(c["volume"] for c in opening)

    return {"high": high, "low": low, "volume": volume}


def check_orb_2330(minutes: int = 30) -> None:
    """Login to Fubon SDK and print the ORB result for symbol 2330."""
    sdk = FubonSDK()
    sdk.login(USER_ID, USER_PASSWORD, PFX_PATH, PFX_PASSWORD)
    sdk.init_realtime()

    candles = fetch_intraday_candles(sdk, "2330")
    orb = calculate_orb(candles, minutes)
    if not orb:
        print("No intraday data to calculate ORB")
        return

    print(f"2330 Opening Range (first {minutes} minutes)")
    print(f"High: {orb['high']} Low: {orb['low']} Volume: {orb['volume']}")


if __name__ == "__main__":
    check_orb_2330()
