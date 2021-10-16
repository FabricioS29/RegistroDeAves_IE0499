import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { isAuthenticated, getCategories, createBird } from "./apiCore";


const AddBird = () => {
    const [values, setValues] = useState({
        nameCR: '',
        nameUSA: '',
        nameC: '',
        description: '',
        categories: [],
        category: '',
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
        description,
        categories,
        category,
        photo,
        loading,
        error,
        createdBird,
        redirectToProfile,
        formData
    } = values; // values.nameCR, values.photo ...

    // Requerir de todas las categorías
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, categories: data, formData: new FormData() })
            }
        })
    }

    // Ejecutar apenas cuando se inicia el componente y muestre las categorías
    useEffect(() => {
        setValues({ ...values, formData: new FormData()});
        init();
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
            <h2>{`${createdBird} was succesfully created`}</h2>
        </div>
    )

    const showLoading = () => 
        loading && (
        <div className='alert alert-success'>
            <h2>Loading ...</h2>
        </div>
        )

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true })
        createBird(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    nameCR: '',
                    nameUSA: '',
                    nameC: '',
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
            <h4>Post Photo</h4>
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
                <label className='text-muted'>NameCR</label>
                    <input
                        onChange={handleChange('nameCR')}
                        type='text'
                        className='form-control'
                        value={nameCR}
                    />
            </div>
            <div className='mb-3'>
                <label className='text-muted'>NameUSA</label>
                    <input
                        onChange={handleChange('nameUSA')}
                        type='text'
                        className='form-control'
                        value={nameUSA}
                    />
            </div>
            <div className='mb-3'>
                <label className='text-muted'>NameC</label>
                    <input
                        onChange={handleChange('nameC')}
                        type='text'
                        className='form-control'
                        value={nameC}
                    />
            </div>
            <div className='mb-3'>
                <label className='text-muted'>Description</label>
                    <input
                        onChange={handleChange('description')}
                        type='text'
                        className='form-control'
                        value={description}
                    />
            </div>
            <div className='mb-3'>
                <label className='text-muted'>Category</label>
                    <select
                        onChange={handleChange('category')}
                        type='text'
                        className='form-control form-select'
                    >
                        <option>Select Category</option>
                        {categories &&
                            categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                    </select>
            </div>
            <button className='btn btn-outline-primary'>New Species</button>
        </form>
    )
    
    return (
        <>
            <Navigation/>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                    <h2>Add a bird</h2>
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