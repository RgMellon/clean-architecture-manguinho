import { HttpResponse } from '@/data/protocols/http'
import { HttpClient, HttpRequest } from '@/data/protocols/http/http-client'
import { GetStorage } from '@/data/protocols/cache/get-storage'

export class AuthorizeHtppClientDecorator implements HttpClient {
  constructor (
    private readonly gestStorage: GetStorage,
    private readonly httpClient: HttpClient) {
  }

  async request (data: HttpRequest): Promise<HttpResponse> {
    const account = this.gestStorage.get('account')

    if (account?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          'x-access-token': account.accessToken
        })
      })
    }

    const httpResponse = await this.httpClient.request(data)
    return httpResponse
  }
}
