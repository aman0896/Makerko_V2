// import { ErrorMessage } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../../Values/colors';
import ErrorMessage from '../formik/ErrorMessage';

function CheckboxComponent(props) {
    const handleChange = (event) => {
        props.setFieldValue(props.name, event.target.checked);
    };
    return (
        <div className='form-group form-check'>
            <input
                type='checkbox'
                name={props.name}
                className={
                    'form-check-input ' +
                    (props.errors[props.name] && props.touched[props.name]
                        ? ' is-invalid'
                        : '')
                }
                onChange={(event) => {
                    handleChange(event);
                }}
                style={{ height: 15, width: 15 }}
            />
            <label htmlFor={props.name} className='form-check-label'>
                <span
                    style={{
                        fontSize: '15px',
                    }}
                >
                    I agree with the
                    <a
                        // to="/"
                        className='ml-1'
                        style={{
                            color: colors.primary,
                        }}
                    >
                        Terms and Conditions
                    </a>
                </span>
            </label>
            {/* <ErrorMessage
                name={props.name}
                component='div'
                className='invalid-feedback'
            /> */}
            <ErrorMessage
                error={props.errors[props.name]}
                visible={props.touched[props.name]}
            />
        </div>
    );
}

export default CheckboxComponent;