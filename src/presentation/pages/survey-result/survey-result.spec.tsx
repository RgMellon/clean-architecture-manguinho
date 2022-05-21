import { mockAccountModel, mockSurveyResultModel } from '@/domain/tests'
import { LoadSurveyResultSpy } from '@/domain/tests/mock-survey-result'
import { ApiContext } from '@/presentation/contexts'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { SurveyResult } from '.'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}
const makeSut = (surveyResult = mockSurveyResultModel()): SutTypes => {
  const loadSurveyResult = new LoadSurveyResultSpy()
  loadSurveyResult.surveyResult = surveyResult

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

  test('Should present SurveyResult data on success', async () => {
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00')
    })

    makeSut(surveyResult)

    await waitFor(() => screen.getByTestId('survey-result'))
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(2)

    const answerWrap = screen.queryAllByTestId('answer-wrap')
    expect(answerWrap[0]).toHaveClass('active')
    expect(answerWrap[1]).not.toHaveClass('active')

    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()

    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)

    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  })
})
