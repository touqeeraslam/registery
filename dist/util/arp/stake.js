"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculator_1 = require("./calculator");
const util_1 = require("./util");
class StakeARPCalculator {
    constructor(arpCalculator, minAmountForDistribution, maxAmountForDistribution) {
        this.arpCalculator = arpCalculator;
        this.minAmountForDistribution = minAmountForDistribution;
        this.maxAmountForDistribution = maxAmountForDistribution;
    }
    calculate(sender, stakeAmount, availableAirdropBalance) {
        if (stakeAmount < this.minAmountForDistribution ||
            stakeAmount > this.maxAmountForDistribution) {
            return util_1.createAirdropReward();
        }
        const airdrop = this.arpCalculator.calculate(sender, stakeAmount);
        const totalAirdropReward = util_1.calculateTotalAirdropReward(airdrop);
        if (availableAirdropBalance < totalAirdropReward) {
            return util_1.createAirdropReward();
        }
        return airdrop;
    }
}
exports.StakeARPCalculator = StakeARPCalculator;
exports.initStakeARPCalculator = (config) => new StakeARPCalculator(new calculator_1.ARPCalculator(config.ARP.DIRECT_REWARD.PERCENT_PER_LEVEL, config.ARP.DIRECT_REWARD.MIN_ACTIVE_STAKE_AMOUNT_FOR_RECEIVE), config.ARP.DIRECT_REWARD.MIN_STAKE_AMOUNT_FOR_DISTRIBUTION, config.ARP.DIRECT_REWARD.MAX_STAKE_AMOUNT_FOR_DISTRIBUTION);
