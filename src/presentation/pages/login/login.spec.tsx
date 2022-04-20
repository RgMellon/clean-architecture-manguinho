import React from 'react'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import faker from 'faker'

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react'

import { Login } from '@/presentation/pages'

import { AuthenticationSpy, ValidationStub, UpdateCurrentAccountMock, Helper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
};

type SutParams = {
  validationError?: string
};

const history = createMemoryHistory({
  initialEntries: ['/login']
})

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  const updateCurrentAccountMock = new UpdateCurrentAccountMock()

  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  )

  return {
    sut,
    authenticationSpy,
    updateCurrentAccountMock
  }
}

const simulateValidatedSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, {
    target: {
      value: email
    }
  })
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, {
    target: {
      value: password
    }
  })
}

const testIfElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)

    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populateEmailField(sut)
    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)

    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid password if validation success', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)

    Helper.testStatusForField(sut, 'password')
  })

  test('Should show valid email if validation success', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    Helper.testStatusForField(sut, 'email')
  })

  test('Should show able button if the form fields are correctly', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidatedSubmit(sut)

    testIfElementExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()

    const password = faker.internet.password()
    const email = faker.internet.email()

    await simulateValidatedSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()

    await simulateValidatedSubmit(sut)
    await simulateValidatedSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidatedSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()

    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    await simulateValidatedSubmit(sut)
    Helper.testChildCount(sut, 'error-wrap', 1)

    testElementText(sut, 'main-error', error.message)
  })

  test('Should call SaveAccessToken  on success', async () => {
    const { sut, authenticationSpy, updateCurrentAccountMock } = makeSut()
    await simulateValidatedSubmit(sut)

    expect(updateCurrentAccountMock.account).toEqual(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, updateCurrentAccountMock } = makeSut()

    const error = new InvalidCredentialsError()
    jest.spyOn(updateCurrentAccountMock, 'save').mockReturnValueOnce(Promise.reject(error))

    await simulateValidatedSubmit(sut)
    Helper.testChildCount(sut, 'error-wrap', 1)

    testElementText(sut, 'main-error', error.message)
  })

  test('Should go to signup page', () => {
    const { sut } = makeSut()
    const signup = sut.getByTestId('signup')

    fireEvent.click(signup)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
