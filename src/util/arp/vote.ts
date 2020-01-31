import { IARPCalculator, ARPCalculator } from './calculator';
import { Account } from '../../model/common/account';
import { Timestamp, AirdropReward } from '../../model/common/type';
import { createAirdropReward, calculateTotalAirdropReward } from './util';
import { ConfigSchema } from '../..';

export interface IVoteARPCalculator {
    calculate(
        sender: Account,
        availableAirdropBalance: number,
        createdAt: Timestamp,
    ): AirdropReward;
}

export class VoteARPCalculator implements IVoteARPCalculator {

    constructor(
        private readonly arpCalculator: IARPCalculator,
    ) { }

    calculate(
        sender: Account,
        availableAirdropBalance: number,
        createdAt: Timestamp,
    ): AirdropReward {

        if (
            !sender ||
            !sender.arp ||
            !Array.isArray(sender.arp.stakes) ||
            sender.arp.stakes.length === 0
        ) {
            return createAirdropReward();
        }

        const stakesForRewards = sender.arp.stakes
            .filter(stake => stake.isActive && createdAt >= stake.nextVoteMilestone);

        if (stakesForRewards.length === 0) {
            return createAirdropReward();
        }

        const rewards = stakesForRewards.map(stake => this.arpCalculator.calculate(
            sender,
            stake.amount,
        ));

        if (rewards.length === 0) {
            return createAirdropReward();
        }

        const totalAirdropReward = rewards.reduce((sum: number, airdrop: AirdropReward) => {
            return sum + calculateTotalAirdropReward(airdrop);
        }, 0);

        if (availableAirdropBalance < totalAirdropReward) {
            return createAirdropReward();
        }

        return rewards.reduce((mergedAirdropReward: AirdropReward, airdrop: AirdropReward) => {
            airdrop.sponsors.forEach((reward: number, referrerAddress) => {
                const currentReferrerReward = mergedAirdropReward.sponsors.get(referrerAddress) || 0;

                mergedAirdropReward.sponsors.set(referrerAddress, currentReferrerReward + reward);
            });

            return mergedAirdropReward;
        }, createAirdropReward());
    }
}

export const initVoteARPCalculator = (config: ConfigSchema) => new VoteARPCalculator(
    new ARPCalculator(
        config.ARP.CHAIN_REWARD.PERCENT_PER_LEVEL,
        config.ARP.CHAIN_REWARD.MIN_ACTIVE_STAKE_AMOUNT_FOR_RECEIVE,
    ),
);
