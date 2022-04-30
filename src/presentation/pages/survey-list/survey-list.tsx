import React, { useEffect, useState } from 'react'
import { Footer, Header, Icon } from '@/presentation/components'

import Styles from './survey-list.styles.scss'
import { SurveyContext } from './components'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyModel } from '@/domain/models'
import List from './components/list/list'
import Error from './components/error'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
    reload: false
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
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error
            ? <Error />
            : <List />
          }
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
