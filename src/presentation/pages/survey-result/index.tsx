import { Footer, Header } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import React, { useEffect, useState } from 'react'

import Styles from './survey-result-styles.scss'
import Loading from '@/presentation/components/loading'
import Calendar from '@/presentation/components/calendar'

import { LoadSurveyResult } from '@/domain/usecases'
import Error from '@/presentation/components/error'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
  }, [])

  const reload = () => {
    alert('é top')
  }

  return (
    <div className={Styles.surveyResultWrapper}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && <>
          <hgroup>
            <Calendar date={new Date()} className={Styles.calendarWrap} />
            <h2>Qual é seu nome?</h2>
          </hgroup>
          <FlipMove className={Styles.answersList}>
            <li>
              <img src="https://www.tshirtgeek.com.br/wp-content/uploads/2021/03/com015.jpg" alt="" />
              <span className={Styles.answer}>React Js</span>
              <span className={Styles.percent}>50%</span>
            </li>
          </FlipMove>

          <button> Voltar </button>
        </>
        }

        {state.isLoading && <Loading /> }
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}
