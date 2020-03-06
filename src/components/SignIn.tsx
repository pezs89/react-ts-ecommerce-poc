import React, { FormEvent, useState } from 'react';

import SimpleInput from './SimpleInput';
import Button from './Button';
import { signInAsync } from '../store/features/user/actions'
import { connect } from 'react-redux';


const mapDispatchToProps = {
  signInRequest: signInAsync.request
}

type SignInProps = typeof mapDispatchToProps;

type SignInState = {
  [key: string]: string;
}

const SignIn: React.FC<SignInProps> = ({ signInRequest }) => {
  const [userCredentials, setCredentials] = useState<SignInState>({ email: '', password: '' })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = userCredentials;
    signInRequest({ email, password });
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  }

  const { email, password } = userCredentials;
  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <SimpleInput name={'email'} value={email} type={'email'} label={'Email'} onChange={handleOnChange} required />
        <SimpleInput name={'password'} value={password} type={'password'} label={'Password'} onChange={handleOnChange} required />
        <div className='buttons'>
          <Button type={'submit'} label={'Submit'} />
          <Button type={'button'} label={'Sign in with Google'} callback={() => signInRequest(undefined)} extraClass={'google-sign-in'} />
        </div>
      </form>
    </div>
  )

}

export default connect(null, mapDispatchToProps)(SignIn);