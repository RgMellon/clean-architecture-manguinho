import { SetStorage } from '@/data/protocols/cache/set-storage'
import { AccountModel } from '@/domain/models'
import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorageSpy: SetStorage) {}
  // eslint-disable-next-line @typescript-eslint/require-await
  async save (account: AccountModel): Promise<void> {
    this.setStorageSpy.set('account', JSON.stringify(account))
  }
}
