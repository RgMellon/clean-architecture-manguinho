import { AddAccount } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/tests'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccount.Params
  callsCount = 0

  // eslint-disable-next-line @typescript-eslint/require-await
  async add (params: AddAccount.Params): Promise<AccountModel> {
    this.params = params
    this.callsCount++
    return this.account
  }
}
