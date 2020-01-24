import { WORKSPACE, getConfig, ConfigSchema } from './config';
import { IRewardCalculator, initRewardCalculator } from './util/reward';
import { IStakeARPCalculator, initStakeARPCalculator } from './util/arp/stake';
import { IVoteARPCalculator, initVoteARPCalculator } from './util/arp/vote';
import { Feature } from './model/common/feature';

export * from './config';

export class DDKRegistry {
    private _config: ConfigSchema;
    private _rewardCalculator: IRewardCalculator;
    private _stakeARPCalculator: IStakeARPCalculator;
    private _voteARPCalculator: IVoteARPCalculator;

    get config() {
        return this._config;
    }

    get rewardCalculator() {
        return this._rewardCalculator;
    }

    get stakeARPCalculator() {
        return this._stakeARPCalculator;
    }

    get voteARPCalculator() {
        return this._voteARPCalculator;
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
        this._stakeARPCalculator = initStakeARPCalculator(this.config);
        this._voteARPCalculator = initVoteARPCalculator(this.config);
    }
}

const DDK = new DDKRegistry();

export default DDK;
