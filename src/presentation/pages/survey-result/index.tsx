import { Footer, Header } from '@/presentation/components'

import React, { useEffect } from 'react'

import Styles from './survey-result-styles.scss'
import Loading from '@/presentation/components/loading'

import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import Error from '@/presentation/components/error'
import { useErrorHandler } from '@/presentation/hooks'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { surveyResultState, SurveyResultData, onSurveyAnswerState } from '@/presentation/pages/survey-result/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }))
  })

  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

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
          {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} /> }
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>

        <Footer />
      </div>
    </>
  )
}
