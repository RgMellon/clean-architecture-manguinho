import React, { useContext } from 'react'
import Spinner from '../spinner/spinner'
import Styles from './form-status-style.scss'

type Props = {
  state: any
}

const FormStatus: React.FC<Props> = ({ state }: Props) => {
  const { isLoading, mainError } = state

  return (
    <div data-testid="error-wrap" className={Styles.errorWrapper}>
      {isLoading && <Spinner />}
      {!!mainError && <span data-testid="main-error" className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
