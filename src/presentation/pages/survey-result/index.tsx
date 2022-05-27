import { Footer, Header } from '@/presentation/components'

import React, { useEffect, useState } from 'react'

import Styles from './survey-result-styles.scss'
import Loading from '@/presentation/components/loading'

import { LoadSurveyResult } from '@/domain/usecases'
import Error from '@/presentation/components/error'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from './components'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, surveyResult: null, error: error.message })
  })

  useEffect(() => {
    loadSurveyResult.load().then(surveyResult => {
      setState(old => ({
        ...old,
        surveyResult: surveyResult
      }))
    }).catch(handleError)
  }, [state.reload])

  const reload = (): void => {
    setState(old => ({
      surveyResult: null,
      isLoading: false,
      error: '',
      reload: !old.reload
    }))
  }

  return (
    <>
      <div className={Styles.surveyResultWrapper}>
        <Header />
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult &&
            <SurveyResultData surveyResult={state.surveyResult}/>
          }
          {state.isLoading && <Loading /> }
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
        <Footer />
      </div>
    </>
  )
}
