import { WORKSPACE, ConfigSchema } from './config';
import { IRewardCalculator } from './util/reward';
import { Feature } from './model/common/feature';
export * from './config';
export declare class DDKRegistry {
    private _config;
    private _rewardCalculator;
    readonly config: ConfigSchema;
    readonly rewardCalculator: IRewardCalculator;
    isFeatureEnabled(feature: Feature, lastBlockHeight: number): boolean;
    initialize(workspace?: WORKSPACE): void;
}
declare const DDK: DDKRegistry;
export default DDK;
