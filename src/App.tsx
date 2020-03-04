import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { History } from 'history';
import { Unsubscribe } from 'firebase';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import SignInUp from './pages/SignInUpPage';
import CheckoutPage from './pages/CheckoutPage';

import Header from './components/Header';
import { IUser } from './store/features/user/types';
import { setCurrentUser } from './store/features/user/actions';
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

const mapDispatchToProps = {
  setCurrentUser
}

type AppProps = MainProps & typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

class App extends Component<AppProps> {
  unsubscribeFromAuth: Unsubscribe | null = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
    //   if (user) {
    //     const userRef = await createUserProfileDoc(user);
    //     if (userRef) {
    //       userRef.onSnapshot((snapShot) => {
    //         const userSnapshot = { id: snapShot.id, ...snapShot.data() } as IUser;
    //         setCurrentUser(userSnapshot);
    //       });
    //     }
    //   } else {
    //     setCurrentUser(null)
    //   }
    // });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  }

  render() {
    const { history, currentUser } = this.props;
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);