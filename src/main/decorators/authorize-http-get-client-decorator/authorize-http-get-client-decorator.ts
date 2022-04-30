import { HttpResponse } from '@/data/protocols/http'
import { HttpGetClient, HttpGetParams } from '@/data/protocols/http/http-get-client'
import { GetStorage } from '@/data/protocols/cache/get-storage'

export class AuthorizeHtppGetClientDecorator implements HttpGetClient {
  constructor (private readonly gestStorage: GetStorage) {

  }

  async get (params: HttpGetParams): Promise<HttpResponse> {
    this.gestStorage.get('account')
    return Promise.resolve(null)
  }
}
