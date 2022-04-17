import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/tests/mock-survey-list'
import faker from 'faker'
import { RemoteLoadSurveyList } from './remote-survey-list'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  it('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { httpGetClientSpy, sut } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  it('should throw Unexpected error if HttpGetClient returns 403', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbiden
    }

    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw Unexpected error if HttpGetClient returns 404', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw Unexpected error if HttpGetClient returns 500', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a list of SurveyModels if HttpGetClient returns 200', async () => {
    const { httpGetClientSpy, sut } = makeSut()

    const httpResult = mockSurveyListModel()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual(httpResult)
  })
})
