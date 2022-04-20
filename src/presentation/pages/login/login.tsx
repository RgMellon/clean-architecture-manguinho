import React, { useState, useEffect } from 'react'

import Styles from './login-styles.scss'

import {
  LoginHeader,
  FormStatus,
  Footer,
  Input
} from '@/presentation/components'

import Context from '@/presentation/contexts/form/form-context'

import { Validation } from '@/presentation/protocols/validation'
import { Authentication, UpdateCurrentAccount } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import SubmitButton from '@/presentation/components/submit-button/submit-button'

type Props = {
  validation: Validation
  authentication: Authentication
  updateCurrentAccount: UpdateCurrentAccount
};

const Login: React.FC<Props> = ({ validation, authentication, updateCurrentAccount }: Props) => {
  const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,

    emailError: '',
    passwordError: '',
    mainError: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }

    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)

    setState({
      ...state,
      emailError,
      passwordError,

      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    try {
      if (state.isLoading || state.emailError || state.passwordError) return

      event.preventDefault()

      setState({
        ...state,
        isLoading: true
      })

      const account = await authentication.auth({ email: state.email, password: state.password })

      await updateCurrentAccount.save(account)

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
    <div className={Styles.login}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <SubmitButton text='Entrar' />

          <Link to="/signup" data-testid="signup" className={Styles.link}>
            Criar conta
          </Link>

          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
