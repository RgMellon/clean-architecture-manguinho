import React from 'react'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'

import { Login } from '@/presentation/pages'

import { makeSignUpValidator } from './signup-validation-factory'
import { makeLocalSaveAccestoken } from '../../usecases/save-access-token/local-save-access-token-factory'

export const makeSignUp: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeSignUpValidator()}
      saveAccessToken={makeLocalSaveAccestoken()}
    />
  )
}
