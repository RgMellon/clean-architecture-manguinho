import React from 'react'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'

import { SignUp } from '@/presentation/pages'

import { makeSignUpValidator } from './signup-validation-factory'

import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidator()}
    />
  )
}
