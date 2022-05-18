import { Footer, Header } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import React from 'react'

import Styles from './survey-result-styles.scss'
import Loading from '@/presentation/components/loading'
import Calendar from '@/presentation/components/calendar'

export const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrapper}>
      <Header />
      <div className={Styles.contentWrap}>
        {false && <>
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

        {/* <Loading /> */}
      </div>
      <Footer />
    </div>
  )
}
