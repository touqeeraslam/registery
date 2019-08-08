"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_TESTNET = {
    AIRDROP: {
        ADDRESS: '7897332094363171058',
        STAKE_REWARD_PERCENT: 0.1,
        REFERRAL_PERCENT_PER_LEVEL: [
            0.05, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.009, 0.008, 0.007, 0.006, 0.005, 0.005, 0.005, 0.005,
        ],
    },
    STAKE: {
        VOTE_MILESTONE: 10,
        REWARDS: {
            MILESTONES: [
                0.1,
                0.1,
                0.1,
                0.1,
                0.1,
                0.1 // 2% For 31 months and above
            ],
            DISTANCE: 30,
        },
        REWARD_VOTE_COUNT: 2,
        UNSTAKE_VOTE_COUNT: 4,
    },
};
