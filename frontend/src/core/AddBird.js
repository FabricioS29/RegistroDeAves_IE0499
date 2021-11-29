import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { isAuthenticated, createBird } from "./apiCore";


const AddBird = () => {
    const [values, setValues] = useState({
        nameCR: '',
        nameUSA: '',
        nameC: '',
        observation: '',
        description: '',
        photo: '',
        loading: false,
        error: '',
        createdBird: '',
        redirectToProfile: false,
        formData: ''
    })
    // Si el usuario está login puede agregar
    const { user, token } = isAuthenticated()
    const {
        nameCR,
        nameUSA,
        nameC,
        observation,
        description,
        photo,
        loading,
        error,
        createdBird,
        redirectToProfile,
        formData
    } = values; // values.nameCR, values.photo ...


    useEffect(() => {
        setValues({ ...values, formData: new FormData()});
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const showError = () => (
        <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none'}}
        >
            {error}
        </div>
    )

    const showSuccess = () => (
        <div
            className='alert alert-info'
            style={{ display: createdBird ? '' : 'none'}}
        >
            <h2>{`${createdBird}, especie agregada`}</h2>
        </div>
    )

    const showLoading = () => 
        loading && (
        <div className='alert alert-success'>
            <h2>Cargando...</h2>
        </div>
        )

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true })
        createBird(token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    nameCR: '',
                    nameUSA: '',
                    nameC: '',
                    observation: '',
                    description: '',
                    photo: '',
                    loading: false,
                    createdBird: data.nameCR
                })
            }
        })
    }


    const newBirdForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
            <h5>Subir fotografía</h5>
            <div className='mb-3'>
                <label className='btn btn-secondary'>
                    <input
                        onChange={handleChange('photo')}
                        type='file'
                        name='photo'
                        accept='image/*'
                    />
                </label>
            </div>
            <div className='mb-3'>
                <label className='text-muted'>Nombre común</label>
                    <input
                        onChange={handleChange('nameCR')}
                        type='text'
                        className='form-control'
                        value={nameCR}
                    />
            </div>
            <div className='mb-3'>
                <label className='text-muted'>Nombre en inglés</label>
                    <input
                        onChange={handleChange('nameUSA')}
                        type='text'
                        className='form-control'
                        value={nameUSA}
                    />
            </div>
            <div className='mb-3'>
                <label className='text-muted'>Nombre científico</label>
                    <input
                        onChange={handleChange('nameC')}
                        type='text'
                        className='form-control'
                        value={nameC}
                    />
            </div>
            <div className='mb-3'>
                <label className='text-muted'>Lugar del avistamiento</label>
                    <input
                        onChange={handleChange('observation')}
                        type='text'
                        className='form-control'
                        value={observation}
                    />
            </div>
            <div className='mb-3'>
                <label className='text-muted'>Descripción</label>
                    <textarea
                        onChange={handleChange('description')}
                        type='text'
                        className='form-control'
                        value={description}
                        id="exampleFormControlTextarea1"
                        rows="3"
                    ></textarea>
            </div>
            <button className='btn btn-outline-primary'>Agregar</button>
        </form>
    )
    
    return (
        <>
            <Navigation/>
            <div className='container mt-5 mb-5'>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                    <h2 className="text-center mb-5">Agregar Nueva Especie</h2>
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newBirdForm()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBird; 