import faker from 'faker'

import { RemoteAddAccount } from '../add-account/remote-add-account'
import { HttpClientSpy } from '@/data/test'
import { AddAccount } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel, mockAddAccountParams } from '@/domain/tests'
import { HttpStatusCode } from '@/data/protocols/http'
import { EmailInUsError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy<AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<AddAccount.Model>()
  const sut = new RemoteAddAccount(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddAccount', () => {
  it('should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut(url)
    await sut.add(mockAddAccountParams())

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
  })

  it('should call HttpClient with correctly body', async () => {
    const { httpClientSpy, sut } = makeSut()
    const authenticationParams = mockAddAccountParams()

    await sut.add(authenticationParams)

    expect(httpClientSpy.body).toBe(authenticationParams)
  })

  it('should throw EmailInUsError if HttpClient returns 403', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbiden
    }

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUsError())
  })

  it('should throw an Unexpected error if HttpClient returns 400', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw an Unexpected error if HttpClient returns 500', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw an Unexpected error if HttpClient returns 404', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an AccountModel HttpClient returns 200', async () => {
    const { httpClientSpy, sut } = makeSut()

    const httpResult = mockAccountModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(httpResult)
  })
})
