import React from 'react'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import faker from 'faker'

import {
  fireEvent,
  render,
  waitFor,
  screen
} from '@testing-library/react'

import { Login } from '@/presentation/pages'

import { AuthenticationSpy, ValidationStub, Helper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
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

  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  )

  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidatedSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)

  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populatePasswordField = (

  password = faker.internet.password()
): void => {
  const passwordInput = screen.getByTestId('password')
  fireEvent.input(passwordInput, {
    target: {
      value: password
    }
  })
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)

    expect(screen.getByTestId('submit')).toBeDisabled()

    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    populatePasswordField()

    Helper.testStatusForField('password', validationError)
  })

  test('Should show valid password if validation success', () => {
    makeSut()

    populatePasswordField()

    Helper.testStatusForField('password')
  })

  test('Should show valid email if validation success', () => {
    makeSut()

    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show able button if the form fields are correctly', () => {
    makeSut()

    Helper.populateField('email')
    populatePasswordField()

    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidatedSubmit()

    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()

    const password = faker.internet.password()
    const email = faker.internet.email()

    await simulateValidatedSubmit(email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidatedSubmit()
    await simulateValidatedSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    await simulateValidatedSubmit()
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()

    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    await simulateValidatedSubmit()

    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidatedSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', () => {
    makeSut()
    const signup = screen.getByTestId('signup')

    fireEvent.click(signup)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
