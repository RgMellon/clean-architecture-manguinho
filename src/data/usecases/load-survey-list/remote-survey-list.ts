import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SurveyModel, SurveyModelAnswerModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

export type RemoteLoadSurveyListModel = {
  id: string
  question: string
  answers: SurveyModelAnswerModel[]
  date: string
  didAnswer: boolean
}

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (private readonly url: string, private readonly httpGetClientSpy: HttpGetClient<RemoteLoadSurveyListModel[]>) {}

  async loadAll (): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClientSpy.get({ url: this.url })
    const remoteSurveys = httpResponse.body || []

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteSurveys.map(remoteSurvey => Object.assign(remoteSurvey, { date: new Date(remoteSurvey.date) }))
      case HttpStatusCode.forbiden: throw new AccessDeniedError()
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}
