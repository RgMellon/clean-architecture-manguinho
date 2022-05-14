import { HttpGetClientSpy } from '@/data/test'
import faker from 'faker'
import { RemoteLoadSurveyListResult } from './remote-load-survey-result'

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyListResult(url, httpGetClientSpy)
    await sut.load()

    expect(httpGetClientSpy.url).toBe(url)
  })
})
