import { RefObject, useRef, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import { useAuth } from './Auth';

export function Signup() {
  const emailRef = useRef() as RefObject<HTMLInputElement>
  const passwordRef = useRef() as RefObject<HTMLInputElement>

  // Get signUp function from the auth context
  const { signUp } = useAuth()

  let navigate = useNavigate()

  async function handleSubmit(e:any) {
    e.preventDefault()

    // Get email and password input values
    const email = emailRef.current!.value
    const password = passwordRef.current!.value

    // Calls `signUp` function from the context
    const { error } = await signUp({ email, password })

    if (error) {
      alert('error signing in')
    } else {
      // Redirect user to Dashboard
      navigate('/')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button type="submit">Sign up</button>
      </form>
      <br />

      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  )
}