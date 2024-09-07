import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    console.log('signupInfo -> ', signupInfo);

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = "http://localhost:8000/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)

            }
            else if (error) {
                handleError(message);
            }
            else if (!success) {
                const details = error?.details[0].message;
                handleError(details);
            }
        }
        catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container'>
            <h1 className='font-bold text-center text-2xl'>SIGNUP</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name" className='font-semibold'>Name:</label>
                    <input onChange={handleChange} value={signupInfo.name} type="text" name="name" autoFocus placeholder='Enter your name...' />
                </div>
                <div>
                    <label htmlFor="email" className='font-semibold'>Email:</label>
                    <input onChange={handleChange} value={signupInfo.email} type="email" name="email" placeholder='Enter your email...' />
                </div>
                <div>
                    <label htmlFor="password" className='font-semibold'>Password:</label>
                    <input onChange={handleChange} value={signupInfo.password} type="password" name="password" placeholder='Enter your password...' />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account ?
                    <Link to='/login' className='underline text-blue-600'>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup
