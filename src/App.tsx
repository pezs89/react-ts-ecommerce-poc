import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { History } from 'history';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import Header from './components/Header';
import SignInUp from './pages/SignInUpPage';
import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import { Unsubscribe } from 'firebase';
import { IUser } from './models/IUser';

interface MainProps {
  history: History;
}

interface AppState {
  currentUser: IUser | null;
}

class App extends Component<MainProps, AppState> {
  state = { currentUser: null };
  unsubscribeFromAuth: Unsubscribe | null = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDoc(user);
        if (userRef) {
          userRef.onSnapshot((snapShot) => {
            const userSnapshot = { id: snapShot.id, ...snapShot.data() } as IUser;
            this.setState({
              currentUser: { ...userSnapshot }
            })
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