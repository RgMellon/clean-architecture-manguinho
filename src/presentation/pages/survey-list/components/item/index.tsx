import React from 'react'
import Styles from './survey-item-styles.scss'
import { Icon } from '@/presentation/components'
import { IconName } from '@/presentation/components/icon/icon'
import { SurveyModel } from '@/domain/models'
import Calendar from '@/presentation/components/calendar'

type Props ={
  survey: SurveyModel
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={iconName}/>
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer> Ver resultado </footer>

    </li>
  )
}

export default SurveyItem
