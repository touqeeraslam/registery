"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./arp/util");
exports.mergeAirdrops = (...airdrops) => {
    const mergedAirdrop = util_1.createAirdropReward();
    airdrops.forEach(airdrop => {
        airdrop.sponsors.forEach((reward, address) => {
            const currentReward = mergedAirdrop.sponsors.get(address) || 0;
            mergedAirdrop.sponsors.set(address, reward + currentReward);
        });
    });
    return mergedAirdrop;
};
