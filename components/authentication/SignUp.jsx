import Link from 'next/link';
import React from 'react'
import { signIn } from 'next-auth/react';

// TODO: stopped here
// create models, middleware for api
// api middleware should include check for authentication to prevent unauthorized api access

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