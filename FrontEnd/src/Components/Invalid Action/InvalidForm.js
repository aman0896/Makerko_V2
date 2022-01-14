import React from 'react';
import { Data } from './Data';

const New = () => {
	return (
		<>
			<nav
				className='navbar navbar-dark  py-3'
				style={{ backgroundColor: 'red' }}
			>
				<div className='container-fluid'>
					<span className='navbar-brand mb-0 h1 ps-4'>
						Invalid Action
					</span>
				</div>
			</nav>
			<div className='container'>
				<div className='d-flex w-75 flex-column' style={{ margin: 70 }}>
					<div className='row'>
						{Data.map((val, index) => (
							<>
								<div
									className='col-3 mb-5 mt-2 d-flex fw-bold'
									style={{ fontWeight: 'bolder' }}
								>
									{val.title}
								</div>
								<div className='col-7'>
									{index === 2 ? (
										<div className='pb-4 '>
											<textarea
												className='form-control pb-5'
												rows='12'
												style={{ height: 300 }}
												placeholder='Type invalid reasons and actions for correction'
											></textarea>
										</div>
									) : index === 3 ? (
										<div
											className='d-flex'
											style={{ position: 'relative' }}
										>
											<input
												type='text'
												className='form-control '
												placeholder='Upload files : pdf,jpeg,dwg'
												style={{ height: 50 }}
											/>
											<button
												className='btn btn-primary'
												style={{
													position: 'absolute',
													right: 4,
													top: 6,
													backgroundColor: '#0000FF',
												}}
												type='button'
											>
												Upload
											</button>
										</div>
									) : index === 5 ? (
										<>
											<input
												type='email'
												style={{ height: 50 }}
												className='form-control'
											/>

											<div className='d-flex  mt-4 justify-content-end '>
												<div className='p-2'>
													<button
														type='button'
														className='btn '
														style={{
															color: '#0000FF',
														}}
													>
														Cancel
													</button>
												</div>
												<div class='p-2 '>
													<button
														type='button'
														className='btn '
														style={{
															backgroundColor:
																'#0000FF',
															color: 'white',
														}}
													>
														Submit
													</button>
												</div>
											</div>
										</>
									) : (
										<input
											type='text'
											style={{
												height: 50,
											}}
											className='form-control'
										/>
									)}
								</div>
							</>
						))}
					</div>
				</div>
			</div>
			<div></div>
		</>
	);
};
export default New;
