import React, { Component, FormEvent } from 'react';

import SimpleInput from './SimpleInput';
import Button from './Button';

import { auth, createUserProfileDoc } from '../firebase/firebase.utils';

interface SignUpState {
  [key: string]: string;
}

class SignUp extends Component<{}, SignUpState> {
  state = { displayName: '', email: '', password: '', confirmPassword: '' };

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        if (user) {
          await createUserProfileDoc(user, { displayName });
          this.setState({ displayName: '', email: '', passxword: '', confirmPassword: '' });
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <SimpleInput name='displayName' label='Name' type={'text'} value={displayName} onChange={this.handleChange} />
          <SimpleInput name='email' label='Email' type={'email'} value={email} onChange={this.handleChange} />
          <SimpleInput name='password' label='Password' type={'password'} value={password} onChange={this.handleChange} />
          <SimpleInput name='confirmPassword' label='Confirm Password' type={'password'} value={confirmPassword} onChange={this.handleChange} />
          <Button label='SIGN UP' type='submit' />
        </form>
      </div>
    )
  }
}

export default SignUp;