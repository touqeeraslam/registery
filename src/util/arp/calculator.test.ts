
import { expect } from 'chai';
import DDK, { WORKSPACE } from '../..';
import { ARPCalculator } from './calculator';
import { createAirdropReward } from './util';
import { Account } from '../../model/common/account';

describe('ARP calculator', () => {
    beforeEach(() => {
        DDK.initialize(WORKSPACE.MAINNET);
    });

    it('Empty sender', () => {
        const calculator = new ARPCalculator([], 1);
        const sender: Account = null;
        const amount: number = 0;

        const airdropReward = calculator.calculate(sender, amount);
        const expectairdropReward = createAirdropReward();

        expect(expectairdropReward).to.deep.equal(airdropReward);
    });

    it('Sender without referrals', () => {
        const calculator = new ARPCalculator([], 1);
        const sender: Account = new Account({ publicKey: '' });

        const amount: number = 0;

        const airdropReward = calculator.calculate(sender, amount);
        const expectairdropReward = createAirdropReward();

        expect(expectairdropReward).to.deep.equal(airdropReward);
    });

    it('Sender with emty referrals', () => {
        const calculator = new ARPCalculator([], 1);
        const sender: Account = new Account({ publicKey: '', arp: { referrals: [] } });
        const amount: number = 0;

        const airdropReward = calculator.calculate(sender, amount);
        const expectairdropReward = createAirdropReward();

        expect(expectairdropReward).to.deep.equal(airdropReward);
    });

    it('Airdrop Reward referrer not active stack', () => {
        const rewardPercentPerLevel = [0.05];
        const minActiveStakeAmountForReceive = 100;
        const calculator = new ARPCalculator(rewardPercentPerLevel, minActiveStakeAmountForReceive);
        const referrerLevel1 = new Account({
            publicKey: '',
            address: BigInt('0000000000000000001'),
            arp: {
                stakes: [
                    {
                        createdAt: 0,
                        isActive: false,
                        amount: 200,
                        voteCount: 0,
                        nextVoteMilestone: 0,
                        airdropReward: null,
                        sourceTransactionId: Buffer.alloc(0)
                    }
                ]
            }
        });

        const sender: Account = new Account({ publicKey: '', arp: { referrals: [referrerLevel1] } });
        const amount: number = 10;

        const airdropReward = calculator.calculate(sender, amount);
        const expectairdropReward = createAirdropReward();

        expect(expectairdropReward).to.deep.equal(airdropReward);
    });

    it('Airdrop Reward referrer stack.amount < min', () => {
        const rewardPercentPerLevel = [0.05];
        const minActiveStakeAmountForReceive = 100;
        const calculator = new ARPCalculator(rewardPercentPerLevel, minActiveStakeAmountForReceive);
        const referrerLevel1 = new Account({
            publicKey: '',
            address: BigInt('0000000000000000001'),
            arp: {
                stakes: [
                    {
                        createdAt: 0,
                        isActive: true,
                        amount: 10,
                        voteCount: 0,
                        nextVoteMilestone: 0,
                        airdropReward: null,
                        sourceTransactionId: Buffer.alloc(0)
                    }
                ]
            }
        });

        const sender: Account = new Account({ publicKey: '', arp: { referrals: [referrerLevel1] } });
        const amount: number = 10;

        const airdropReward = calculator.calculate(sender, amount);
        const expectairdropReward = createAirdropReward();

        expect(expectairdropReward).to.deep.equal(airdropReward);
    });

    it('Airdrop Reward Level 1', () => {
        const rewardPercentPerLevel = [0.05];
        const minActiveStakeAmountForReceive = 100;
        const calculator = new ARPCalculator(rewardPercentPerLevel, minActiveStakeAmountForReceive);
        const referrerLevel1 = new Account({
            publicKey: '',
            address: BigInt('0000000000000000001'),
            arp: {
                stakes: [
                    {
                        createdAt: 0,
                        isActive: true,
                        amount: 1000,
                        voteCount: 0,
                        nextVoteMilestone: 0,
                        airdropReward: null,
                        sourceTransactionId: Buffer.alloc(0)
                    }
                ]
            }
        });

        const sender: Account = new Account({ publicKey: '', arp: { referrals: [referrerLevel1] } });
        const amount: number = 10;

        const airdropReward = calculator.calculate(sender, amount);
        const expectairdropReward = createAirdropReward(new Map([
            [referrerLevel1.address, Math.ceil(amount * rewardPercentPerLevel[0])]
        ]));

        expect(expectairdropReward).to.deep.equal(airdropReward);
    });

    it('Airdrop Reward Level 1 with 2 stack', () => {
        const rewardPercentPerLevel = [0.05];
        const minActiveStakeAmountForReceive = 100;
        const calculator = new ARPCalculator(rewardPercentPerLevel, minActiveStakeAmountForReceive);
        const referrerLevel1 = new Account({
            publicKey: '',
            address: BigInt('0000000000000000001'),
            arp: {
                stakes: [
                    {
                        createdAt: 0,
                        isActive: true,
                        amount: 50,
                        voteCount: 0,
                        nextVoteMilestone: 0,
                        airdropReward: null,
                        sourceTransactionId: Buffer.alloc(0)
                    },
                    {
                        createdAt: 0,
                        isActive: true,
                        amount: 50,
                        voteCount: 0,
                        nextVoteMilestone: 0,
                        airdropReward: null,
                        sourceTransactionId: Buffer.alloc(0)
                    }
                ]
            }
        });

        const sender: Account = new Account({ publicKey: '', arp: { referrals: [referrerLevel1] } });
        const amount: number = 10;

        const airdropReward = calculator.calculate(sender, amount);
        const expectairdropReward = createAirdropReward(new Map([
            [referrerLevel1.address, Math.ceil(amount * rewardPercentPerLevel[0])]
        ]));

        expect(expectairdropReward).to.deep.equal(airdropReward);
    });

    it('Airdrop Reward Level 1, 2, 3', () => {
        const rewardPercentPerLevel = [0.05, 0.03, 0.02];
        const minActiveStakeAmountForReceive = 100;
        const calculator = new ARPCalculator(rewardPercentPerLevel, minActiveStakeAmountForReceive);

        const referrerLevel1 = new Account({
            publicKey: '',
            address: BigInt('0000000000000000001'),
            arp: {
                stakes: [
                    {
                        createdAt: 0,
                        isActive: true,
                        amount: 50,
                        voteCount: 0,
                        nextVoteMilestone: 0,
                        airdropReward: null,
                        sourceTransactionId: Buffer.alloc(0)
                    },
                    {
                        createdAt: 0,
                        isActive: true,
                        amount: 50,
                        voteCount: 0,
                        nextVoteMilestone: 0,
                        airdropReward: null,
                        sourceTransactionId: Buffer.alloc(0)
                    }
                ]
            }
        });

        const referrerLevel2 = new Account({
            publicKey: '',
            address: BigInt('0000000000000000002'),
            arp: {
                stakes: [
                    {
                        createdAt: 0,
                        isActive: false,
                        amount: 1000,
                        voteCount: 0,
                        nextVoteMilestone: 0,
                        airdropReward: null,
                        sourceTransactionId: Buffer.alloc(0)
                    }
                ]
            }
        });

        const referrerLevel3 = new Account({
            publicKey: '',
            address: BigInt('0000000000000000003'),
            arp: {
                stakes: [
                    {
                        createdAt: 0,
                        isActive: true,
                        amount: 1000,
                        voteCount: 0,
                        nextVoteMilestone: 0,
                        airdropReward: null,
                        sourceTransactionId: Buffer.alloc(0)
                    }
                ]
            }
        });

        const sender: Account = new Account({
            publicKey: '',
            arp: {
                referrals: [
                    referrerLevel1,
                    referrerLevel2,
                    referrerLevel3,
                ]
            }
        });
        const amount: number = 10;

        const airdropReward = calculator.calculate(sender, amount);
        const expectairdropReward = createAirdropReward(new Map([
            [referrerLevel1.address, Math.ceil(amount * rewardPercentPerLevel[0])],
            [referrerLevel3.address, Math.ceil(amount * rewardPercentPerLevel[2])],
        ]));

        expect(expectairdropReward).to.deep.equal(airdropReward);
    });

});
