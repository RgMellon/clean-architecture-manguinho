import React from 'react'

import Styles from './signup-styles.scss'

import {
  LoginHeader,
  FormStatus,
  Footer,
  Input
} from '@/presentation/components'

import Context from '@/presentation/contexts/form/form-context'

import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <Context.Provider value={{ state: {} }}>
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
          >
            Entrar
          </button>

          <Link to="/login" className={Styles.link}>
            Voltar para login
          </Link>

          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
