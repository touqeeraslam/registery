import { Account } from '../../model/common/account';
import { AirdropReward } from '../../model/common/type';
import { StakeSchema } from '../../model/common/transaction/stake';
import { createAirdropReward } from './util';

export interface IARPCalculator {
    calculate(
        sender: Account,
        amount: number,
    ): AirdropReward;
}

export class ARPCalculator implements IARPCalculator {

    constructor(
        private readonly rewardPercentPerLevel: Array<number>,
        private readonly minActiveStakeAmountForReceive: number,
    ) { }

    calculate(
        sender: Account,
        amount: number,
    ): AirdropReward {
        const airdropReward = createAirdropReward();

        if (
            !amount ||
            !sender ||
            !Array.isArray(sender.arp.referrals) ||
            sender.arp.referrals.length === 0
        ) {
            return airdropReward;
        }

        this.rewardPercentPerLevel.forEach((rewardPercent: number, index: number) => {
            const referrer = sender.arp.referrals[index];
            if (!referrer) {
                return;
            }

            const referrerActiveStakeAmount = referrer.arp.stakes.reduce((sum: number, stake: StakeSchema) => {
                if (stake.isActive) {
                    return sum + stake.amount;
                }
                return sum;
            }, 0);

            if (referrerActiveStakeAmount < this.minActiveStakeAmountForReceive) {
                return;
            }

            const reward = Math.ceil(amount * rewardPercent);
            airdropReward.sponsors.set(referrer.address, reward);
        });

        return airdropReward;
    }
}