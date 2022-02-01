import React from 'react';
import { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Alert, FormRow } from '../components';
import {useAppContext} from '../context/appContext'
import { useNavigate } from 'react-router-dom';
const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const Register = () => {
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate();
    const {user, isLoading, showAlert, displayAlert, registerUser, loginUser} = useAppContext();
    const handleChange = (e) => 
    {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) =>
    {
        e.preventDefault()
        const {name, email, password, isMember} = values;
        if(!email || !password || (!isMember && !name))
        {
            displayAlert();
            return;
        }

        const currentUser = {name, email, password};

        if(isMember){
            loginUser(currentUser);
        }
        else
        {
            registerUser(currentUser);
            console.log();
        }
        
    }

    const toggleMember = () =>
    {
        setValues({...values, isMember: !values.isMember})
    }

    useEffect(()=>{
        if(user){
            setTimeout(() => {
                navigate('/')
            }, 4000);
        }
    }, [user, navigate])

    return (
    <Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
            <h3>{values.isMember? "Login": "Register"}</h3>
            {showAlert && <Alert />}
            {/*name input*/}
            {!values.isMember &&
                    (
                        <FormRow type="text" name = "name" value = {values.name} handleChange = {handleChange}></FormRow>

                    )
            }
            {/*email input*/}
            <FormRow type="email" name = "email" value = {values.email} handleChange = {handleChange}></FormRow>
            {/*password input*/}
            <FormRow type="password" name = "password" value = {values.password} handleChange = {handleChange}></FormRow>
            <button type='submit' className='btn btn-block' disabled={isLoading}>Confirm</button>
            <p>
            {values.isMember? "Do not have an account?": "Already registered?"}
                <button type='button' onClick={toggleMember} className='member-btn'>
                    {values.isMember? "Register": "Login"}
                </button>
            </p>
        </form>
    </Wrapper>)
};

export default Register;