import { Account } from '../../model/common/account';
import { Timestamp } from '../../model/common/type';
import { TransactionType } from '../../model/common/transaction/type';
import { AssetStake } from '../../model/common/transaction/asset/stake';
import DDK from '../..';
import { Feature } from '../../model/common/feature';

export type StakeData = {
    createdAt: Timestamp;
    amount: number;
    startVoteCount?: number;
};

export const createOldAssetStake = (
    data: StakeData,
    sender: Account,
    availableAirdropBalance: number,
): AssetStake => {
    const airdropReward = DDK.rewardCalculator.calculateAirdropReward(
        sender,
        data.amount,
        TransactionType.STAKE,
        availableAirdropBalance,
    );

    return new AssetStake({
        airdropReward,
        amount: data.amount,
        startTime: data.createdAt,
        startVoteCount: data.startVoteCount || 0,
    });
};

export const createAssetStake = (
    data: StakeData,
    sender: Account,
    lastBlockHeight: number,
    availableAirdropBalance: number,
): AssetStake => {
    if (!DDK.isFeatureEnabled(Feature.ARP, lastBlockHeight)) {
        return createOldAssetStake(data, sender, availableAirdropBalance);
    }

    const airdropReward = DDK.stakeARPCalculator.calculate(
        sender,
        data.amount,
        availableAirdropBalance,
    );

    return new AssetStake({
        airdropReward,
        amount: data.amount,
        startTime: data.createdAt,
    });
};
