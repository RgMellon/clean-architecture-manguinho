import { SaveAccessToken } from '@/domain/usecases'
import { LocalSavesAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { makeLocalStorageAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalSaveAccestoken = (): SaveAccessToken => {
  return new LocalSavesAccessToken(makeLocalStorageAdapter())
}
