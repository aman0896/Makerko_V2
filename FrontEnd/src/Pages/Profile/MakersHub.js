import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FileDownload } from '../../commonApi/CommonApi';
import CardViewVerticalComponent from '../../Components/card/CardViewVerticalComponent';

function MakersHub() {
	const [hubs, setHubs] = useState(null);
	const makersList = useSelector((state) => state.makersList.makersList);
	console.log(makersList, 'makerlist');
	useEffect(() => {
		if (makersList) UpdateMakerList(makersList);
	}, [makersList]);

	const onHubClick = (hub) => {
		window.open(
			`/makers/${hub.Manufacturer_ID}/${hub.Company_Name}`,
			'_blank'
		);
	};

	async function UpdateMakerList(makersList) {
		if (makersList) {
			for (let i = 0; i < makersList.length; i++) {
				const imageData = JSON.parse(makersList[i].Logo);
				const imageBlob = await FileDownload(imageData.filePath);
				const previewUrl = window.URL.createObjectURL(imageBlob);
				makersList[i].Logo = previewUrl;
			}
		}
		setHubs(makersList);
	}

	const hubList =
		hubs &&
		hubs.map((hub, index) => {
			return (
				<CardViewVerticalComponent
					index={index}
					name={hub.Company_Name}
					image={hub.Logo}
					data={hub}
					description={hub.Brief_Description}
					onPress={onHubClick}
				/>
			);
		});

	return (
		<>
			<div className='mainComponent'>
				<div className='d-flex justify-content-between align-items-center flex-wrap'>
					<span
						className='heading text-uppercase'
						style={{ fontSize: '36px', color: 'black' }}
					>
						MAKERS HUB
					</span>
					<form>
						<div class='input-group'>
							<div class='form-outline'>
								<input
									type='search'
									placeholder='Search by Hubs ,Location ,Process ,Material'
									class='form-control'
									style={{ width: '300px', fontSize: '12px' }}
								/>
							</div>
							<button
								type='button'
								class='btn btn-white'
								style={{
									position: 'absolute',
									right: '0',
								}}
							>
								<i class='fas fa-search'></i>
							</button>
						</div>
					</form>
				</div>
				<div className='row justify-content-around mt-4'>{hubList}</div>
			</div>
		</>
	);
}

export default MakersHub;
