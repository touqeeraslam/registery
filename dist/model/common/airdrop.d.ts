import { Account } from './account';
import { Stake } from './transaction/stake';
export declare enum AirdropType {
    AIRDROP = "airdrop",
    ARP = "arp"
}
export declare class Airdrop {
    referrals?: Array<Account>;
    stakes?: Array<Stake>;
    constructor(data?: Airdrop);
}
