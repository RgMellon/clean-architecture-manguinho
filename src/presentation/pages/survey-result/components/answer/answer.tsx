import React, { useContext } from 'react'
import { SurveyResultContext } from '..'

import Styles from './answer-styles.scss'

type Props = {
  answer: {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
  }
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useContext(SurveyResultContext)

  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''

  function answerClick (event: React.MouseEvent): void {
    if (event.currentTarget.classList.contains(Styles.active)) {
      return
    }

    onAnswer(answer.answer)
  }

  return <li onClick={answerClick} data-testid="answer-wrap" className={[activeClassName, Styles.answerWrapper].join(' ')}>
    {!!answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
    <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
    <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
  </li>
}

export default Answer
