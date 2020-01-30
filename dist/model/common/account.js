"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stake_1 = require("./transaction/stake");
const account_1 = require("../../util/account");
class Account {
    constructor(data) {
        this.publicKey = data.publicKey;
        this.actualBalance = data.actualBalance || 0;
        this.address = data.address || account_1.getAddressByPublicKey(data.publicKey);
        this.secondPublicKey = data.secondPublicKey;
        this.delegate = data.delegate;
        this.votes = data.votes || [];
        this.referrals = data.referrals || [];
        this.stakes = (data.stakes || []).map(stake => new stake_1.Stake(Object.assign({}, stake)));
    }
}
exports.Account = Account;
