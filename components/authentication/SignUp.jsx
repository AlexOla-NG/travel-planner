import Link from 'next/link';
import React from 'react'
import { signIn } from 'next-auth/react';

// TODO: test signin/signout of different providers
// create custom button component for signIn providers

// test facebook login
// add providers for email and apple login

const SignUp = () => {

  const handleClick = (e) => {
    e.preventDefault();
    signIn()
  }
  return (
		<div>
			<div>SignUp Page</div>

			<div>
				<Link href="/api/auth/signin" onClick={handleClick}>
					SignIn with Google
				</Link>
			</div>
		</div>
  );
}

export default SignUp