"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
exports.CONFIG_MAINNET = {
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
        ENABLED_BLOCK_HEIGHT: Infinity - 10,
        DIRECT_REWARD: {
            PERCENT_PER_LEVEL: [
                0.05, 0.03, 0.02,
            ],
            MIN_STAKE_AMOUNT_FOR_DISTRIBUTION: 100 * const_1.COIN_MULTIPLIER,
            MAX_STAKE_AMOUNT_FOR_DISTRIBUTION: 500 * const_1.COIN_MULTIPLIER,
            MIN_ACTIVE_STAKE_AMOUNT_FOR_RECEIVE: 100 * const_1.COIN_MULTIPLIER,
        },
        CHAIN_REWARD: {
            PERCENT_PER_LEVEL: [
                0.05, 0.03, 0.02, 0.02, 0.01, 0.01, 0.01, 0.009, 0.008, 0.007, 0.006, 0.005, 0.005, 0.005, 0.005,
            ],
            MIN_STAKE_AMOUNT_FOR_DISTRIBUTION: 100 * const_1.COIN_MULTIPLIER,
            MAX_STAKE_AMOUNT_FOR_DISTRIBUTION: 500 * const_1.COIN_MULTIPLIER,
            MIN_ACTIVE_STAKE_AMOUNT_FOR_RECEIVE: 300 * const_1.COIN_MULTIPLIER,
        },
    },
    STAKE: {
        VOTE_MILESTONE: 604800,
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
        REWARD_VOTE_COUNT: 4,
        UNSTAKE_VOTE_COUNT: 24,
    },
};
