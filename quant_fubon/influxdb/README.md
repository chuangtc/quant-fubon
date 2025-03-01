# InfluxDB and Grafana

## Instllation of Docker Desktop and influxdb/grafana docker containers on Windows 11
```bash
#Install influxDB via Docker
docker run -d --name=influxdb -p 8086:8086 -v D:/influxdb-storage:/var/lib/influxdb2 influxdb:2.7
#Install Grafana via Docker 
docker run -d --name=grafana -p 3000:3000 grafana/grafana
```

## Examples

### Read history data and write to influxDB
```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python .\quant_fubon\influxdb\run_read_history_and_write_to_influx.py
```

### Retrieve history data of 2330 from influxDB
```bash
python .\quant_fubon\influxdb\run_query_influxdb.py
```