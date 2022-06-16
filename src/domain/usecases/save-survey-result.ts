import { SurveyResultModel } from '@/domain/models/survey-result-model'

export interface SaveSurveyResult {
  save: (params: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Model>
}

export namespace SaveSurveyResult {

  export type Params = {
    answer: string
  }

  export type Model = SurveyResultModel
}
