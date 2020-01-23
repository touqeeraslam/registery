import { WORKSPACE, getConfig, ConfigSchema } from './config';
import { IRewardCalculator, initRewardCalculator } from './util/reward';
import { Feature } from './model/common/feature';

export * from './config';

export class DDKRegistry {
    private _config: ConfigSchema;
    private _rewardCalculator: IRewardCalculator;

    get config() {
        return this._config;
    }

    get rewardCalculator() {
        return this._rewardCalculator;
    }

    isFeatureEnabled(feature: Feature, lastBlockHeight: number): boolean {
        switch (feature) {
            case Feature.ARP:
                return lastBlockHeight >= this.config.ARP.ENABLED_BLOCK_HEIGHT;
            default:
                return false;
        }
    }

    initialize(workspace: WORKSPACE = WORKSPACE.MAINNET) {
        this._config = getConfig(workspace);
        this._rewardCalculator = initRewardCalculator(this._config);
    }
}

const DDK = new DDKRegistry();

export default DDK;
