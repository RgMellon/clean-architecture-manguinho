import { RemoteLoadSurveyListModel } from '@/data/usecases/load-survey-list/remote-survey-list'
import faker from 'faker'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyListModel => (
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
    date: faker.date.recent().toISOString()
  })

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyListModel[] => (
  [
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel()
  ])
