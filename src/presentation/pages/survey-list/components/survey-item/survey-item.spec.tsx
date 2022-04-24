import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { mockSurveyModel } from '@/domain/tests'
import { IconName } from '@/presentation/components/icon/icon'

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true
    survey.date = new Date('2022-04-24T00:00:00')
    render(<SurveyItem survey={survey} />)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('24')
    expect(screen.getByTestId('month')).toHaveTextContent('abr')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })
})
