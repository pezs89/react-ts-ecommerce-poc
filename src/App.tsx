import React, { useEffect, Suspense, lazy } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/Header';
import Spinner from './components/Spinner';
import { IUser } from './store/features/user/types';
import { ApplicationState } from './store';
import { selectCurrentUser } from './store/features/user/selectors';
import { checkUserSession } from './store/features/user/actions';

interface MainProps {
  history: History;
}

interface AppSelection {
  currentUser: IUser | null;
}

const mapStateToProps = createStructuredSelector<ApplicationState, AppSelection>({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = {
  checkUserSession
}

type AppProps = MainProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const HomePage = lazy(() => import('./pages/HomePage'));
const SignInUpPage = lazy(() => import('./pages/SignInUpPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));

const App: React.FC<AppProps> = ({ history, currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div>
      <Router history={history}>
        <Header />
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInUpPage />)} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(App);