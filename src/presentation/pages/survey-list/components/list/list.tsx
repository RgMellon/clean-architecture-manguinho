import { SurveyModel } from '@/domain/models'
import React, { useContext } from 'react'
import { SurveyContext } from '..'
import SurveyItem from '../item'
import SurveyItemEmpty from '../item-empty'

import Styles from './list-styles.scss'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {state.surveys.length > 0 ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />) : <SurveyItemEmpty /> }
    </ul>
  )
}

export default List
