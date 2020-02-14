import React from 'react';
import { Router } from 'react-router-dom';
import { History } from 'history';
import HomePage from './pages/HomePage';

interface MainProps {
  history: History;
}

const App: React.FC<MainProps> = ({ history }): JSX.Element => {
  return (
    <div>
      <Router history={history}>
        <HomePage></HomePage>
      </Router>
    </div>
  );
};

export default App;