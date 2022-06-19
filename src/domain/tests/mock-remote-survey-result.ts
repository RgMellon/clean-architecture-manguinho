
import faker from 'faker'
import { LoadSurveyResult } from '../usecases'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [{
    image: faker.internet.url(),
    answer: faker.random.words(10),
    count: faker.random.number(),
    percent: faker.random.number(100),
    isCurrentAccountAnswer: true
  }, {
    answer: faker.random.words(2),
    count: faker.random.number(),
    percent: faker.random.number(100),
    isCurrentAccountAnswer: false
  }]
})
