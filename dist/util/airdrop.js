"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const util_1 = require("./arp/util");
const type_1 = require("../model/common/type");
const type_2 = require("../model/common/transaction/type");
const feature_1 = require("../model/common/feature");
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
exports.calculateAirdropReward = (trs, amount, sender, lastBlockHeight, availableAirdropBalance, availableARPBalance = 0) => {
    const isARPEnabled = __1.default.isFeatureEnabled(feature_1.Feature.ARP, lastBlockHeight);
    switch (trs.type) {
        case type_2.TransactionType.STAKE:
            if (isARPEnabled) {
                return __1.default.stakeARPCalculator.calculate(sender, amount, availableARPBalance);
            }
            return __1.default.rewardCalculator.calculateAirdropReward(sender, amount, type_2.TransactionType.STAKE, availableAirdropBalance);
        case type_2.TransactionType.VOTE:
            const isDownVote = trs.asset.votes[0][0] === '-';
            const voteType = isDownVote ? type_1.VoteType.DOWN_VOTE : type_1.VoteType.VOTE;
            const totalReward = __1.default.rewardCalculator
                .calculateTotalRewardAndUnstake(trs.createdAt, sender.stakes, voteType, lastBlockHeight);
            const airdropReward = __1.default.rewardCalculator.calculateAirdropReward(sender, totalReward.reward, type_2.TransactionType.VOTE, availableAirdropBalance);
            if (isARPEnabled) {
                const arpTotalReward = __1.default.rewardCalculator
                    .calculateTotalRewardAndUnstake(trs.createdAt, sender.arp.stakes, voteType, lastBlockHeight);
                const arpAirdropReward = __1.default.voteARPCalculator.calculate(sender, arpTotalReward.reward, availableARPBalance);
                return exports.mergeAirdrops(airdropReward, arpAirdropReward);
            }
            return airdropReward;
        default:
            break;
    }
    return util_1.createAirdropReward();
};
