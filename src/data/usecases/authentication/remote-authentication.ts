import { HttpPostClient } from 'data/protocols/http/http-post-client'

let u

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (): Promise<void> {
    await this.httpPostClient.post(this.url)
  }
}
