import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockSurveyResultModel } from '@/domain/tests'
import faker from 'faker'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    const httpResult = mockSurveyResultModel()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbiden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw AccessDeniedError if HttpGetClient returns 401', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbiden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Shold return a SurveyResult on 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockSurveyResultModel()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const httpResponse = await sut.load()
    expect(httpResponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date)
    })
  })
})
