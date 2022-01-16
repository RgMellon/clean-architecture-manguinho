import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  it('Should call axios wiht corretly url and verb', async () => {
    const url = faker.internet.url()
    const sut = makeSut()
    await sut.post({ url })

    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
