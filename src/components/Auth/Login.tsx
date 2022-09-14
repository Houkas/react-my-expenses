import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';

export function Login() {
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  // Get signUp function from the auth context
  const { signIn } = useAuth()

  const navigate = useNavigate()

  async function handleSubmit(e:any) {
    e.preventDefault()

    // Get email and password input values
    const email = emailRef.current.value
    const password = passwordRef.current.value

    // Calls `signIn` function from the context
    const { error } = await signIn({ email, password })

    if (error) {
      alert('error signing in')
    } else {
      // Redirect user to Dashboard
      navigate('/')
    }
  }


  return (
    <>
      <div className="container flex flex-col">
        <img src={'./logo_my_expensesX4.png'} className='mx-auto'></img>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button type="submit">Login</button>
      </form>
      </div>

      <br />

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      
    </>
  )
}