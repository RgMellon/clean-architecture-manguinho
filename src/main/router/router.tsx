import React from 'react'
import PrivateRoute from '@/presentation/components/private-route/private-route'
import { ApiContext } from '@/presentation/contexts'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapters'

import { makeLogin } from '../factories/pages/login/login-factory'
import { makeSignUp } from '../factories/pages/signup/signup-factory'
import { makeSurveyList } from '../factories/pages/survey-list/survey-list-factory'
import { SurveyResult } from '@/presentation/pages'
import { makeSurveyResult } from '../factories/pages/survey-result'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter, getCurrentAccount: getCurrentAccountAdapter }}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
