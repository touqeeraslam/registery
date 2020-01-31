import { expect } from 'chai';

import { createAirdropReward } from './arp/util';
import { mergeAirdrops } from './airdrop';
import { isEqualMaps } from './map';

describe('Airdrop util', () => {
    it('Merge 2 airdrops', () => {
        const airdrop1 = createAirdropReward();
        const airdrop2 = createAirdropReward();

        airdrop1.sponsors.set(BigInt('1'), 2);
        airdrop2.sponsors.set(BigInt('3'), 4);

        airdrop1.sponsors.set(BigInt('5'), 10);
        airdrop2.sponsors.set(BigInt('5'), 40);

        const mergedAirdrop = mergeAirdrops(airdrop1, airdrop2);

        const expectedAirdrop = createAirdropReward();
        expectedAirdrop.sponsors.set(BigInt('1'), 2);
        expectedAirdrop.sponsors.set(BigInt('5'), 50);
        expectedAirdrop.sponsors.set(BigInt('3'), 4);

        expect(expectedAirdrop).to.eql(mergedAirdrop);
        expect(isEqualMaps(expectedAirdrop.sponsors, mergedAirdrop.sponsors)).to.equal(true);
    });
});
