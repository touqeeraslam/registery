import { WORKSPACE, ConfigSchema } from './config';
import { IRewardCalculator } from './util/reward';
import { Feature } from './model/common/feature';
import { IARPCalculator } from './util/arp/calculator';
export * from './config';
export declare class DDKRegistry {
    private _config;
    private _rewardCalculator;
    private _stakeARPCalculator;
    private _voteARPCalculator;
    readonly config: ConfigSchema;
    readonly rewardCalculator: IRewardCalculator;
    readonly stakeARPCalculator: IARPCalculator;
    readonly voteARPCalculator: IARPCalculator;
    isFeatureEnabled(feature: Feature, lastBlockHeight: number): boolean;
    initialize(workspace?: WORKSPACE): void;
}
declare const DDK: DDKRegistry;
export default DDK;
