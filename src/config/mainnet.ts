export const CONFIG_MAINNET = {
    AIRDROP: {
        ADDRESS: '11696703665952770027',
        STAKE_REWARD_PERCENT: 0.1,
        REFERRAL_PERCENT_PER_LEVEL: [
            0.05, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.009, 0.008, 0.007, 0.006, 0.005, 0.005, 0.005, 0.005,
        ],
    },
    ARP: {
        ADDRESS: '17273227771820562781',
        // TODO add befo relase
        ENABLED_BLOCK_HEIGHT: Infinity,
        CHAIN_REFERRAL_PERCENT_PER_LEVEL: [
            0.05, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.009, 0.008, 0.007, 0.006, 0.005, 0.005, 0.005, 0.005,
        ],
        DIRECT_REFERRAL_PERCENT_PER_LEVEL: [
            0.05, 0.03, 0.02
        ]
    },
    STAKE: {
        VOTE_MILESTONE: 604800, // in seconds
        REWARDS: {
            MILESTONES: [
                0.1, // 10% For 0-6 months
                0.1, // 10% For 7-12 months
                0.1, // 8% For 13-18 months
                0.1, // 6% For 19-24 months
                0.1, // 4% For 25-30 months
                0.1  // 2% For 31 months and above
            ],
            DISTANCE: 30, // Distance between each milestone is 6 months
        },
        REWARD_VOTE_COUNT: 4,
        UNSTAKE_VOTE_COUNT: 24,
    },
};
