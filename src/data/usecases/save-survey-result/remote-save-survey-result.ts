/* eslint-disable import/export */
/* eslint-disable no-redeclare */

import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { RemoteSurveyResultModel } from '@/data/models'

import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
    })
    const remoteSurveyResult = httpResponse.body
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return { ...remoteSurveyResult, date: new Date(remoteSurveyResult.date) }
      case HttpStatusCode.forbiden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}
