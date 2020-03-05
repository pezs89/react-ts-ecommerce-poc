import React, { Component, FormEvent } from 'react';

import SimpleInput from './SimpleInput';
import Button from './Button';
import { googleSignInAsync, emailSignInAsync } from '../store/features/user/actions'
import { connect } from 'react-redux';


const mapDispatchToProps = {
  googleSignInRequest: googleSignInAsync.request,
  emailSignInRequest: emailSignInAsync.request
}

type SignInProps = typeof mapDispatchToProps;

type SignInState = {
  [key: string]: string;
}

class SignIn extends Component<SignInProps, SignInState> {
  state = { email: '', password: '' }

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { emailSignInRequest } = this.props;
    const { email, password } = this.state;
    emailSignInRequest({ email, password });
  }

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { googleSignInRequest } = this.props
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
            <Button type={'button'} label={'Sign in with Google'} callback={googleSignInRequest} extraClass={'google-sign-in'} />
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(SignIn);