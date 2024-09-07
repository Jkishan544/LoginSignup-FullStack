import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('email and password are required')
    }
    try {
      const url = "http://localhost:8000/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);

        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);

        setTimeout(() => {
          navigate('/home')
        }, 1000)

      }

      else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
      else if (!success) {
        handleError(message);
      }
    }
    catch (err) {
      handleError(err);
    }
  }

  return (
    <div className='container'>
      <h1 className='font-bold text-center text-2xl'>LOGIN</h1>
      <form onSubmit={handleLogin}>

        <div>
          <label htmlFor="email" className='font-semibold'>Email:</label>
          <input onChange={handleChange} value={loginInfo.email} type="email" name="email" placeholder='Enter your email...' />
        </div>
        <div>
          <label htmlFor="password" className='font-semibold'>Password:</label>
          <input onChange={handleChange} value={loginInfo.password} type="password" name="password" placeholder='Enter your password...' />
        </div>
        <button type='submit'>Login</button>
        <span>Don't have an account ?
          <Link to='/signup' className='underline text-blue-600'>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
