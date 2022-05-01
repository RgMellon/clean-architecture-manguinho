import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { AuthorizeHtppGetClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '../cache/local-storage-adapter-factory'
import { makeAxiosHttpClient } from '../http/axios-http-client.factory'

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHtppGetClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
