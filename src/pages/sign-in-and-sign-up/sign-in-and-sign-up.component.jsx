import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { SignInSignUpLayout } from './sign-in-and-sign-up.styles';



const SignInAndSignUpPage = () => (
  <SignInSignUpLayout>
    <SignIn />
    <br/><hr/><br/>
    <SignUp />
  </SignInSignUpLayout>
);

export default SignInAndSignUpPage;
