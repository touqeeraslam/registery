import { Account } from './account';
import { Stake, StakeSchema } from './transaction/stake';
export declare enum AirdropType {
    AIRDROP = "airdrop",
    ARP = "arp"
}
export declare type AirdropSchema = {
    referrals?: Array<Account>;
    stakes?: Array<StakeSchema>;
};
export declare class Airdrop {
    referrals?: Array<Account>;
    stakes?: Array<Stake>;
    constructor(data?: AirdropSchema);
}
