import { FiUser } from 'react-icons/fi';
import { IoGitNetworkSharp } from 'react-icons/io5';
import { ImFilesEmpty } from 'react-icons/im';
import { IoReorderThreeOutline } from 'react-icons/io5';
import './sidetab.css';
import { useEffect, useState } from 'react';
import { GetCookiesInfo } from '../global/GlobalFunction';
import { useHistory, useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

function Sidetab(props) {
    const [userType, setUserType] = useState();
    const [userID, setUserID] = useState();

    useEffect(async () => {
        const data = await GetCookiesInfo().then((response) => {
            if (response.data) {
                return response.data;
            }
        });
        console.log(data, 'data');
        setUserType(data.userStatus);
        setUserID(data.uid);
    }, []);
    return (
        <div>
            <div className="mt-5">
                <div>
                    {userType === 'maker' ? (
                        <>
                            <NavLink
                                to={`/${userID}/manufacturer-profile`}
                                className="sidetab"
                                activeClassName="sidetab-active"
                            >
                                <FiUser size="22px" />
                                <span className="ml-1">My Profile</span>
                            </NavLink>

                            <NavLink
                                to="/my-hub"
                                className="sidetab"
                                activeClassName="sidetab-active"
                            >
                                <IoGitNetworkSharp size="22px" rotate={180} />
                                <span className="ml-2"> My Hubs</span>
                            </NavLink>

                            <NavLink
                                to={`/maker/${userID}/order-status`}
                                className="sidetab"
                                activeClassName="sidetab-active"
                            >
                                <IoReorderThreeOutline size="24px" />
                                <span className="ml-2">My Orders</span>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to={`/${userID}/customer-profile`}
                                className="sidetab"
                                activeClassName="sidetab-active"
                            >
                                <FiUser size="22px" />{' '}
                                <span className="ml-1">My Profile</span>
                            </NavLink>

                            <NavLink
                                to={`/client/${userID}/order-status`}
                                className="sidetab"
                                activeClassName="sidetab-active"
                            >
                                {/* <img src="icon/Orders.svg" /> */}
                                <IoReorderThreeOutline size="24px" />
                                <span className="ml-2">My Orders</span>
                            </NavLink>
                        </>
                    )}

                    <NavLink
                        className="sidetab"
                        activeClassName="sidetab-active"
                        to="/edit-projectlist"
                    >
                        <ImFilesEmpty size="20px" />
                        <span className="ml-2">My Projects</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
export default Sidetab;
