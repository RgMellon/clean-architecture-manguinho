import React, { useContext } from "react";
import Spinner from "../spinner/spinner";

import Context from "@/presentation/contexts/form/form-context";

import Styles from "./form-status-style.scss";

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context);

  return (
    <div data-testid="error-wrap" className={Styles.errorWrapper}>
      {isLoading && <Spinner />}
      {!!errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default FormStatus;
