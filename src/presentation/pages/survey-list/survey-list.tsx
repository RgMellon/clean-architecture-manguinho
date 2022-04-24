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
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    async function load () {
      try {
        const surveysList = await loadSurveyList.loadAll()
        setState({ ...state, surveys: surveysList })
      } catch (error) {
        setState({ ...state, error: error.message })
      }
    }

    load()
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error
          ? <div>
            <span data-testid="error">{state.error}</span>
            <button>Recarregar</button>
          </div>
          : <ul data-testid="survey-list">
            {state.surveys.length > 0 ? state.surveys.map(survey => <SurveyItem key={survey.id} survey={survey} />) : <SurveyItemEmpty /> }
          </ul>
        }
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
