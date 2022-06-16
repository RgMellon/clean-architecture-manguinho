import {
  HttpResponse,
  HttpStatusCode,
  HttpRequest,
  HttpClient
} from '@/data/protocols/http'

import faker from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete'])
})

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  body?: any;
  method?: string;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  };

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url
    this.body = data.body
    this.method = data.method
    this.headers = data.headers
    return Promise.resolve(this.response)
  }
}
