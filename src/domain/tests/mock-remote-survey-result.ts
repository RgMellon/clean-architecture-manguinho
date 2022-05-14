
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'
import faker from 'faker'

export const mockSurveyResultModel = (): RemoteLoadSurveyResult.Model => (
  {
    question: faker.random.words(10),
    answers: [
      {
        answer: faker.random.words(4),
        image: faker.internet.url(),
        count: faker.random.number(),
        isCurrentAccountAnswer: faker.random.boolean(),
        percent: faker.random.number(100)
      },
      {
        answer: faker.random.words(4),
        image: faker.internet.url(),
        count: faker.random.number(),
        isCurrentAccountAnswer: faker.random.boolean(),
        percent: faker.random.number(100)
      }
    ],
    date: faker.date.recent().toISOString()
  })
