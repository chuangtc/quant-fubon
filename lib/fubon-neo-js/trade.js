/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

/* auto-generated by NAPI-RS */

const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

const { platform, arch } = process

let nativeBinding = null
let localFileExisted = false
let loadError = null

function isMusl() {
  // For Node 10
  if (!process.report || typeof process.report.getReport !== 'function') {
    try {
      const lddPath = require('child_process').execSync('which ldd').toString().trim()
      return readFileSync(lddPath, 'utf8').includes('musl')
    } catch (e) {
      return true
    }
  } else {
    const { glibcVersionRuntime } = process.report.getReport().header
    return !glibcVersionRuntime
  }
}

switch (platform) {
  case 'android':
    switch (arch) {
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'fubon-js.android-arm64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./fubon-js.android-arm64.node')
          } else {
            nativeBinding = require('fubon-neo-android-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm':
        localFileExisted = existsSync(join(__dirname, 'fubon-js.android-arm-eabi.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./fubon-js.android-arm-eabi.node')
          } else {
            nativeBinding = require('fubon-neo-android-arm-eabi')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Android ${arch}`)
    }
    break
  case 'win32':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(
          join(__dirname, 'fubon-js.win32-x64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./fubon-js.win32-x64-msvc.node')
          } else {
            nativeBinding = require('fubon-neo-win32-x64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'ia32':
        localFileExisted = existsSync(
          join(__dirname, 'fubon-js.win32-ia32-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./fubon-js.win32-ia32-msvc.node')
          } else {
            nativeBinding = require('fubon-neo-win32-ia32-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'fubon-js.win32-arm64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./fubon-js.win32-arm64-msvc.node')
          } else {
            nativeBinding = require('fubon-neo-win32-arm64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`)
    }
    break
  case 'darwin':
    localFileExisted = existsSync(join(__dirname, 'fubon-js.darwin-universal.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./fubon-js.darwin-universal.node')
      } else {
        nativeBinding = require('fubon-neo-darwin-universal')
      }
      break
    } catch {}
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'fubon-js.darwin-x64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./fubon-js.darwin-x64.node')
          } else {
            nativeBinding = require('fubon-neo-darwin-x64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'fubon-js.darwin-arm64.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./fubon-js.darwin-arm64.node')
          } else {
            nativeBinding = require('fubon-neo-darwin-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`)
    }
    break
  case 'freebsd':
    if (arch !== 'x64') {
      throw new Error(`Unsupported architecture on FreeBSD: ${arch}`)
    }
    localFileExisted = existsSync(join(__dirname, 'fubon-js.freebsd-x64.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./fubon-js.freebsd-x64.node')
      } else {
        nativeBinding = require('fubon-neo-freebsd-x64')
      }
    } catch (e) {
      loadError = e
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'fubon-js.linux-x64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./fubon-js.linux-x64-musl.node')
            } else {
              nativeBinding = require('fubon-neo-linux-x64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'fubon-js.linux-x64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./fubon-js.linux-x64-gnu.node')
            } else {
              nativeBinding = require('fubon-neo-linux-x64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'fubon-js.linux-arm64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./fubon-js.linux-arm64-musl.node')
            } else {
              nativeBinding = require('fubon-neo-linux-arm64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'fubon-js.linux-arm64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./fubon-js.linux-arm64-gnu.node')
            } else {
              nativeBinding = require('fubon-neo-linux-arm64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'fubon-js.linux-arm-musleabihf.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./fubon-js.linux-arm-musleabihf.node')
            } else {
              nativeBinding = require('fubon-neo-linux-arm-musleabihf')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'fubon-js.linux-arm-gnueabihf.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./fubon-js.linux-arm-gnueabihf.node')
            } else {
              nativeBinding = require('fubon-neo-linux-arm-gnueabihf')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'riscv64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'fubon-js.linux-riscv64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./fubon-js.linux-riscv64-musl.node')
            } else {
              nativeBinding = require('fubon-neo-linux-riscv64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'fubon-js.linux-riscv64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./fubon-js.linux-riscv64-gnu.node')
            } else {
              nativeBinding = require('fubon-neo-linux-riscv64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 's390x':
        localFileExisted = existsSync(
          join(__dirname, 'fubon-js.linux-s390x-gnu.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./fubon-js.linux-s390x-gnu.node')
          } else {
            nativeBinding = require('fubon-neo-linux-s390x-gnu')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

const { FutOptConditionMarketType, FutOptConditionOrderType, FutOptConditionPriceType, ConditionMarketType, ConditionOrderType, ConditionPriceType, TradingType, Operator, TriggerContent, TimeSliceOrderType, StopSign, ConditionStatus, HistoryStatus, Direction, BSAction, TimeInForce, OrderType, FutOptOrderType, PriceType, FutOptPriceType, MarketType, FutOptMarketType, Oxtp, CallPut, Accounting, FutOpt, FutOptAccounting, Stock, FugleRealtime, CoreSdk } = nativeBinding

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
module.exports.Oxtp = Oxtp
module.exports.CallPut = CallPut
module.exports.Accounting = Accounting
module.exports.FutOpt = FutOpt
module.exports.FutOptAccounting = FutOptAccounting
module.exports.Stock = Stock
module.exports.FugleRealtime = FugleRealtime
module.exports.CoreSdk = CoreSdk
