import { RemoteAuthentication } from './remote-authentication'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAccountModel, mockAuthentication } from '@/domain/tests'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy<AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<AccountModel>()
  const sut = new RemoteAuthentication(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut(url)
    await sut.auth(mockAuthentication())

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
  })

  it('should call HttpClient with correctly body', async () => {
    const { httpClientSpy, sut } = makeSut()
    const authenticationParams = mockAuthentication()

    await sut.auth(authenticationParams)

    expect(httpClientSpy.body).toBe(authenticationParams)
  })

  it('should throw InvalidCredentialsError error if HttpClient returns 401', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }

    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw an Unexpected error if HttpClient returns 400', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw an Unexpected error if HttpClient returns 500', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw an Unexpected error if HttpClient returns 404', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an AccountModel HttpClient returns 200', async () => {
    const { httpClientSpy, sut } = makeSut()

    const httpResult = mockAccountModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.auth(mockAuthentication())
    expect(account).toEqual(httpResult)
  })
})
