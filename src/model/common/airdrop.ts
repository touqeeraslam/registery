import { Account } from './account';
import { Stake } from './transaction/stake';

export enum AirdropType {
    AIRDROP = 'airdrop',
    ARP = 'arp'
}

export class Airdrop {
    referrals?: Array<Account>;
    stakes?: Array<Stake>;

    constructor(data?: Airdrop) {
        this.referrals = [];
        this.stakes = [];

        if (data && Array.isArray(data.referrals)) {
            this.referrals = [...data.referrals];
        }

        if (data && Array.isArray(data.stakes)) {
            this.stakes = data.stakes.map(stake => new Stake({ ...stake }));
        }
    }
}
