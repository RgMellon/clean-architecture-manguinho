import { ApiContext } from '@/presentation/contexts'
import SurveyList from '@/presentation/pages/survey-list/survey-list'
import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { setCurrentAccountAdapter } from '../adapters/current-account-adapters'

import { makeLogin } from '../factories/pages/login/login-factory'
import { makeSignUp } from '../factories/pages/signup/signup-factory'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <Route path="/" exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
