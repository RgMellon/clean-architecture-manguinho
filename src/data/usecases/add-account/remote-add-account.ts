import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { EmailInUsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { AddAccount } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<AccountModel>
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpClient.request({ url: this.url, body: params, method: 'post' })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbiden: throw new EmailInUsError()

      default: throw new UnexpectedError()
    }
  }
}
