import React, { useContext } from "react";
import Spinner from "../spinner/spinner";

import Context from "@/presentation/contexts/form/form-context";

import Styles from "./form-status-style.scss";

const FormStatus: React.FC = () => {
  const { state } = useContext(Context);
  const { isLoading, mainError } = state;

  return (
    <div data-testid="error-wrap" className={Styles.errorWrapper}>
      {isLoading && <Spinner />}
      {!!mainError && <span data-testid="main-error" className={Styles.error}>{mainError}</span>}
    </div>
  );
};

export default FormStatus;
