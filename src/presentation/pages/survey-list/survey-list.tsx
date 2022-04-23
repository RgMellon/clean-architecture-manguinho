import React from 'react'
import { Footer, Header, Icon } from '@/presentation/components'

import Styles from './survey-list.styles.scss'
import { SurveyItemEmpty } from './components'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <ul data-testid="survey-list">
        <SurveyItemEmpty />
      </ul>
      <Footer />
    </div>
  )
}

export default SurveyList
