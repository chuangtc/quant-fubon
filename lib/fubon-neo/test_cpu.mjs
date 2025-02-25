import { FubonSDK, BSAction, TimeInForce, OrderType, PriceType, MarketType } from './index.js';

for (let i = 1; i< 10; i++) {
    const sdk = new FubonSDK();
    console.log(sdk.logout());
}

import * as readline from 'node:readline';
readline
    .createInterface(process.stdin, process.stdout)
    .question("Press [Enter] to exit...", function(){
        process.exit();
});
