import { Address, PublicKey } from '../model/common/type';
import { Account } from '../model/common/account';
export interface IAccountRepository {
    getByAddress(accountAddress: Address): Account;
    getByPublicKey(accountPublicKey: PublicKey): Account;
}
