import { HttpGetParams } from '@/data/protocols/http/http-get-client'
import { GestStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test'
import { mockAccountModel } from '@/domain/tests'
import { AuthorizeHtppGetClientDecorator } from '@/main/decorators'

import faker from 'faker'

type SutTypes = {
  sut: AuthorizeHtppGetClientDecorator
  getStorageSpy: GestStorageSpy
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GestStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHtppGetClientDecorator(getStorageSpy, httpGetClientSpy)

  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  }
}

describe('AuthorizeHtppGetClientDecorator', () => {
  test('Should call GestStorage with correct value', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()
    await sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url()
    }

    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('Should add headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url()
    }

    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })
})
