import React from 'react'

import faker from 'faker'

import { Helper } from '@/presentation/test'
import { SignUp } from '..'

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react'

type SutTypes = {
  sut: RenderResult
};

const makeSut = (): SutTypes => {
  // const validationStub = new ValidationStub()

  const sut = render(
    // <Router history={history}>
    <SignUp

    />
    // </Router>
  )

  return {
    sut
  }
}

describe('SignUp Component', () => {
  // afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const validationError = 'Campo obrigatório'

    Helper.testChildCount(sut, 'error-wrap', 0)

    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)

    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
