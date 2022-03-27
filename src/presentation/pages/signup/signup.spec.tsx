import React from 'react'

import faker from 'faker'
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

const testChildCount = (sut: RenderResult, field: string, count: number): void => {
  const el = sut.getByTestId(field)
  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  disable: boolean
) => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(disable)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)

  if (validationError) {
    expect(fieldStatus.title).toBe(validationError)
    expect(fieldStatus.textContent).toBe('🔴')
    return
  }

  expect(fieldStatus.textContent).toBe('🟢')
  expect(fieldStatus.title).toBe('Tudo certo!')
}

describe('SignUp Component', () => {
  // afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const validationError = 'Campo obrigatório'

    testChildCount(sut, 'error-wrap', 0)

    testButtonIsDisabled(sut, 'submit', true)

    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)

    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
