import React, { useEffect, useState } from 'react'

import Styles from './signup-styles.scss'

import {
  LoginHeader,
  FormStatus,
  Footer,
  Input
} from '@/presentation/components'

import Context from '@/presentation/contexts/form/form-context'

import { Link } from 'react-router-dom'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
};

const SignUp: React.FC<Props> = ({ validation }) => {
  // const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    emailError: '',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    nameError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email)
    })
  }, [state.name, state.email])

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state, setState }}>
        <form
          className={Styles.form}

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
            disabled
          >
            Entrar
          </button>

          <span className={Styles.link}>
            Voltar para login
          </span>

          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
