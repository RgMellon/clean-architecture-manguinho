import React, { useContext, useEffect } from 'react'

import Styles from './signup-styles.scss'
import { Input, signupState, SubmitButton, FormStatus } from './components'
import { useRecoilState } from 'recoil'

import {
  LoginHeader,
  Footer
} from '@/presentation/components'

import { Link, useHistory } from 'react-router-dom'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'

import { ApiContext } from '@/presentation/contexts'

type Props = {
  validation: Validation
  addAccount: AddAccount

};

const SignUp: React.FC<Props> = ({ validation, addAccount }) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const [state, setState] = useRecoilState(signupState)

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    try {
      if (state.isLoading || state.isFormInvalid) return

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
    <div className={Styles.signup}>
      <LoginHeader />

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
          name="password"
          placeholder="Digite sua senha"
        />

        <Input
          type="password"
          name="passwordConfirmation"
          placeholder="Repita sua  senha"
        />

        <SubmitButton text='Entrar' />

        <Link to="/login" replace data-testid="login" className={Styles.link}>
          Voltar para login
        </Link>

        <FormStatus />
      </form>

      <Footer />
    </div>
  )
}

export default SignUp
