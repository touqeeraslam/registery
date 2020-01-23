export declare const CONFIG_DEVELOPMENT: {
    AIRDROP: {
        ADDRESS: string;
        STAKE_REWARD_PERCENT: number;
        REFERRAL_PERCENT_PER_LEVEL: number[];
    };
    ARP: {
        ADDRESS: string;
        ENABLED_BLOCK_HEIGHT: number;
        CHAIN_REFERRAL_PERCENT_PER_LEVEL: number[];
        DIRECT_REFERRAL_PERCENT_PER_LEVEL: number[];
    };
    STAKE: {
        VOTE_MILESTONE: number;
        REWARDS: {
            MILESTONES: number[];
            DISTANCE: number;
        };
        REWARD_VOTE_COUNT: number;
        UNSTAKE_VOTE_COUNT: number;
    };
};
