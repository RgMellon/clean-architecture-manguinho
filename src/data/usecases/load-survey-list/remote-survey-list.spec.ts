import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { mockRemoteSurveyListModel } from '@/domain/tests/mock-remote-survey-list'

import faker from 'faker'
import { RemoteLoadSurveyList, RemoteLoadSurveyListModel } from './remote-survey-list'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyListModel[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyListModel[]>()
  const sut = new RemoteLoadSurveyList(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  it('Should call HttpClient with correct URL and methood', async () => {
    const url = faker.internet.url()
    const { httpClientSpy, sut } = makeSut(url)
    await sut.loadAll()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  it('should throw AccessDeniedError error if HttpClient returns 403', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbiden
    }

    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw Unexpected error if HttpClient returns 404', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw Unexpected error if HttpClient returns 500', async () => {
    const { httpClientSpy, sut } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a list of SurveyModels if HttpClient returns 200', async () => {
    const { httpClientSpy, sut } = makeSut()

    const httpResult = mockRemoteSurveyListModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const surveyList = await sut.loadAll()

    expect(surveyList).toEqual([{
      id: httpResult[0].id,
      question: httpResult[0].question,
      didAnswer: httpResult[0].didAnswer,
      date: new Date(httpResult[0].date),
      answers: httpResult[0].answers
    }, {
      id: httpResult[1].id,
      question: httpResult[1].question,
      didAnswer: httpResult[1].didAnswer,
      date: new Date(httpResult[1].date),
      answers: httpResult[1].answers
    }, {
      id: httpResult[2].id,
      question: httpResult[2].question,
      didAnswer: httpResult[2].didAnswer,
      date: new Date(httpResult[2].date),
      answers: httpResult[2].answers
    }])
  })

  it('should return an empty list if HttpClient returns 204', async () => {
    const { httpClientSpy, sut } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }

    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual([])
  })
})
