import { makeApiUrl } from '@/main/factories/http/api-url.factory'

import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-survey-list'
import { makeAuthorizeHttpGetClientDecorator } from '../../decorators/authorize-http-get-client-decorator-factory'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpGetClientDecorator())
}
