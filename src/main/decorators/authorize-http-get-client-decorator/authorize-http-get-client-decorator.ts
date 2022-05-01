import { HttpResponse } from '@/data/protocols/http'
import { HttpGetClient, HttpGetParams } from '@/data/protocols/http/http-get-client'
import { GetStorage } from '@/data/protocols/cache/get-storage'

export class AuthorizeHtppGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly gestStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient) {
  }

  async get (params: HttpGetParams): Promise<HttpResponse> {
    const account = this.gestStorage.get('account')

    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          'x-access-token': account.accessToken
        })
      })
    }

    const httpResponse = await this.httpGetClient.get(params)
    return httpResponse
  }
}
