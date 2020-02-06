"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vote_1 = require("../../model/common/transaction/asset/vote");
const type_1 = require("../../model/common/transaction/type");
const __1 = __importDefault(require("../.."));
const airdrop_1 = require("../../util/airdrop");
const feature_1 = require("../../model/common/feature");
exports.createOldAssetVote = (data, sender, lastBlockHeight, availableAirdropBalance) => {
    const { reward, unstake } = __1.default.rewardCalculator
        .calculateTotalRewardAndUnstake(data.createdAt, sender.stakes, data.type, lastBlockHeight);
    const airdropReward = __1.default.rewardCalculator
        .calculateAirdropReward(sender, reward, type_1.TransactionType.VOTE, availableAirdropBalance);
    return new vote_1.AssetVote({
        airdropReward,
        reward,
        unstake,
        type: data.type,
        votes: data.votes,
    });
};
exports.createAssetVote = (data, sender, lastBlockHeight, availableAirdropBalance, availableARPAirdropBalance = 0) => {
    if (!__1.default.isFeatureEnabled(feature_1.Feature.ARP, lastBlockHeight)) {
        return exports.createOldAssetVote(data, sender, lastBlockHeight, availableAirdropBalance);
    }
    const totalReward = __1.default.rewardCalculator
        .calculateTotalRewardAndUnstake(data.createdAt, sender.stakes, data.type, lastBlockHeight);
    const airdropReward = __1.default.rewardCalculator
        .calculateAirdropReward(sender, totalReward.reward, type_1.TransactionType.VOTE, availableAirdropBalance);
    const arpTotalReward = __1.default.rewardCalculator
        .calculateTotalRewardAndUnstake(data.createdAt, sender.arp.stakes, data.type, lastBlockHeight);
    const arpAirdropReward = __1.default.voteARPCalculator
        .calculate(sender, arpTotalReward.reward, availableARPAirdropBalance);
    return new vote_1.AssetVote({
        airdropReward: airdrop_1.mergeAirdrops(airdropReward, arpAirdropReward),
        reward: totalReward.reward + arpTotalReward.reward,
        unstake: totalReward.unstake + arpTotalReward.unstake,
        type: data.type,
        votes: data.votes,
    });
};
