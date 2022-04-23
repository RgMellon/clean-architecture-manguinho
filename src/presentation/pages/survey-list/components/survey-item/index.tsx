import React from 'react'
import Styles from './survey-item-styles.scss'
import { Icon } from '@/presentation/components'
import { IconName } from '@/presentation/components/icon/icon'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbUp}/>
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.mont}>03</span>
          <span className={Styles.year}>2020</span>
        </time>
        <p>Qual é o seu framework favorito?</p>
      </div>
      <footer> Ver resultado </footer>

    </li>
  )
}

export default SurveyItem
