import faker from 'faker'
import { LocalSavesAccessToken } from './local-save-access-token'
import { SetStorageSpy } from '@/data/test'

type SutTypes = {
  sut: LocalSavesAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSavesAccessToken(setStorageSpy)

  return {
    sut,
    setStorageSpy
  }
}

describe('LocalSavesAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()

    const accessToken = faker.random.uuid()
    await sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })

  // test('should throw if SetStorage throws', async () => {
  //   const { sut, setStorageSpy } = makeSut()
  //   jest.spyOn(setStorageSpy, 'set').mockRejectedValueOnce(new Error(''))

  //   const promise = await sut.save(faker.random.uuid())
  //   await expect(promise).rejects.toThrow(new Error(''))
  // })
})
