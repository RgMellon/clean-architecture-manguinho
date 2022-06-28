import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult } from '../../usecases/load-survey-result/remote-load-survey-result-factory'
import { useParams } from 'react-router-dom'
import { makeRemoteSaveSurveyResult } from '../../usecases/save-survey-result/remote-save-survey-result-factory'

type ParamTypes = {
  id: string
}

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<ParamTypes>()

  return (
    <SurveyResult
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
    />
  )
}
