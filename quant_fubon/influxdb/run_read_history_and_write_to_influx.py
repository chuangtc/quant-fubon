from typing import Any
import requests
from datetime import datetime
from fubon_neo.sdk import FubonSDK, Order
from fubon_neo.constant import TimeInForce, OrderType, PriceType, MarketType, BSAction
from dotenv import load_dotenv
import os

import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS


load_dotenv()
BUCKET = "twstock_dev"
ORG = "quant"
TOKEN = os.getenv("INFLUXDB_TOKEN")

USER_ID=os.getenv('USER_ID')
USER_PASSWORD = os.getenv('USER_PASSWORD')
PFX_PATH = os.getenv('PFX_PATH')
PFX_PASSWORD = os.getenv('PFX_PASSWORD')

INFLUXDB_URL = "http://localhost:8086"

sdk = FubonSDK()

def write_to_influxdb(jsondata: Any) -> None:
    # Create client with proper configuration and increased timeout
    client = InfluxDBClient(
        url=INFLUXDB_URL,
        token=TOKEN,
        org=ORG,
        timeout=30_000  # 30 seconds timeout
    )
    
    try:
        write_api = client.write_api(write_options=SYNCHRONOUS)
        points = []
        
        for data in jsondata['data']:
            dt = datetime.strptime(data['date'], "%Y-%m-%d")
            timestamp_ns = int(dt.timestamp() * 1e9)  # Convert to nanoseconds
            
            point = (
                Point("stock_data")
                .tag("stock", jsondata['symbol'])
                .tag("type", jsondata['type'])
                .tag("exchange", jsondata['exchange'])
                .tag("market", jsondata['market'])
                .field("open", float(data['open']))
                .field("high", float(data['high']))
                .field("low", float(data['low']))
                .field("close", float(data['close']))
                .field("volume", float(data['volume']))
                .time(timestamp_ns)
            )
            points.append(point)
            
        # Write points with explicit precision
        write_api.write(
            bucket=BUCKET,
            org=ORG,
            record=points,
            write_precision=WritePrecision.NS
        )
        print(f"Successfully wrote {len(points)} points to InfluxDB")
        
    except Exception as e:
        print(f"Error writing to InfluxDB: {e}")
        raise  # Re-raise the exception for proper error handling
    finally:
        write_api.close()
        client.close()


def main()->None:
    print("Reading history data and write to InfluxDB...")
    accounts = sdk.login(USER_ID, USER_PASSWORD, PFX_PATH, PFX_PASSWORD)   # 登入帳號 輸入:帳號、密碼、憑證路徑、憑證密碼
    # Initialize market data connection
    sdk.init_realtime()
    # 建立行情查詢 WebAPI 連線 Object Instance
    restStock = sdk.marketdata.rest_client.stock
    result = restStock.historical.candles(**{"symbol": "2330", "from": "2025-01-01", "to": "2025-02-28"})
    write_to_influxdb(result)
    

if __name__ == "__main__":
    main()