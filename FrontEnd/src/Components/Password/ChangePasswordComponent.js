import React from 'react';
import FormikComponent from '../formik/FormikComponent';
import FormikController from '../formik/FormikController';
import * as Yup from 'yup';

const InitialValues = {
    old_password: '',
    new_password: '',
    confirm_password: '',
};

const ValidationSchema = Yup.object().shape({
    old_password: Yup.string()
        .required('Password is required')
        .min(6, 'Password should be 6 or more characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*.#?&]{8,}$/,
            'Password should alphabets, numbers and symbols'
        ),
    new_password: Yup.string()
        .required('Password is required')
        .min(6, 'Password should be 6 or more characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#.?&])[A-Za-z\d@$!%*.#?&]{8,}$/,
            'Password should alphabets, numbers and symbols'
        ),
    confirm_password: Yup.string()
        .required('Password is required')
        .oneOf([Yup.ref('new_password'), null], 'Password do not match'),
    termsCondition: Yup.bool().oneOf(
        [true],
        'Please accept the terms and conditions to continue.'
    ),
});

function ChangePasswordComponent() {
    const handleSubmit = (values) => {
        console.log(values, 'values');
    };
    return (
        <div className="mb-3">
            <div className="section-heading mb-3">Change Password</div>
            <FormikComponent
                initialValues={InitialValues}
                onSubmit={handleSubmit}
                validationSchema={ValidationSchema}
            >
                <div className="row">
                    <div className="col-lg-6">
                        <FormikController
                            name="old_password"
                            control="input"
                            label="Current Password"
                            placeholder="Current Password"
                            isPassword
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg">
                        <FormikController
                            name="new_password"
                            control="input"
                            label="New Password"
                            placeholder="New Password"
                            isPassword
                        />
                    </div>
                    <div className="col-lg">
                        <FormikController
                            name="confirm_password"
                            control="input"
                            label="Confirm Password"
                            placeholder="Confirm Password"
                            isPassword
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <FormikController
                        title="Save"
                        type="submit"
                        control="submit"
                    />
                </div>
            </FormikComponent>
        </div>
    );
}

export default ChangePasswordComponent;
