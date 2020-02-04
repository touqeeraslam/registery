import DDK from '..';
import { createAirdropReward } from './arp/util';
import { AirdropReward, VoteType } from '../model/common/type';
import { TransactionType } from '../model/common/transaction/type';
import { TransactionSchema } from '../model/common/transaction';
import { AssetStakeSchema } from '../model/common/transaction/asset/stake';
import { AssetVoteSchema } from '../model/common/transaction/asset/vote';
import { Account } from '../model/common/account';
import { Feature } from '../model/common/feature';

export const mergeAirdrops = (...airdrops: Array<AirdropReward>): AirdropReward => {
    const mergedAirdrop = createAirdropReward();

    airdrops.forEach(airdrop => {
        airdrop.sponsors.forEach((reward, address) => {
            const currentReward = mergedAirdrop.sponsors.get(address) || 0;

            mergedAirdrop.sponsors.set(address, reward + currentReward);
        });
    });

    return mergedAirdrop;
};

export const calculateAirdropReward = (
    trs: TransactionSchema<AssetStakeSchema | AssetVoteSchema>,
    amount: number,
    sender: Account,
    lastBlockHeight: number,
    availableAirdropBalance: number,
    availableARPBalance: number = 0,
): AirdropReward => {
    const isARPEnabled = DDK.isFeatureEnabled(Feature.ARP, lastBlockHeight);

    switch (trs.type) {
        case TransactionType.STAKE:
            if (isARPEnabled) {
                return DDK.stakeARPCalculator.calculate(
                    sender,
                    amount,
                    availableARPBalance,
                );
            }

            return DDK.rewardCalculator.calculateAirdropReward(
                sender,
                amount,
                TransactionType.STAKE,
                availableAirdropBalance,
            );
        case TransactionType.VOTE:
            const isDownVote: boolean = (trs.asset as AssetVoteSchema).votes[0][0] === '-';
            const voteType = isDownVote ? VoteType.DOWN_VOTE : VoteType.VOTE;
            const totalReward = DDK.rewardCalculator
                .calculateTotalRewardAndUnstake(trs.createdAt, sender.stakes, voteType, lastBlockHeight);

            const airdropReward = DDK.rewardCalculator.calculateAirdropReward(
                sender,
                totalReward.reward,
                TransactionType.VOTE,
                availableAirdropBalance,
            );

            if (isARPEnabled) {
                const arpTotalReward = DDK.rewardCalculator
                    .calculateTotalRewardAndUnstake(trs.createdAt, sender.arp.stakes, voteType, lastBlockHeight);
                const arpAirdropReward = DDK.voteARPCalculator.calculate(
                    sender,
                    arpTotalReward.reward,
                    availableARPBalance,
                );

                return mergeAirdrops(airdropReward, arpAirdropReward);
            }

            return airdropReward;
        default:
            break;
    }

    return createAirdropReward();
};
