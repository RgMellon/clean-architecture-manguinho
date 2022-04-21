import { mockAccountModel } from '@/domain/tests'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { setCurrentAccountAdapter } from './current-account-adapters'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })
})
