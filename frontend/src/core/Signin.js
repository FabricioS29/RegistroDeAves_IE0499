import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import Navigation from "./Navigation";
import { signin, authenticate, isAuthenticated } from './apiCore';

import "./Signin.css";

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const {email, password, loading, error, redirectToReferrer} = values;
    const {user} = isAuthenticated();
    
    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({email, password})
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false})
                } else {
                    authenticate(
                        data, () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            })
                        }
                    )
                }
            })
    }

    const signInForm = () => (
        <form className="signin-box">
            <div className='mb-3'>
                <label className='text-muted'>Correo electrónico</label>
                <input
                    onChange={handleChange('email')}
                    type='email'
                    className='form-control'
                    value={email}
                />    
            </div>
            <div className='mb-3'>
                <label className='text-muted'>Contraseña</label>
                <input
                    onChange={handleChange('password')}
                    type='password'
                    className='form-control'
                    value={password}
                />    
            </div>
            <button onClick={clickSubmit} className='s-btn btn btn-primary'>
                Ingresar
            </button>
        </form>
    )

    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user && user.role === 1) {
                return <Redirect to="/" />
            } else {
                return <Redirect to="/" />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const ShowError = () => (
        <div className="alert alert-danget" style={{display: error ? '': 'none'}}>
            {error}
        </div>
    )

    const ShowLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Cargando..</h2>
            </div>
        )
    )
    
    
    return (
        <>
        <Navigation/>
        <div className="mt-5">
            <h4 className="text-center mb-5">Iniciar Sesión</h4>
            {ShowError()}
            {ShowLoading()}
            {signInForm()}
            {redirectUser()}
        </div>
    </>
    )
}

export default Signin;