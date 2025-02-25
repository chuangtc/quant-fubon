const { BSAction, TimeInForce, OrderType, PriceType, MarketType, Accounting, CoreSdk, FugleRealtime } = require('./trade.js');
const { FutOptMarketType, FutOptOrderType, FutOptPriceType, CallPut } = require('./trade.js');
const { ConditionOrderType, ConditionPriceType, ConditionMarketType, Direction, Operator, TriggerContent, TradingType, StopSign, TimeSliceOrderType, HistoryStatus } = require('./trade.js');
const { Condition, TpslOrder, TpslWrapper, SplitDescription, TrailOrder, ConditionStatus, FutOptOrder, FutOptTrailOrder } = require('./trade.js');
const { FutOptConditionMarketType, FutOptConditionOrderType, FutOptConditionPriceType } = require('./trade.js');
const { FutOptOrderResult } = require('./trade.js');
const { RestClient, WebSocketClient, Mode } = require('./marketdata/index.js');
const version = require('./package.json').version;
const fugleRealtime = new FugleRealtime();

class FubonSDK extends CoreSdk {
  /**
   * constructor of FubonSDK
   * @param {string | null } url The first value
   */
  constructor(url) {
    super(version, url ?? fugleRealtime.fubonWsUrl);
    global.__fubon_sdk_ref__ = this;
  }

  /**
   * Initial market data and get authorised
   */
  initRealtime(mode = Mode.Speed) {
    const sdkToken = super.exchangeRealtimeToken();
    this.marketdata = {
      webSocketClient: new WebSocketClient({ sdkToken }, mode),
      restClient: new RestClient({ sdkToken }),
    }
  }

  /**
   * add callback to Order
   * @param {(err: null | Error, event: OrderResult)} callback The first value
   */
  setOnOrder(callback) {
    super.innerSetOnOrder(function (_err, event) {
      if (event.isSuccess) {
        callback(null, event.data)
      } else {
        callback(new Error(event.message), event.data)
      }
    })
  }

  /**
   * add callback to OrderChanged
   * @param {(err: null | Error, event: FutOptOrderResult)} callback The first value
   */
  setOnOrderChanged(callback) {
    super.innerSetOnOrderChanged(function (_err, event) {
      if (event.isSuccess) {
        callback(null, event.data)
      } else {
        callback(new Error(event.message), event.data)
      }
    })
  }

  /**
   * add callback to FutoptOrder
   * @param {(err: null | Error, event: FutOptOrderResult)} callback The first value
   */
  setOnFutoptOrder(callback) {
    super.innerSetOnFutoptOrder(function (_err, event) {
      if (event.isSuccess) {
        callback(null, event.data)
      } else {
        callback(new Error(event.message), event.data)
      }
    })
  }

  /**
   * add callback to FutoptOrderChanged
   * @param {(err: null | Error, event: FutOptOrderResult)} callback The first value
   */
  setOnFutoptOrderChanged(callback) {
    super.innerSetOnFutoptOrderChanged(function (_err, event) {
      if (event.isSuccess) {
        callback(null, event.data)
      } else {
        callback(new Error(event.message), event.data)
      }
    })
  }

  /**
   * add callback to FutoptOrderChanged
   * @param {(code: string , message: string)} callback The first value
   */
  setOnEvent(callback) {
    super.innerSetOnEvent(function (_err, event) {
      let [code, message] = event
        callback(code, message)
    })
  }
}


module.exports.Condition = Condition;
module.exports.TpslOrder = TpslOrder
module.exports.TpslWrapper = TpslWrapper
module.exports.SplitDescription = SplitDescription
module.exports.TrailOrder = TrailOrder
module.exports.FutOptOrder = FutOptOrder
module.exports.FutOptTrailOrder = FutOptTrailOrder
module.exports.Mode = Mode

module.exports.FutOptConditionMarketType = FutOptConditionMarketType
module.exports.FutOptConditionOrderType = FutOptConditionOrderType
module.exports.FutOptConditionPriceType = FutOptConditionPriceType
module.exports.ConditionMarketType = ConditionMarketType
module.exports.ConditionOrderType = ConditionOrderType
module.exports.ConditionPriceType = ConditionPriceType
module.exports.TradingType = TradingType
module.exports.Operator = Operator
module.exports.TriggerContent = TriggerContent
module.exports.TimeSliceOrderType = TimeSliceOrderType
module.exports.StopSign = StopSign
module.exports.ConditionStatus = ConditionStatus
module.exports.HistoryStatus = HistoryStatus
module.exports.Direction = Direction
module.exports.BSAction = BSAction
module.exports.TimeInForce = TimeInForce
module.exports.OrderType = OrderType
module.exports.FutOptOrderType = FutOptOrderType
module.exports.PriceType = PriceType
module.exports.FutOptPriceType = FutOptPriceType
module.exports.MarketType = MarketType
module.exports.FutOptMarketType = FutOptMarketType
module.exports.CallPut = CallPut
module.exports.Accounting = Accounting
module.exports.FugleRealtime = FugleRealtime
module.exports.FubonSDK = FubonSDK
