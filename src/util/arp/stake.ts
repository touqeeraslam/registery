import { IARPCalculator, ARPCalculator } from './calculator';
import { Account } from '../../model/common/account';
import { AirdropReward } from '../../model/common/type';
import { createAirdropReward, calculateTotalAirdropReward } from './util';
import { ConfigSchema } from '../../config';

export interface IStakeARPCalculator {
    calculate(
        sender: Account,
        stakeAmount: number,
        availableAirdropBalance: number,
    ): AirdropReward;
}

export class StakeARPCalculator implements IStakeARPCalculator {
    constructor(
        private readonly arpCalculator: IARPCalculator,
    ) { }

    calculate(
        sender: Account,
        stakeAmount: number,
        availableAirdropBalance: number,
    ): AirdropReward {
        const airdrop = this.arpCalculator.calculate(sender, stakeAmount);
        const totalAirdropReward = calculateTotalAirdropReward(airdrop);

        if (availableAirdropBalance < totalAirdropReward) {
            return createAirdropReward();
        }

        return airdrop;
    }
}

export const initStakeARPCalculator = (config: ConfigSchema) => new StakeARPCalculator(
    new ARPCalculator(
        config.ARP.DIRECT_REWARD.PERCENT_PER_LEVEL,
        config.ARP.DIRECT_REWARD.MIN_ACTIVE_STAKE_AMOUNT_FOR_RECEIVE,
    ),
);
