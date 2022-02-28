import React from 'react';

import FormikController from '../formik/FormikController';
import FormikComponent from '../formik/FormikComponent';
import * as Yup from 'yup';
function ResetPassword() {
	const initialValues = {
		password: '',
		confirmpassword: '',
	};
	const validationSchema = Yup.object({
		password: Yup.string()
			.required('Required')
			.min(6, 'Password needs to be 6 characters or more'),
		confirmpassword: Yup.string()
			.required('Required')
			.oneOf([Yup.ref('password'), null], 'Password do not  match'),
	});
	const onSubmit = (values) => {
		console.log('Form Data', values);
	};
	return (
		<>
			<div
				className='d-flex justify-content-center align-items-center'
				style={{ minHeight: '95vh' }}
			>
				<div className=''>
					<div
						className='card '
						style={{
							height: 'auto',
							width: '20rem',
							backgroundColor: 'grey',
						}}
					>
						<h3 className='text-center pt-3'>Reset Password</h3>
						<hr />
						<FormikComponent
							initialValues={initialValues}
							validationSchema={validationSchema}
						>
							<div style={{ width: '90%', margin: '0 5%' }}>
								<FormikController
									type='password'
									placeholder='New Password'
									name='password'
									control='input'
									isPassword
								/>
								<FormikController
									type='password'
									placeholder='Confirm Password'
									name='confirmpassword'
									control='input'
									isPassword
								/>
							</div>

							<FormikController
								title='Change Password'
								type='submit'
								control='submit'
								className='font-weight-bold ml-1'
								style={{ width: '90%', margin: '0 15px' }}
							/>

							<div
								className='ml-3 d-flex align-items-center'
								style={{ height: 40 }}
							>
								<a className='' href=''>
									Back to Log In
								</a>
							</div>
						</FormikComponent>
					</div>
				</div>
			</div>
		</>
	);
}

export default ResetPassword;
