import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyListResult {
  constructor (private readonly url: string, private readonly httpGetClient: HttpGetClient) {

  }

  async load (): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.serverError: throw new UnexpectedError()
      case HttpStatusCode.forbiden: throw new AccessDeniedError()
      default : throw new AccessDeniedError()
    }
  }
}
