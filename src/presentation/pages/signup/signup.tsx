import React, { useEffect, useState } from 'react'

import Styles from './signup-styles.scss'

import {
  LoginHeader,
  FormStatus,
  Footer,
  Input
} from '@/presentation/components'

import Context from '@/presentation/contexts/form/form-context'

import { Link, useHistory } from 'react-router-dom'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
};

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }) => {
  const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',

    email: '',
    emailError: '',

    password: '',
    passwordError: '',

    passwordConfirmation: '',
    passwordConfirmationError: '',

    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmationError', state.passwordConfirmationError)
    })
  }, [state.name, state.email])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    try {
      if (state.isLoading || state.emailError || state.passwordError) return

      event.preventDefault()

      setState({
        ...state,
        isLoading: true
      })

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        mainError: err.message
      })
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          data-testid="form"
          onSubmit={handleSubmit}
        >
          <h2>Criar conta</h2>

          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua  senha"
          />
          <Input
            type="password"
            name="password"
            placeholder="Digita sua senha"
          />

          <button
            data-testid="submit"
            className={Styles.submit}
            type="submit"
            disabled={!!state.emailError || !!state.passwordError || !state.passwordConfirmation || !state.name}
          >
            Entrar
          </button>

          <Link to="/login" replace data-testid="login" className={Styles.link}>
          Voltar para login
          </Link>

          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
