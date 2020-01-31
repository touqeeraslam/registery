"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("./account");
const stake_1 = require("./transaction/stake");
var AirdropType;
(function (AirdropType) {
    AirdropType["AIRDROP"] = "airdrop";
    AirdropType["ARP"] = "arp";
})(AirdropType = exports.AirdropType || (exports.AirdropType = {}));
class Airdrop {
    constructor(data) {
        this.referrals = [];
        this.stakes = [];
        if (data && Array.isArray(data.referrals)) {
            this.referrals = (data.referrals || []).map(item => new account_1.Account(Object.assign({}, item)));
        }
        if (data && Array.isArray(data.stakes)) {
            this.stakes = data.stakes.map(item => new stake_1.Stake(Object.assign({}, item)));
        }
    }
}
exports.Airdrop = Airdrop;
