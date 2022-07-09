import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import faker from 'faker'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(10),
      count: faker.random.number(),
      isCurrentAccountAnswer: faker.random.boolean(),
      percent: faker.random.number(100)
    },
    {
      image: faker.internet.url(),
      percent: faker.random.number(100),
      answer: faker.random.words(4),
      count: faker.random.number(),
      isCurrentAccountAnswer: faker.random.boolean()
    }
  ]
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult = mockSurveyResultModel()
  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++
    return Promise.resolve(this.surveyResult)
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResult.Params
  surveyResult = mockSurveyResultModel()

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.params = params
    return Promise.resolve(this.surveyResult)
  }
}
