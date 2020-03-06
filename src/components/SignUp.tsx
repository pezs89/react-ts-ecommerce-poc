import React, { FormEvent, useState } from 'react';

import SimpleInput from './SimpleInput';
import Button from './Button';
import { signUpAsync } from '../store/features/user/actions';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  signUpAsyncRequest: signUpAsync.request
}

type SignUpProps = typeof mapDispatchToProps;

type SignUpState = {
  [key: string]: string;
}

const SignUp: React.FC<SignUpProps> = ({ signUpAsyncRequest }) => {
  const [signUpState, setSignUpState] = useState<SignUpState>({ displayName: '', email: '', password: '', confirmPassword: '' })

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = signUpState;
    if (password === confirmPassword) {
      signUpAsyncRequest({ email, password, displayName })
    } 
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setSignUpState({ ...signUpState, [name]: value });
  }

  const { displayName, email, password, confirmPassword } = signUpState;
  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <SimpleInput name='displayName' label='Name' type={'text'} value={displayName} onChange={handleChange} />
        <SimpleInput name='email' label='Email' type={'email'} value={email} onChange={handleChange} />
        <SimpleInput name='password' label='Password' type={'password'} value={password} onChange={handleChange} />
        <SimpleInput name='confirmPassword' label='Confirm Password' type={'password'} value={confirmPassword} onChange={handleChange} />
        <Button label='SIGN UP' type='submit' />
      </form>
    </div>
  )
}


export default connect(null, mapDispatchToProps)(SignUp);