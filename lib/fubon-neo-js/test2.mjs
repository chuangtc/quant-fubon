import { 
    FubonSDK, BSAction, TimeInForce, OrderType, PriceType, MarketType,
    FutOptMarketType, FutOptPriceType, FutOptOrderType,
    Operator, TriggerContent, TradingType, StopSign,
    ConditionOrderType, ConditionPriceType
    } from './index.js';
// const sdk = new FubonSDK("wss://x64.tera-asper.net/TASP/XCPXWS");
const sdk = new FubonSDK();
// sdk.stock.setOnOrder(function(order, content) { console.log("====order===",order, content)});
// sdk.stock.setOnOrderChanged(function(order, content) { console.log("===ordercha===", order, content)});
// sdk.stock.setOnFilled(function(order, content) { console.log(order, content)})
// sdk.stock.setOnEvent(function(order, content, lala) { console.log(order, content, lala)})

// const accounts = sdk.login("19630110FI", "a123456", "../19630110FI-TA-1.pfx", "12345678");
// const accounts = sdk.dmaLogin("19630110FI", "a123456");
// let accounts = sdk.login("U220676671", "Fubon2899", "/Users/bistin/Downloads/U220676671.pfx", "Fubon2899");
let accounts = sdk.login("Q122599073", "Fubon2899","/Users/bistin/Downloads/Q122599073.pfx","1234qwer") // futopt
const target_account = accounts.data[1];
console.log(target_account)

// var condition = {
//     marketType: TradingType.Reference,
//     symbol: "TXFF4",
//     trigger: TriggerContent.BidPrice,
//     triggerValue: "22000",
//     operator: Operator.GreaterThanOrEqual
// };
// const order = {
//     buySell: BSAction.Buy,
//     symbol: "TXFF4",
//     price: "20000",
//     lot: 2,
//     marketType: FutOptMarketType.Future,
//     priceType: FutOptPriceType.Limit,
//     timeInForce: TimeInForce.ROD,
//     orderType: FutOptOrderType.New,
//     userDef: null
// };

// const futoptorder = {
//      buySell: BSAction.Buy,
//      symbol: "TXO20000E4",
//      price: "530",
//      lot: 1,
//      marketType: FutOptMarketType.Option,
//      priceType: FutOptPriceType.Limit,
//      timeInForce: TimeInForce.ROD,
//      orderType: FutOptOrderType.Auto,
//      userDef: "From nodejs" // optional field
// };
// var res = sdk.futopt.singleCondition(target_account, "20240612", "20240620", StopSign.Full, condition, order);
// console.log(res)
// 設計條件內容
const condition = {
    marketType: TradingType.Reference,
    symbol: "TXO20000E4",
    trigger: TriggerContent.MatchedPrice,
    triggerValue: "100",
    operator: Operator.LessThan
}

const condition2 = {
    marketType: TradingType.Reference,
    symbol: "TXO20000E4",
    trigger: TriggerContent.TotalQuantity,
    triggerValue: "30",
    operator: Operator.GreaterThan
}


const order = {
  buySell: BSAction.Buy,
  symbol: "TXO20000E4",
  price: "100",
  lot: 1,
  marketType: FutOptMarketType.Option,
  priceType: FutOptPriceType.Limit,
  timeInForce: TimeInForce.ROD,
  orderType: FutOptOrderType.New,
  userDef: "From nodejs" // optional field

};

const tp = {
    timeInForce: TimeInForce.ROD,
    priceType: ConditionPriceType.Limit,
    orderType: ConditionOrderType.Close,
    targetPrice: "120",
    price: "120",

}

const sl  = {
    timeInForce: TimeInForce.ROD,
    priceType: ConditionPriceType.Limit,
    orderType: ConditionOrderType.Close,
    targetPrice: "60",
    price: "60",
}

const tpsl = {
    stopSign: StopSign.Full,
    endDate: "20240617",
    tp: tp,           // optional field 
    sl: sl,           // optional field
    dayTrade: false  // optional field
}

console.log(sdk.futopt.multiCondition(target_account,"20240613", "20240620", StopSign.Full, [condition, condition2], order, tpsl ))


// readline
//     .createInterface(process.stdin, process.stdout)
//     .question("Press [Enter] to exit...", function () {
//         process.exit();
//     });
