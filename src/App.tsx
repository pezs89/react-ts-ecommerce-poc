import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { History } from 'history';
import { Unsubscribe } from 'firebase';
import { connect } from 'react-redux';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import Header from './components/Header';
import SignInUp from './pages/SignInUpPage';
import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import { IUser } from './store/features/user/types';
import { setCurrentUser } from './store/features/user/actions';

interface MainProps {
  history: History;
}

const mapDispatchToProps = {
  setCurrentUser
}

type AppProps = MainProps & typeof mapDispatchToProps;

class App extends Component<AppProps> {
  unsubscribeFromAuth: Unsubscribe | null = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDoc(user);
        if (userRef) {
          userRef.onSnapshot((snapShot) => {
            const userSnapshot = { id: snapShot.id, ...snapShot.data() } as IUser;
            setCurrentUser(userSnapshot);
          });
        }
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/signin' component={SignInUp} />
          </Switch>
        </Router>
      </div>
    );
  }
};

export default connect(null, mapDispatchToProps)(App);