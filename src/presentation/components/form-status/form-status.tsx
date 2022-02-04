import React from "react";

import Spinner from "../spinner/spinner";

import Styles from "./form-status-style.scss";
// import { Container } from './styles';

const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrapper}>
      <Spinner />
      <span className={Styles.error}>Erro</span>
    </div>
  );
};

export default FormStatus;
