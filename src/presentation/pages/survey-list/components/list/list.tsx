import { SurveyModel } from '@/domain/models'
import React, { useContext } from 'react'

import SurveyItem from '../item'
import SurveyItemEmpty from '../item-empty'

import Styles from './list-styles.scss'

type Props = {
  surveys: SurveyModel[]
}

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {surveys.length > 0 ? surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />) : <SurveyItemEmpty /> }
    </ul>
  )
}

export default List
