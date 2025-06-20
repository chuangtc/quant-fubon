import os
import time
import fubon_neo
from fubon_neo.sdk import FubonSDK, Order
from fubon_neo.constant import TimeInForce, OrderType, PriceType, MarketType, BSAction
from dotenv import load_dotenv
load_dotenv()

USER_ID=os.getenv('USER_ID')
USER_PASSWORD = os.getenv('USER_PASSWORD')
PFX_PATH = os.getenv('PFX_PATH')
PFX_PASSWORD = os.getenv('PFX_PASSWORD')

def main():
    
    # 連結 API Server
    sdk = FubonSDK()
    accounts = sdk.login(USER_ID, USER_PASSWORD, PFX_PATH, PFX_PASSWORD)   # 登入帳號 輸入:帳號、密碼、憑證路徑、憑證密碼
    
    acc = accounts.data[0]

    # 定義單筆訂單內容
    
    # order = Order(
    #     buy_sell = BSAction.Buy,
    #     symbol = "00878",
    #     price = None,
    #     quantity = 1000, # 股數; 1000為一張
    #     market_type = MarketType.Common,
    #     price_type = PriceType.Reference,
    #     time_in_force = TimeInForce.ROD,
    #     order_type = OrderType.Stock,
    #     user_def = None # optional field
    # );
    order = Order(
        buy_sell = BSAction.Buy,
        symbol = "0050",
        price = "47.10",
        quantity = 2000, # 股數; 2000為一張
        market_type = MarketType.Common,
        price_type = PriceType.Limit,
        time_in_force = TimeInForce.ROD,
        order_type = OrderType.Stock,
        user_def = "From_Py", # optional field
    );

    # 列印訂單內容
    print(order)

    # 下單
    order_reponse = sdk.stock.place_order(acc, order)
    print(order_reponse)

    time.sleep(10) # 等待10秒後查詢委託單狀態

    result = sdk.stock.get_order_results(acc)
    print(f"筆數: {len(result.data)}")
    i = 0
    for order_result in result.data:
        print(f"第 {i+1} 筆:")
        print(order_result, end="\n\n")
        i += 1


if __name__ == "__main__":
    main()