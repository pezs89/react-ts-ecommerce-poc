import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { History } from 'history';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';

interface MainProps {
  history: History;
}

const App: React.FC<MainProps> = ({ history }): JSX.Element => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;