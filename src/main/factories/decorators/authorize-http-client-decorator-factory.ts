import { HttpClient } from '@/data/protocols/http/http-client'
import { AuthorizeHtppClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '../cache/local-storage-adapter-factory'
import { makeAxiosHttpClient } from '../http/axios-http-client.factory'

export const makeAuthorizeHttpGetClientDecorator = (): HttpClient => {
  return new AuthorizeHtppClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
