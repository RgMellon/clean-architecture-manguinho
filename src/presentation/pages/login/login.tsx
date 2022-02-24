import React, { useState, useEffect } from "react";

import Styles from "./login-styles.scss";

import {
  LoginHeader,
  FormStatus,
  Footer,
  Input,
} from "@/presentation/components";

import Context from "@/presentation/contexts/form/form-context";

import { Validation } from "@/presentation/protocols/validation";
import { Authentication } from "@/domain/usecases";
import { Link, useHistory } from "react-router-dom";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory();

  const [state, setState] = useState({
    isLoading: false,
    emailError: "",
    passwordError: "",
    mainError: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate("email", state.email),
      passwordError: validation.validate("password", state.password),
    });
  }, [state.email, state.password]);


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    try {
      if (state.isLoading || state.emailError || state.passwordError) return;

      event.preventDefault();

      setState({
        ...state,
        isLoading: true,
      });

      const account = await authentication.auth({ email: state.email, password: state.password })
      
      localStorage.setItem("accessToken", account.access_token);

      history.replace('/')
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
        mainError: err.message,
      });
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

          <button
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>

          <Link to="/signup" data-testid="signup" className={Styles.link}>
            Criar conta
          </Link>

          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
