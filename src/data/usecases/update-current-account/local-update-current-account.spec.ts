import { LocalUpdateCurrentAccount } from './local-update-current-account'
import { SetStorageSpy } from '@/data/test'
import { mockAccountModel } from '@/domain/tests'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalUpdateCurrentAccount(setStorageSpy)

  return {
    sut,
    setStorageSpy
  }
}

describe('LocalUpdateCurrentAccount', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()

    const account = mockAccountModel()
    await sut.save(account)

    expect(setStorageSpy.key).toBe('account')
    expect(setStorageSpy.value).toBe(JSON.stringify(account))
  })

  // test('should throw if SetStorage throws', async () => {
  //   const { sut, setStorageSpy } = makeSut()
  //   jest.spyOn(setStorageSpy, 'set').mockRejectedValueOnce(new Error(''))

  //   const promise = await sut.save(faker.random.uuid())
  //   await expect(promise).rejects.toThrow(new Error(''))
  // })
})
