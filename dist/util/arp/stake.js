"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculator_1 = require("./calculator");
const util_1 = require("./util");
class StakeARPCalculator {
    constructor(arpCalculator) {
        this.arpCalculator = arpCalculator;
    }
    calculate(sender, stakeAmount, availableAirdropBalance) {
        const airdrop = this.arpCalculator.calculate(sender, stakeAmount);
        const totalAirdropReward = util_1.calculateTotalAirdropReward(airdrop);
        if (availableAirdropBalance < totalAirdropReward) {
            return util_1.createAirdropReward();
        }
        return airdrop;
    }
}
exports.StakeARPCalculator = StakeARPCalculator;
exports.initStakeARPCalculator = (config) => new StakeARPCalculator(new calculator_1.ARPCalculator(config.ARP.DIRECT_REWARD.PERCENT_PER_LEVEL, config.ARP.DIRECT_REWARD.MIN_ACTIVE_STAKE_AMOUNT_FOR_RECEIVE));
