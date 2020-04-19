import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

import Quote from './Quotes/Quote';
import Result from './Results/Result';
import NoMatch from './NoMatch';

import { fetchReducer } from 'reducer/app';
import { fetchInitialState, GlobalContext } from 'context';

function App() {
  const [state, dispatch] = useReducer(fetchReducer, fetchInitialState);
  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="container">
        <h3>Quick Quote</h3>
        <hr className="border-primary" />
        <Router>
          <Switch>
            <Route path="/" exact component={Quote} />
            <Route path="/result" exact component={Result} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
