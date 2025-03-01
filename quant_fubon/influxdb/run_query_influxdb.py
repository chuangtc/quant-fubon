from influxdb_client import InfluxDBClient
from dotenv import load_dotenv
import os
load_dotenv()

# InfluxDB Connection Settings
INFLUXDB_URL = "http://localhost:8086"  # Change if remote

TOKEN = os.getenv("INFLUXDB_TOKEN")
ORG = "quant"
BUCKET = "twstock_dev"

# Initialize InfluxDB Client
client = InfluxDBClient(url=INFLUXDB_URL, token=TOKEN, org=ORG)
query_api = client.query_api()

# Flux Query to Retrieve Stock Data
query = """
from(bucket: "twstock_dev")
  |> range(start: -2y)
  |> filter(fn: (r) => r["_measurement"] == "stock_data" and r["stock"] == "2330")
  |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
  |> keep(columns: ["_time", "open", "high", "low", "close", "volume"])
"""

# Execute the Query
result = query_api.query(query=query)

# Process & Print Results
for table in result:
    for record in table.records:
        print(f"Time: {record['_time']}, Open: {record['open']}, High: {record['high']}, "
              f"Low: {record['low']}, Close: {record['close']}, Volume: {record['volume']}")

# Close Connection
client.close()
