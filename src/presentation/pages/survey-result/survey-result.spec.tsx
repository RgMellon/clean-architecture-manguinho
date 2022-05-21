import { mockAccountModel } from '@/domain/tests'
import { LoadSurveyResultSpy } from '@/domain/tests/mock-survey-result'
import { ApiContext } from '@/presentation/contexts'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { SurveyResult } from '.'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}
const makeSut = (): SutTypes => {
  const loadSurveyResult = new LoadSurveyResultSpy()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
      <SurveyResult loadSurveyResult={loadSurveyResult} />
    </ApiContext.Provider>
  )

  return {
    loadSurveyResultSpy: loadSurveyResult
  }
}

describe('Survey Result Component', () => {
  test('Should present correct initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('load')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  test('Should present correct initial state', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })
})
