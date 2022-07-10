import React, { useEffect } from 'react'
import { Footer, Header } from '@/presentation/components'

import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

import List from './components/list/list'
import Error from '../../components/error'
import { useErrorHandler } from '@/presentation/hooks'
import { useRecoilState } from 'recoil'
import { surveyListState } from '@/presentation/pages/survey-list/components'

import Styles from './survey-list.styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message })
  })

  const [state, setState] = useRecoilState(surveyListState)

  useEffect(() => {
    async function load () {
      try {
        const surveysList = await loadSurveyList.loadAll()
        setState(oldState => ({ ...oldState, surveys: surveysList }))
      } catch (error) {
        handleError(error)
      }
    }

    load()
  }, [state.reload])

  const reload = (): void => {
    setState(old => ({
      surveys: [],
      error: '',
      reload: !old.reload
    }))
  }

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>

        {state.error
          ? <Error error={state.error} reload={reload} />
          : <List surveys={state.surveys} />
        }

      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
