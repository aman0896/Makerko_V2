import React from 'react'
import {MdCloudUpload} from "react-icons/md";
import { GrConfigure } from 'react-icons/gr';
import { BsPersonCheckFill } from 'react-icons/bs';
import { FaDollarSign } from 'react-icons/fa';

export const GetData = [
	{
		title: 'Upload',
		// path: '/makerko/myprofile',
		Icon: <MdCloudUpload size={80} />,
		content:'Upload your  CAD files (If you dont have design,request for design)',
	},
	{
		title: 'Configure',
		Icon: <GrConfigure size={80} />,
		content:'Select a  manifacuturing process, material, quantity  and thickness.',
	},
	{
		title: 'Select',
		Icon: <BsPersonCheckFill size={80} />,
		content:'Select a  manifacuturing process, material, quantity  and thickness.',
	},
	{
		title: 'Pricing',
		Icon: <FaDollarSign size={80} />,
		content:'Select a  manifacuturing process, material, quantity  and thickness.',
	},
];
