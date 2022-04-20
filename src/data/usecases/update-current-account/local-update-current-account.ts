import { SetStorage } from '@/data/protocols/cache/set-storage'
import { AccountModel } from '@/domain/models'
import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorageSpy: SetStorage) {}
  async save (account: AccountModel): Promise<void> {
    await this.setStorageSpy.set('account', JSON.stringify(account))
  }
}
