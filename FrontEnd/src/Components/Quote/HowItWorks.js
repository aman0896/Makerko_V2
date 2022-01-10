// import React, { Component } from 'react';
import './HowItworks.css';
import play from './demo.svg';
import React from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { GrConfigure } from 'react-icons/gr';
import { BsPersonCheckFill } from 'react-icons/bs';
import { FaDollarSign } from 'react-icons/fa';

function HowitWorks() {
	return (
		<>
			<div className='' style={{ width: '80%', margin: '0 10%' }}>
				<div className='row mt-5'>
					<div className='col-sm'>
						<div className='heading '>HOW TO GET A QUOTE</div>

						<span className='quote'>
							Learn how to build your first quote, upload your
							part and specify requirements
						</span>
					</div>
				</div>
				<div className='row' style={{ paddingTop: '80px' }}>
					<div className='col-md'>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<MdCloudUpload size={100} />
						</div>

						<div
							className='upload'
							style={{
								textAlign: 'center',
								paddingTop: '30px',
							}}
						>
							Upload
						</div>
						<div
							className='quote'
							style={{ textAlign: 'center', margin: 0 }}
						>
							Amet minim mollit non deserunt ullamco est sit
							aliqua dolor do amet sint.
						</div>
					</div>
					<div className='col-md'>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<GrConfigure size={100} />
						</div>

						<div
							className='upload'
							style={{
								textAlign: 'center',
								paddingTop: '30px',
							}}
						>
							Configure
						</div>
						<div
							className='quote'
							style={{ textAlign: 'center', margin: 0 }}
						>
							Amet minim mollit non deserunt ullamco est sit
							aliqua dolor do amet sint.
						</div>
					</div>
					<div className='col-md'>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<BsPersonCheckFill size={100} />
						</div>

						<div
							className='upload'
							style={{
								textAlign: 'center',
								paddingTop: '30px',
							}}
						>
							Select
						</div>
						<div
							className='quote'
							style={{ textAlign: 'center', margin: 0 }}
						>
							Amet minim mollit non deserunt ullamco est sit
							aliqua dolor do amet sint.
						</div>
					</div>
					<div className='col-md'>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<FaDollarSign size={100} />
						</div>

						<div
							className='upload'
							style={{
								textAlign: 'center',
								paddingTop: '30px',
							}}
						>
							Pricing
						</div>
						<div
							className='quote'
							style={{ textAlign: 'center', margin: 0 }}
						>
							Amet minim mollit non deserunt ullamco est sit
							aliqua dolor do amet sint.
						</div>
					</div>
				</div>
			</div>
			<div style={{ backgroundColor: 'black' }}>
				<div className='' style={{ width: '80%', margin: '0 10%' }}>
					<div className='row' style={{ marginTop: '80px' }}>
						<div className='col'>
							<div
								className='title pt-5 pb-5 font-weight-bold '
								style={{ color: '#0000FF', fontSize: 24 }}
							>
								DEMONSTRATION VIDEO
							</div>

							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<video
									style={{
										position: 'relative',
										width: '1500px',
										height: '500px',
										backgroundColor: 'lightgray',

										marginBottom: '100px',
									}}
								></video>
								<img
									src={play}
									style={{
										position: 'absolute',
										top: '50%',
										left: '45%',
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default HowitWorks;

// old code
// class HowitWorks extends Component {
//     state = {};
//     render() {
//         return (
//             <div className="container">
//                 <div className="row mt-5">
//                     <div className="col-sm">
//                         <div className="heading">HOW TO GET A QUOTE</div>

//                         <span className="quote">
//                             Learn how to build your first quote, upload your
//                             part and specify requirements
//                         </span>
//                     </div>
//                 </div>
//                 <div className="row" style={{ paddingTop: '80px' }}>
//                     <div className="col-md">
//                         <div
//                             style={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <img
//                                 //src=""
//                                 style={{
//                                     height: '100px',
//                                     width: '100px',
//                                     backgroundColor: 'lightgray',
//                                 }}
//                             />
//                         </div>

//                         <div
//                             className="upload"
//                             style={{
//                                 textAlign: 'center',
//                                 paddingTop: '30px',
//                             }}
//                         >
//                             Upload
//                         </div>
//                         <div className="quote" style={{ textAlign: 'center' }}>
//                             Amet minim mollit non deserunt ullamco est sit
//                             aliqua dolor do amet sint.
//                         </div>
//                     </div>
//                     <div className="col-md">
//                         <div
//                             style={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <img
//                                 // src=""
//                                 style={{
//                                     height: '100px',
//                                     width: '100px',
//                                     backgroundColor: 'lightgray',
//                                 }}
//                             />
//                         </div>

//                         <div
//                             className="upload"
//                             style={{
//                                 textAlign: 'center',
//                                 paddingTop: '30px',
//                             }}
//                         >
//                             Configure
//                         </div>
//                         <div className="quote" style={{ textAlign: 'center' }}>
//                             Amet minim mollit non deserunt ullamco est sit
//                             aliqua dolor do amet sint.
//                         </div>
//                     </div>{' '}
//                     <div className="col-md">
//                         <div
//                             style={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <img
//                                 // src=""
//                                 style={{
//                                     height: '100px',
//                                     width: '100px',
//                                     backgroundColor: 'lightgray',
//                                 }}
//                             />
//                         </div>

//                         <div
//                             className="upload"
//                             style={{
//                                 textAlign: 'center',
//                                 paddingTop: '30px',
//                             }}
//                         >
//                             Select
//                         </div>
//                         <div className="quote" style={{ textAlign: 'center' }}>
//                             Amet minim mollit non deserunt ullamco est sit
//                             aliqua dolor do amet sint.
//                         </div>
//                     </div>{' '}
//                     <div className="col-md">
//                         <div
//                             style={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <img
//                                 // src=""
//                                 style={{
//                                     height: '100px',
//                                     width: '100px',
//                                     backgroundColor: 'lightgray',
//                                 }}
//                             />
//                         </div>

//                         <div
//                             className="upload"
//                             style={{
//                                 textAlign: 'center',
//                                 paddingTop: '30px',
//                             }}
//                         >
//                             Pricing
//                         </div>
//                         <div className="quote" style={{ textAlign: 'center' }}>
//                             Amet minim mollit non deserunt ullamco est sit
//                             aliqua dolor do amet sint.
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row" style={{ marginTop: '80px' }}>
//                     <div className="col">
//                         <div className="title">DEMONSTRATION VIDEO</div>

//                         <div
//                             style={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                             }}
//                         >

//                             <video
//                                 style={{
//                                     position: 'relative',
//                                     width: '800px',
//                                     height: '400px',
//                                     backgroundColor: 'lightgray',
//                                     marginTop: '20px',
//                                     marginBottom: '50px',
//                                 }}
//                             ></video>
//                             <img
//                                 src={play}
//                                 style={{
//                                     position: 'absolute',
//                                     top: '50%',
//                                     left: '45%',
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
