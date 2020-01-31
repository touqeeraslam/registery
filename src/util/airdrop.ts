import { createAirdropReward } from './arp/util';
import { AirdropReward } from '../model/common/type';

export const mergeAirdrops = (...airdrops: Array<AirdropReward>): AirdropReward => {
    const mergedAirdrop = createAirdropReward();

    airdrops.forEach(airdrop => {
        airdrop.sponsors.forEach((reward, address) => {
            const currentReward = mergedAirdrop.sponsors.get(address) || 0;

            mergedAirdrop.sponsors.set(address, reward + currentReward);
        });
    });

    return mergedAirdrop;
};
