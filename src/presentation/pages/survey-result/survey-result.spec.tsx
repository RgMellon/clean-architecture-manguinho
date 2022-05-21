import { mockAccountModel } from '@/domain/tests'
import { ApiContext } from '@/presentation/contexts'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { SurveyResult } from '.'

const makeSut = (): void => {
  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
      <SurveyResult />
    </ApiContext.Provider>
  )
}

describe('Survey Result Component', () => {
  test('Should present correct initial state', () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('load')).not.toBeInTheDocument()
  })
})
