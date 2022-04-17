import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mocktHttpResponse } from '@/infra/test'
import { mockPostRequest } from '@/data/test/mock-http'

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
  describe('post', () => {
    it('Should call axios.post wiht corret values', async () => {
      const request = mockPostRequest()

      const { sut, mockedAxios } = makeSut()
      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('Should return axios.post corret response on axios.post', () => {
      const { sut, mockedAxios } = makeSut()
      const promise = sut.post(mockPostRequest())

      /* mockedAxios.post.mock.results[0] pega o resultado do resolvedValue,
    pois poderia ser o reject ja que usamos o mockResolvedValue */

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    it('Should return correct error on axios.post', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mocktHttpResponse()
      })

      const promise = sut.post(mockPostRequest())
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
})
