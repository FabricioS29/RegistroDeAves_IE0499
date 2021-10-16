import React, { useEffect ,useState } from "react";
import { Link } from "react-router-dom";
import Navigation from './Navigation';

import "./Signup.css";
import { Tooltip } from "reactstrap";
import { signup } from "./apiCore";

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password, success, error } = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault(); // No puede hacer submit hasta que el usuario llene los datos del signup
        setValues({ ...values, error: false })
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }

    const signUpForm = () => (
        <form className="sign-box">
            <div className='mb-3'>
                <label className='text-muted'>Name</label>
                <input
                    onChange={handleChange('name')}
                    value={name}
                    type='text'
                    className='form-control'
                />    
            </div>
            <div className='mb-3'>
                <label className='text-muted'>email</label>
                <input
                    onChange={handleChange('email')}
                    value={email}
                    type='email'
                    className='form-control'
                />    
            </div>
            <div className='mb-3'>
                <label>Password</label>
                <input
                    onChange={handleChange('password')}
                    value={password}
                    type='password'
                    className='form-control'
                />    
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>
                Sign up
            </button>
        </form>
    );

    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className='alert alert-info' style={{ display: success ? '' : 'none' }}>
            <Link to='/signin'>Sign in</Link>
        </div>
    )


    return (
        <>
            <Navigation/>
            <div className="mt-5">
                <h4 className="text-center mb-5">Signup form</h4>
                {signUpForm()}
                {showError()}
                {showSuccess()}
            </div>
        </>
    )
}

export default Signup;