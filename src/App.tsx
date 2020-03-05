import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import SignInUp from './pages/SignInUpPage';
import CheckoutPage from './pages/CheckoutPage';

import Header from './components/Header';
import { IUser } from './store/features/user/types';
import { ApplicationState } from './store';
import { selectCurrentUser } from './store/features/user/selectors';

interface MainProps {
  history: History;
}

interface AppSelection {
  currentUser: IUser | null;
}

const mapStateToProps = createStructuredSelector<ApplicationState, AppSelection>({
  currentUser: selectCurrentUser
})

type AppProps = MainProps & ReturnType<typeof mapStateToProps>;

const App: React.FC<AppProps> = ({ history, currentUser }): JSX.Element => {
  return (
    <div>
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInUp />)} />
        </Switch>
      </Router>
    </div>
  );
}

export default connect(mapStateToProps)(App);