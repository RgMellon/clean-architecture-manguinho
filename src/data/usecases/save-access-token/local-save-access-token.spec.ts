import faker from 'faker'
import { LocalSavesAccessToken } from './local-save-access-token'
import { SetStorageSpy } from '@/data/test/mock-storage'

describe('LocalSavesAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy()

    const sut = new LocalSavesAccessToken(setStorageSpy)
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
