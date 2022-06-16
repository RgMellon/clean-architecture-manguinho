/* eslint-disable import/export */
/* eslint-disable no-redeclare */
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClient } from '@/data/protocols/http/http-client'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly url: string, private readonly httpGetClient: HttpClient<RemoteLoadSurveyResult.Model>) {}

  async load (): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.request({ url: this.url, method: 'get' })
    const remoteSurveyResult = httpResponse.body

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return Object.assign({}, remoteSurveyResult, { date: new Date(remoteSurveyResult.date) })
      case HttpStatusCode.forbiden: throw new AccessDeniedError()
      default : throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string
    date: string
    answers: Array<{
      isCurrentAccountAnswer: boolean
      image?: string
      answer: string
      count: number
      percent: number
    }>
  }
}
