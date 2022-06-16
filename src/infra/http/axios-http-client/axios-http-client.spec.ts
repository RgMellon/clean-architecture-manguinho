import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mocktHttpResponse } from '@/infra/test'
import { mockHttpRequest } from '@/data/test/mock-http'

import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  it('Should call axios wiht corret values', async () => {
    const request = mockHttpRequest()

    const { sut, mockedAxios } = makeSut()
    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method
    })
  })

  it('Should return corret response on axios', async () => {
    /* mockedAxios.request.mock.results[0] pega o resultado do resolvedValue,
    pois poderia ser o reject ja que usamos o mockResolvedValue */

    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.request(mockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  it('Should return correct error on axios.request', () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.request.mockRejectedValueOnce({
      response: mocktHttpResponse()
    })

    const promise = sut.request(mockHttpRequest())
    expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
