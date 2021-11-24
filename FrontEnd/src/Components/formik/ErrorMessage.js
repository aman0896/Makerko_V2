import React from 'react';

function ErrorMessage(props) {
    const errorStyle = {
        color: '#ff7f7f',
        fontSize: 14,
    };
    if (!props.error || !props.visible) return null;
    return <div style={errorStyle}>{props.error}</div>;
}

export default ErrorMessage;
