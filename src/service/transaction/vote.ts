import { Account } from '../../model/common/account';
import { AssetVote } from '../../model/common/transaction/asset/vote';
import { VoteType, Timestamp } from '../../model/common/type';
import { TransactionType } from '../../model/common/transaction/type';
import DDK from '../..';
import { mergeAirdrops } from '../../util/airdrop';
import { Feature } from '../../model/common/feature';

export type VoteData = {
    createdAt: Timestamp;
    type: VoteType;
    votes: Array<string>;
};

export const createOldAssetVote = (
    data: VoteData,
    sender: Account,
    lastBlockHeight: number,
    availableAirdropBalance: number,
): AssetVote => {
    const { reward, unstake } = DDK.rewardCalculator
        .calculateTotalRewardAndUnstake(data.createdAt, sender.stakes, data.type, lastBlockHeight);
    const airdropReward = DDK.rewardCalculator
        .calculateAirdropReward(sender, reward, TransactionType.VOTE, availableAirdropBalance);

    return new AssetVote({
        airdropReward,
        reward,
        unstake,
        type: data.type,
        votes: data.votes,
    });
};

export const createAssetVote = (
    data: VoteData,
    sender: Account,
    lastBlockHeight: number,
    availableAirdropBalance: number,
    availableARPAirdropBalance: number = 0,
): AssetVote => {
    if (!DDK.isFeatureEnabled(Feature.ARP, lastBlockHeight)) {
        return createOldAssetVote(data, sender, lastBlockHeight, availableAirdropBalance);
    }

    const totalReward = DDK.rewardCalculator
        .calculateTotalRewardAndUnstake(data.createdAt, sender.stakes, data.type, lastBlockHeight);
    const airdropReward = DDK.rewardCalculator
        .calculateAirdropReward(sender, totalReward.reward, TransactionType.VOTE, availableAirdropBalance);

    const arpTotalReward = DDK.rewardCalculator
        .calculateTotalRewardAndUnstake(data.createdAt, sender.arp.stakes, data.type, lastBlockHeight);
    const arpAirdropReward = DDK.voteARPCalculator
        .calculate(sender, availableARPAirdropBalance, data.createdAt);

    return new AssetVote({
        airdropReward: mergeAirdrops(airdropReward, arpAirdropReward),
        reward: totalReward.reward + arpTotalReward.reward,
        unstake: totalReward.unstake + arpTotalReward.unstake,
        type: data.type,
        votes: data.votes,
    });
};
