import React from 'react';
import { colors } from '../../Values/colors';

function ErrorMessage(props) {
    const errorStyle = {
        color: colors.red,
        fontSize: 14,
    };
    if (!props.error || !props.visible) return null;
    return <div style={errorStyle}>{props.error}</div>;
}

export default ErrorMessage;
