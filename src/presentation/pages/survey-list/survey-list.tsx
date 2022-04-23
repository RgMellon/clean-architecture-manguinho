import React, { useEffect } from 'react'
import { Footer, Header, Icon } from '@/presentation/components'

import Styles from './survey-list.styles.scss'
import { SurveyItemEmpty } from './components'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    async function load () {
      await loadSurveyList.loadAll()
    }

    load()
  }, [])

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
