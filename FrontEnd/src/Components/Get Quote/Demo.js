import React from 'react'
import {GetData} from "./GetData";
import "./Get.css"
function Demo() {
    return (
		<>
			<div className='container'>
				<div className='row mt-5'>
					<div className='col-sm font-weight-bold'>
						<h2>HOW TO GET A QUOTE</h2>

						<span className='font-weight-bold '>
							Learn how to build your first quote, upload your
							part and specify requirements.
						</span>
					</div>
				</div>
			</div>
			<div className='container d-flex ' style={{marginTop:100}}>
				
                   
					{GetData.map((val, key) => {
						return (
							<ul className='nobullet'>
								<li className=''> {val.Icon}</li>
								<li className='font-weight-bold mt-5 text-center'>
									{val.title}
								</li>
								<li className='mt-4'>{val.content}</li>
							</ul>
						);
					})}
                   
				
			</div>
		</>
	);
}

export default Demo
