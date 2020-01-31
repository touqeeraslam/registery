import { IARPCalculator } from './calculator';
import { Account } from '../../model/common/account';
import { AirdropReward } from '../../model/common/type';
import { ConfigSchema } from '../../config';
export interface IStakeARPCalculator {
    calculate(sender: Account, stakeAmount: number, availableAirdropBalance: number): AirdropReward;
}
export declare class StakeARPCalculator implements IStakeARPCalculator {
    private readonly arpCalculator;
    private readonly minAmountForDistribution;
    private readonly maxAmountForDistribution;
    constructor(arpCalculator: IARPCalculator, minAmountForDistribution: number, maxAmountForDistribution: number);
    calculate(sender: Account, stakeAmount: number, availableAirdropBalance: number): AirdropReward;
}
export declare const initStakeARPCalculator: (config: ConfigSchema) => StakeARPCalculator;
