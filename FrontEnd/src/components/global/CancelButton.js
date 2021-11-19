import React from 'react';
import { useHistory } from 'react-router';
import './global.css';

export default function CancelButton({ styleClass }) {
    const history = useHistory();
    return (
        <button
            id="cancel-button"
            type="button"
            className={styleClass}
            // style={{
            //     fontSize: '16px',
            //     backgroundColor: 'white',
            //     borderRadius: '5px',
            //     color: '#5044FD',
            //     display: 'flex',
            //     justifyContent: 'center',
            //     border: 'none',
            // }}
            onClick={() => {
                history.push('/');
            }}
        >
            Cancel
        </button>
    );
}
CancelButton.defaultProps = {
    styleClass: 'btn',
};
