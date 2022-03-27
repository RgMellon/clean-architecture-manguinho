import React, { useState } from 'react'

import Styles from './signup-styles.scss'

import {
  LoginHeader,
  FormStatus,
  Footer,
  Input
} from '@/presentation/components'

import Context from '@/presentation/contexts/form/form-context'

import { Link } from 'react-router-dom'

const SignUp: React.FC = () => {
  // const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    nameError: 'Campo obrigatório',
    mainError: ''
  })

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state }}>
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
