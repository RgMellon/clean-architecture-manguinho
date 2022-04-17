import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyList {
  constructor (private readonly url: string, private readonly httpGetClientSpy: HttpGetClient) {}

  async loadAll (): Promise<void> {
    const httpResponse = await this.httpGetClientSpy.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
    }
  }
}
