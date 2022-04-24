import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/tests'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyList } from '@/presentation/pages'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0 ;
  surveyList = mockSurveyListModel();

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return await Promise.resolve(this.surveyList)
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return {
    loadSurveyListSpy
  }
}

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should remder SurveyItems on Success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyItemWrap').length).toBe(3)
  })

  test('Should render error on Failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))

    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })
})
