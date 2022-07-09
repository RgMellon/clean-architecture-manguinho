import React from 'react'

import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import faker from 'faker'

import { ApiContext } from '@/presentation/contexts'
import { Helper, ValidationStub } from '@/presentation/test'
import { SignUp } from '..'

import {
  fireEvent,
  render,
  waitFor,
  screen
} from '@testing-library/react'
import { AddAccountSpy } from '@/presentation/test/mock-add-account'
import { EmailInUsError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { RecoilRoot } from 'recoil'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
};

type SutParams = {
  validationError?: string
};

const history = createMemoryHistory({
  initialEntries: ['/signup']
})

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const setCurrentAccountMock = jest.fn()
  const addAccountSpy = new AddAccountSpy()

  render(
    <RecoilRoot>
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <SignUp
            validation={validationStub}
            addAccount={addAccountSpy}
          />
        </Router>
      </ApiContext.Provider>
    </RecoilRoot>
  )

  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidatedSubmit = async (name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('name', name)
  Helper.populateField('passwordConfirmation', password)

  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)

    expect(screen.getByTestId('submit')).toBeDisabled()

    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)

    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
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

    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name if validation success', () => {
    makeSut()

    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  test('Should show valid email if validation success', () => {
    makeSut()

    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid password if validation success', () => {
    makeSut()

    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should show valid passwordConfirmation if validation success', () => {
    makeSut()

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should show enable button if the form fields are correctly', () => {
    makeSut()

    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')

    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidatedSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()

    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidatedSubmit(name, email, password)

    expect(addAccountSpy.params).toEqual({
      email,
      name,
      passwordConfirmation: password,
      password
    })
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()

    await simulateValidatedSubmit()
    await simulateValidatedSubmit()

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    await simulateValidatedSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()

    const error = new EmailInUsError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await simulateValidatedSubmit()

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    await simulateValidatedSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { addAccountSpy } = makeSut()

    const error = new EmailInUsError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await simulateValidatedSubmit()
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should go to login page', () => {
    makeSut()
    const loginLink = screen.getByTestId('login')

    fireEvent.click(loginLink)

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
