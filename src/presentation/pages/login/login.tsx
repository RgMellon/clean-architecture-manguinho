import React, { useEffect, useContext } from 'react'
import { loginState, Input, SubmitButton, FormStatus } from './components'
import Styles from './login-styles.scss'

import {
  LoginHeader,
  Footer
} from '@/presentation/components'

import { FormContext, ApiContext } from '@/presentation/contexts'
import { useRecoilState } from 'recoil'

import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)

  const history = useHistory()

  const [state, setState] = useRecoilState(loginState)

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
      setCurrentAccount(account)

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

      <Footer />
    </div>
  )
}

export default Login
