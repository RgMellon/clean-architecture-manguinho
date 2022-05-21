
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'
import faker from 'faker'
import { LoadSurveyResult } from '../usecases'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => (
  {
    question: faker.random.words(10),
    date: faker.date.recent(),
    answers: [
      {
        answer: faker.random.words(4),
        image: faker.internet.url(),
        count: faker.random.number(),
        isCurrentAccountAnswer: true,
        percent: faker.random.number(100)
      },
      {
        answer: faker.random.words(4),
        image: '',
        count: faker.random.number(),
        isCurrentAccountAnswer: false,
        percent: faker.random.number(100)
      }
    ]

  })
