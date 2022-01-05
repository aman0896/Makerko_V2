import React from 'react';
import { colors } from '../../Values/colors';
import { Form } from 'formik';
import * as Yup from 'yup';
import FormikComponent from '../formik/FormikComponent';
import FormikController from '../formik/FormikController';
//import './loginPage.css';
function ForgetPasword() {
	const initialValues = {
		email: '',
	};
	const validationSchema = Yup.object({
		email: Yup.string().required('Required').email('Must be a valid email'),
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
				<div>
					<div
						style={{
							height: 250,
							width: '20rem',
							backgroundColor: 'grey',
						}}
					>
						<h3 className=' text-center pt-3'>Forget Password</h3>
						<hr />
						<FormikComponent
							initialValues={initialValues}
							validationSchema={validationSchema}
						>
							<div className=' align-items-center'>
								<div className='font-weight-bold m-3 p-0'>
									Email:
								</div>
								<div
									className=' '
									style={{ width: '90%', margin: '0 5%' }}
								>
									<FormikController
										type='email'
										placeholder='Enter Email'
										name='email'
										control='input'
									/>
									<div className='mt-3'>
										<FormikController
											title='Reset Password Here'
											type='submit'
											control='submit'
											className='font-weight-bold ml-1'
											style={{ width: '100%' }}
										/>
									</div>
								</div>
							</div>
							
						</FormikComponent>
					</div>
				</div>
			</div>
		</>
	);
}

export default ForgetPasword;

//
