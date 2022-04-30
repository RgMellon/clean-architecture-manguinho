import { GestStorageSpy, mockGetRequest } from '@/data/test'
import { AuthorizeHtppGetClientDecorator } from '@/main/decorators'

describe('AuthorizeHtppGetClientDecorator', () => {
  test('Should call GestStorage with correct value', () => {
    const getStorageSpy = new GestStorageSpy()
    const sut = new AuthorizeHtppGetClientDecorator(getStorageSpy)
    sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})
