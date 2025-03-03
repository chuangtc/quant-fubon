import os
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
    
    # 庫存查詢
    result = sdk.accounting.inventories(accounts.data[0])

    if result.is_success:
        print(f"資料筆數: {len(result.data)}\n")
        i = 0
        for inv in result.data:
            i += 1
            print(f"第 {i} 筆\n")
            print(f"{inv}\n")
            
    else:
        print("查詢失敗")
        print(result)

    # 銀行餘額
    result = sdk.accounting.bank_remain(accounts.data[0])
    print(f"銀行餘額:{result}")

if __name__ == "__main__":
    main()