import React, { useEffect, useState } from 'react';
import ErrorMessage from '../formik/ErrorMessage';
import eye from './eye.svg';
import eyeoff from './eyeoff.svg';

export default function InputComponent(props) {
    const [data, setData] = useState();
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleShowPassword = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    useEffect(() => {
        if (props.setInitial) {
            setData(props.setInitial);
            props.setFieldValue(props.name, props.setInitial);
        }
    }, []);

    const handleChange = (event) => {
        setData(event.target.value);
        props.setFieldValue(props.name, event.target.value);
    };

    return (
        <div className='mb-2'>
            <div style={{ position: 'relative' }}>
                <input
                    type={
                        props.isPassword
                            ? secureTextEntry
                                ? 'password'
                                : 'text'
                            : props.type
                    }
                    className={
                        props.className ? props.className : 'form-control'
                    }
                    placeholder={props.placeholder}
                    value={props.value ? props.value : data}
                    onChange={(event) => {
                        props.setFieldValue
                            ? handleChange(event)
                            : props.onChangeText(event);
                    }}
                    onBlur={() => {
                        if (props.handleBlur) {
                            props.handleBlur(props.name);
                        }
                    }}
                />
                {props.isPassword && (
                    <img
                        onClick={handleShowPassword}
                        src={secureTextEntry ? eye : eyeoff}
                        alt='icon'
                        style={{
                            position: 'absolute',
                            top: '35%',
                            right: '5%',
                        }}
                    />
                )}
            </div>
            <ErrorMessage
                error={props.errors[props.name]}
                visible={props.touched[props.name]}
            />
        </div>
    );
}
