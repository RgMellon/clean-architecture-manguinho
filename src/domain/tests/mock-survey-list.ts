
import { SurveyModel } from '../models'
import faker from 'faker'

export const mockSurveyModel = (): SurveyModel => (
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.words(4)
      },
      {
        image: faker.internet.url(),
        answer: faker.random.words(4)
      }
    ],
    didAnswer: faker.random.boolean(),
    date: faker.date.recent()
  })

export const mockSurveyListModel = (): SurveyModel[] => (
  [
    mockSurveyModel(),
    mockSurveyModel(),
    mockSurveyModel()
  ])
