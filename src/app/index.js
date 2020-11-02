/* 
  Yevgeniy Skroznikov 
  11/02/20
*/
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pokedex from '../features/Pokedex';
import Pokemon from '../features/Pokedex/Pokemon';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/pokemon/:id">
          <Pokemon />
        </Route>
        <Route path="/">
          <Pokedex />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
