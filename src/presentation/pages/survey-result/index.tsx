import { Footer, Header } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import React, { useEffect, useState } from 'react'

import Styles from './survey-result-styles.scss'
import Loading from '@/presentation/components/loading'
import Calendar from '@/presentation/components/calendar'

import { LoadSurveyResult } from '@/domain/usecases'
import Error from '@/presentation/components/error'
import { useErrorHandler } from '@/presentation/hooks'

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
          {state.surveyResult && <>
            <hgroup>
              <Calendar date={state.surveyResult.date} className={Styles.calendarWrap} />
              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={Styles.answersList}>
              {state.surveyResult.answers.map(answer => <li key={answer.answer} data-testid="answer-wrap" className={answer.isCurrentAccountAnswer ? Styles.active : ''}>
                {!!answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
                <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
                <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
              </li>
              )}
            </FlipMove>

            <button> Voltar </button>
          </>
          }

          {state.isLoading && <Loading /> }
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
        <Footer />
      </div>
    </>
  )
}
