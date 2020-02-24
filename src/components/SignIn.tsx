import React, { Component, FormEvent } from 'react';
import SimpleInput from './SimpleInput';
import Button from './Button';
import { signInWithGoogle, auth } from '../firebase/firebase.utils';

interface SignInState {
  [key: string]: string;
}

class SignIn extends Component<{}, SignInState> {
  state = { email: '', password: '' }

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ password: '', username: '' });
    } catch (error) {
      console.log(error.message)
    }
  }

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <SimpleInput name={'email'} value={email} type={'email'} label={'Email'} onChange={this.handleOnChange} required />
          <SimpleInput name={'password'} value={password} type={'password'} label={'Password'} onChange={this.handleOnChange} required />
          <div className='buttons'>
            <Button type={'submit'} label={'Submit'} />
            <Button type={'button'} label={'Sign in with Google'} callback={signInWithGoogle} extraClass={'google-sign-in'} />
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;