import React, { useState } from 'react';
import FormikComponent from '../Components/formik/FormikComponent';
import FormikController from '../Components/formik/FormikController';
import './Login.css';
import * as Yup from 'yup';
import { colors } from '../Values/colors';
import ModalChoice from '../Components/modal/ModalChoice';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid Email'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password should be 6 or more characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*.#?&]{8,}$/,
            'Password should alphabets, numbers and symbols'
        ),
});

const InitialValues = { email: '', password: '' };

function Login() {
    const [showModal, setShowModal] = useState(false);
    const handleSubmit = (values) => {
        console.log(values, 'values');
    };
    const showModalChoice = () => {
        setShowModal(true);
    };
    const handleClose = () => {
        setShowModal(false);
    };
    const onClickClient = () => {
        window.location.href = '/register';
    };
    const onClickMaker = () => {
        window.location.href = '/makers-register';
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
                        src='/assests/Login.png'
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
                        <div className='details'>Enter your details</div>
                        <div className='width'>
                            <FormikComponent
                                initialValues={InitialValues}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >
                                <FormikController
                                    name='email'
                                    control='input'
                                    placeholder='Enter E-mail'
                                />

                                <FormikController
                                    name='password'
                                    control='input'
                                    placeholder='Enter Password'
                                    isPassword
                                />

                                <div className='small mb-2'>
                                    Forget your password?
                                    <a
                                        className='font-weight-bold ml-1'
                                        //href={`${url}/identity`}
                                        style={{ color: colors.primary }}
                                    >
                                        Reset it Here
                                    </a>
                                </div>
                                <div className='d-flex justify-content-center mt-4'>
                                    <FormikController
                                        title='Sign In'
                                        type='submit'
                                        control='submit'
                                    />
                                </div>
                                <div className='d-flex justify-content-center mt-2'>
                                    <div className='text-center small'>
                                        Do not have an account?
                                        <a
                                            type='button'
                                            className='font-weight-bold ml-1'
                                            style={{ color: colors.primary }}
                                            onClick={showModalChoice}
                                        >
                                            Sign up
                                        </a>
                                    </div>
                                </div>
                            </FormikComponent>
                        </div>
                    </div>
                </div>
            </div>
            <ModalChoice
                show={showModal}
                handleClose={handleClose}
                onClickButton1={onClickClient}
                onClickButton2={onClickMaker}
                title='Sign Up as:'
                btnTitle1='Client'
                btnTitle2='Maker'
            />
        </div>
    );
}

export default Login;
