import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { History } from 'history';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import Header from './components/Header';
import SignInUp from './pages/SignInUpPage';
import { auth } from './firebase/firebase.utils';
import { Unsubscribe } from 'firebase';

interface MainProps {
  history: History;
}

interface AppState {
  currentUser: firebase.User | null;
}

class App extends Component<MainProps, AppState> {
  state = { currentUser: null };
  unsubscribeFromAuth: Unsubscribe | null = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      console.log(user);
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  }

  render() {
    const { history } = this.props;
    const { currentUser } = this.state;
    return (
      <div>
        <Router history={history}>
          <Header currentUser={currentUser} />
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

export default App;