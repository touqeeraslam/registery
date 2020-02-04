"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculator_1 = require("./calculator");
const util_1 = require("./util");
class VoteARPCalculator {
    constructor(arpCalculator) {
        this.arpCalculator = arpCalculator;
    }
    calculate(sender, availableAirdropBalance, createdAt) {
        if (!sender ||
            !sender.arp ||
            !Array.isArray(sender.arp.stakes) ||
            sender.arp.stakes.length === 0) {
            return util_1.createAirdropReward();
        }
        const stakesForRewards = sender.arp.stakes
            .filter(stake => stake.isActive && createdAt >= stake.nextVoteMilestone);
        if (stakesForRewards.length === 0) {
            return util_1.createAirdropReward();
        }
        const rewards = stakesForRewards.map(stake => this.arpCalculator.calculate(sender, stake.amount));
        if (rewards.length === 0) {
            return util_1.createAirdropReward();
        }
        const totalAirdropReward = rewards.reduce((sum, airdrop) => {
            return sum + util_1.calculateTotalAirdropReward(airdrop);
        }, 0);
        if (availableAirdropBalance < totalAirdropReward) {
            return util_1.createAirdropReward();
        }
        return rewards.reduce((mergedAirdropReward, airdrop) => {
            airdrop.sponsors.forEach((reward, referrerAddress) => {
                const currentReferrerReward = mergedAirdropReward.sponsors.get(referrerAddress) || 0;
                mergedAirdropReward.sponsors.set(referrerAddress, currentReferrerReward + reward);
            });
            return mergedAirdropReward;
        }, util_1.createAirdropReward());
    }
}
exports.VoteARPCalculator = VoteARPCalculator;
exports.initVoteARPCalculator = (config) => new VoteARPCalculator(new calculator_1.ARPCalculator(config.ARP.CHAIN_REWARD.PERCENT_PER_LEVEL, config.ARP.CHAIN_REWARD.MIN_ACTIVE_STAKE_AMOUNT_FOR_RECEIVE));
