import { WORKSPACE, ConfigSchema } from './config';
import { IRewardCalculator } from './util/reward';
import { IStakeARPCalculator } from './util/arp/stake';
import { IVoteARPCalculator } from './util/arp/vote';
import { Feature } from './model/common/feature';
export * from './config';
export declare class DDKRegistry {
    private _config;
    private _rewardCalculator;
    private _stakeARPCalculator;
    private _voteARPCalculator;
    readonly config: ConfigSchema;
    readonly rewardCalculator: IRewardCalculator;
    readonly stakeARPCalculator: IStakeARPCalculator;
    readonly voteARPCalculator: IVoteARPCalculator;
    isFeatureEnabled(feature: Feature, lastBlockHeight: number): boolean;
    initialize(workspace?: WORKSPACE): void;
}
declare const DDK: DDKRegistry;
export default DDK;
