import { AirdropReward } from '../../model/common/type';
export declare const createAirdropReward: (sponsors?: Map<bigint, number>) => AirdropReward;
export declare const calculateTotalAirdropReward: (airdrop: AirdropReward) => number;
