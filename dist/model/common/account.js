"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delegate_1 = require("./delegate");
const stake_1 = require("./transaction/stake");
const account_1 = require("../../util/account");
const airdrop_1 = require("./airdrop");
class Account {
    constructor(data) {
        this.publicKey = data.publicKey;
        this.actualBalance = data.actualBalance || 0;
        this.address = data.address || account_1.getAddressByPublicKey(data.publicKey);
        this.secondPublicKey = data.secondPublicKey;
        if (data.delegate) {
            this.delegate = new delegate_1.Delegate(Object.assign({}, data.delegate, { account: this }));
        }
        this.votes = data.votes || [];
        this.referrals = data.referrals || [];
        this.stakes = (data.stakes || []).map(item => new stake_1.Stake(Object.assign({}, item)));
        this.arp = new airdrop_1.Airdrop(data.arp);
    }
}
exports.Account = Account;
