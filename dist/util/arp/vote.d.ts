import { IARPCalculator } from './calculator';
import { Account } from '../../model/common/account';
import { Timestamp, AirdropReward } from '../../model/common/type';
import { ConfigSchema } from '../..';
export interface IVoteARPCalculator {
    calculate(sender: Account, availableAirdropBalance: number, createdAt: Timestamp): AirdropReward;
}
export declare class VoteARPCalculator implements IVoteARPCalculator {
    private readonly arpCalculator;
    constructor(arpCalculator: IARPCalculator);
    calculate(sender: Account, availableAirdropBalance: number, createdAt: Timestamp): AirdropReward;
}
export declare const initVoteARPCalculator: (config: ConfigSchema) => VoteARPCalculator;
