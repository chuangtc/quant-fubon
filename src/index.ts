import * as dotenv from 'dotenv';
import { FubonSDK, BSAction, TimeInForce, OrderType, PriceType, MarketType } from 'fubon-neo';

dotenv.config(); 

const userid = process.env.USER_ID;
const userpassword = process.env.USER_PASSWORD;
const pfx_path = process.env.PFX_PATH;
const pfx_password = process.env.PFX_PASSWORD;

// Initialize the SDK
const sdk = new FubonSDK();

//登入
var accounts = sdk.login(userid, userpassword, pfx_path, pfx_password);  // 登入帳號 輸入:帳號、密碼、憑證路徑、憑證密碼
console.log(accounts)