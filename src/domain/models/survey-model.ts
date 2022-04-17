export type SurveyModel = {
  id: string
  question: string
  answers: SurveyModelAnswerModel[]
  date: Date
  didAnswer: boolean
}

export type SurveyModelAnswerModel = {
  image?: string
  answer: string
}
