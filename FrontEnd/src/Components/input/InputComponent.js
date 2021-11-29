import React, { useEffect, useState } from 'react';
import { colors } from '../../Values/colors';
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
    console.log('errors', props.errors);

    return (
        <div className='mb-2'>
            {props.label && (
                <label
                    className='mb-1 font-weight-bold'
                    style={{ fontSize: 14 }}
                >
                    {props.label}
                </label>
            )}
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
                    style={
                        props.errors[props.name] &&
                        props.touched[props.name] && {
                            borderColor: colors.red,
                        }
                    }
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
