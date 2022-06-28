import { RemoteSaveSurveyResult } from '@/data/usecases/save-survey-result/remote-save-survey-result'
import { SaveSurveyResult } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url.factory'

import { makeAuthorizeHttpGetClientDecorator } from '../../decorators/authorize-http-client-decorator-factory'

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpGetClientDecorator())
}
