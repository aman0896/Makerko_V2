import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import react, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

export default function NotFoundErr() {
    const history = useHistory();
    const btnStyle = {
        backgroundColor: '#5044fd',
        color: 'white',
        height: '40px',
        width: '110px',
        margin: '2px',
    };
    const navigateBack = () => {

        history.goBack();
    };

    const navigateHome = () => {
        history.push({ pathname: '/' });
    };

    return (
        <Fragment>
            <div className=" mt-5 d-flex flex-column justifiy-content-center text-center align-items-center">
                <h2 className="font-weight-bold">Oops!</h2>
                <h2 className="font-weight-bold">404 Not Found</h2>
                <h5>Sorry, an error has occured, Requested page not found!</h5>
                <div>
                    <button
                        onClick={navigateBack}
                        className="btn"
                        style={btnStyle}
                    >
                        <FontAwesomeIcon
                            style={{ marginRight: 5 }}
                            icon={faArrowAltCircleLeft}
                            size="1x"
                        />
                        Go Back
                    </button>
                    <button
                        onClick={navigateHome}
                        className="btn"
                        style={btnStyle}
                    >
                        <FontAwesomeIcon
                            style={{ marginRight: 5 }}
                            icon={faHome}
                            size="1x"
                        />
                        Home
                    </button>
                </div>
            </div>
        </Fragment>
    );
}
