import { makeApiUrl } from '@/main/factories/http/api-url.factory'

import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'
import { makeAuthorizeHttpGetClientDecorator } from '../../decorators/authorize-http-get-client-decorator-factory'
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpGetClientDecorator())
}
