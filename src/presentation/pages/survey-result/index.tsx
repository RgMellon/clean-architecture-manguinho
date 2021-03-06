import { Footer, Header } from '@/presentation/components'

import React, { useEffect, useState } from 'react'

import Styles from './survey-result-styles.scss'
import Loading from '@/presentation/components/loading'

import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import Error from '@/presentation/components/error'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultContext, SurveyResultData } from './components'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }))
  })

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => {
    setState(old => ({
      surveyResult: null,
      isLoading: false,
      error: '',
      reload: !old.reload
    }))
  }

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }

    if (!state.isLoading) {
      setState(old => ({ ...old, isLoading: true }))
      saveSurveyResult.save({ answer })
        .then(surveyResult => setState(old => ({ ...old, isLoading: false, surveyResult })))
        .catch(handleError)
    }
  }

  return (
    <>
      <div className={Styles.surveyResultWrapper}>
        <Header />
        <SurveyResultContext.Provider value={{ onAnswer }}>
          <div data-testid="survey-result" className={Styles.contentWrap}>
            {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} /> }
            {state.isLoading && <Loading />}
            {state.error && <Error error={state.error} reload={reload} />}
          </div>
        </SurveyResultContext.Provider>
        <Footer />
      </div>
    </>
  )
}
