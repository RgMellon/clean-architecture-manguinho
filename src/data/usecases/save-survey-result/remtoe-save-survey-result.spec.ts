
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockSurveyResultModel } from '@/domain/tests'

import faker from 'faker'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockSurveyResultModel()
    }
    // const saveSurveyResultParams = mockSaveSurveyResultParams()

    await sut.save({
      answer: faker.random.word()
    })

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
  })
})
