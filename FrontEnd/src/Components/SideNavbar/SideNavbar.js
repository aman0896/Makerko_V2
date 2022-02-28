import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNavbar.css';
import { CustomerMenuItems, MakerMenuItems } from './MenuItems';
import { useSelector } from 'react-redux';

function SideNavbar({ setPathname }) {
	const handleNavlinkClick = (event) => {
		console.log(event.target.baseURI, 'target');
		setPathname(event.target.baseURI);
	};

	const auth = useSelector((state) => state.isAuth);

	const menuItems =
		auth.userType === 'maker' ? MakerMenuItems : CustomerMenuItems;

	return (
		<div className='sidebar_container'>
			<ul className='sidebar_menuitems'>
				{menuItems.map((menuItem) => {
					return (
						<li className='sidebar_link'>
							<NavLink
								className='sidebar_navlink'
								activeClassName='sidebar_navlink active'
								to={menuItem.path}
								onClick={handleNavlinkClick}
							>
								<span
									style={{
										flex: '20%',
									}}
									className='p-1'
								>
									{menuItem.icon}
								</span>
								<span
									style={{
										flex: '80%',
									}}
								>
									{menuItem.title}
								</span>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default SideNavbar;

// function SideBar() {
// 	return (
// 		<div className='Sidebar mt-4  ' style={{ position: 'absolute' }}>
// 			{SideData.map((val, key) => {
// 				return (
// 					<div>
// 						<NavLink
//             className="navlink"
// 							activeClassName='active-class '
// 							to={val.path}
// 							style={{ textDecoration: 'none' }}
// 						>
// 							<div
// 								key={key}
// 								className='d-flex'
// 								style={{
// 									alignItems: 'center',
// 									justifyContent: 'center',
// 									height: 60,
// 								}}
// 								// id={window.location.pathname === val.path ? "active" : ""}
// 								//
// 								// onClick={() => {
// 								//   window.location.pathname = val.path;
// 								// }}
// 								// to={{ pathname: val.path }}
// 							>
// 								<div className='icon'>{val.Icon}</div>
// 								<div className='title'>{val.title}</div>
// 							</div>
// 						</NavLink>
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// }

// export default SideBar;
