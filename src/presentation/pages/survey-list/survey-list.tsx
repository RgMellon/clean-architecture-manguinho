import React, { useEffect, useState } from 'react'
import { Footer, Header, Icon } from '@/presentation/components'

import Styles from './survey-list.styles.scss'
import { SurveyItem, SurveyItemEmpty } from './components'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyModel } from '@/domain/models'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[]
  })

  useEffect(() => {
    async function load () {
      const surveysList = await loadSurveyList.loadAll()
      setState({ surveys: surveysList })
    }

    load()
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <h2>oi</h2>
      <Header />
      <ul data-testid="survey-list">
        {state.surveys.length > 0 ? state.surveys.map(survey => <SurveyItem key={survey.id} survey={survey} />) : <SurveyItemEmpty /> }
      </ul>
      <Footer />
    </div>
  )
}

export default SurveyList
