import React from 'react'
import Spinner from '../spinner/spinner'

import Styles from './loading-styles.scss'

const Loading: React.FC = () => {
  return <div date-testid="loading" className={Styles.loadingWrap}>
    <div className={Styles.loading}>
      <span>
      Aguarde...
      </span>
      <Spinner />
    </div>
  </div>
}

export default Loading