import React, { useState } from 'react';
import FormikComponent from '../Components/formik/FormikComponent';
import FormikController from '../Components/formik/FormikController';
import './Login.css';
import * as Yup from 'yup';
import { colors } from '../Values/colors';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),

    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string().required('Email is required').email('Invalid Email'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password should be 6 or more characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*.#?&]{8,}$/,
            'Password should alphabets, numbers and symbols'
        ),
    confirm_pass: Yup.string()
        .required('Password is required')
        .oneOf([Yup.ref('password'), null], 'Password do not match'),
    termsCondition: Yup.bool().oneOf(
        [true],
        'Please accept the terms and conditions to continue.'
    ),
});

const InitialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    email: '',
    password: '',
    confirm_pass: '',
    termsCondition: false,
};

function Register() {
    const handleSubmit = (values) => {
        console.log(values, 'values');
    };
    return (
        <div
            style={{
                height: window.innerHeight - 80,
            }}
        >
            <div className='row m-0 h-100'>
                <div className='col-lg-7 m-0 p-0'>
                    <img
                        src='/assests/Register.png'
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </div>
                <div className='col-lg-4 mx-5 section'>
                    <div className='d-flex justify-content-center h-100 flex-column'>
                        <img
                            src='/assests/Title.png'
                            style={{
                                width: 180,
                                // height: 19,
                            }}
                        />
                        <div className='details'>
                            Enter your details to get started
                        </div>
                        <div className=''>
                            <FormikComponent
                                initialValues={InitialValues}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >
                                <div className='row'>
                                    <div className='col-lg'>
                                        <FormikController
                                            name='firstName'
                                            control='input'
                                            placeholder='First Name'
                                        />
                                    </div>
                                    <div className='col-lg'>
                                        <FormikController
                                            name='lastName'
                                            control='input'
                                            placeholder='Last Name'
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg'>
                                        <FormikController
                                            name='phoneNumber'
                                            control='input'
                                            placeholder='Phone Number'
                                        />
                                    </div>
                                    <div className='col-lg'>
                                        <FormikController
                                            name='address'
                                            control='input'
                                            placeholder='Enter Address'
                                        />
                                    </div>
                                </div>
                                <FormikController
                                    name='email'
                                    control='input'
                                    placeholder='Email Address'
                                    type='email'
                                />

                                <FormikController
                                    name='password'
                                    control='input'
                                    placeholder='Password'
                                    isPassword
                                />
                                <FormikController
                                    name='confirm_pass'
                                    control='input'
                                    placeholder='Confirm Password'
                                    isPassword
                                />

                                <FormikController
                                    name='termsCondition'
                                    control='checkbox'
                                />

                                <div className='d-flex justify-content-end mt-4'>
                                    <FormikController
                                        title='Sign Up'
                                        type='submit'
                                        control='submit'
                                    />
                                </div>
                                <div className='d-flex justify-content-end mt-2'>
                                    <div className='text-center small'>
                                        Already have an account?
                                        <a
                                            href='/login'
                                            type='button'
                                            className='font-weight-bold ml-1'
                                            style={{ color: colors.primary }}
                                        >
                                            Sign in
                                        </a>
                                    </div>
                                </div>
                            </FormikComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
