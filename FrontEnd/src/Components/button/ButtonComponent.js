import { Button } from '@material-ui/core';
import React from 'react';
import { colors } from '../../Values/colors';

export default function ButtonComponent(props) {
    const btnStyle = {
        backgroundColor: colors.primary,
        borderRadius: 5,
        fontSize: 16,
        color: colors.white,
    };
    return (
        <button
            className={props.className ? props.className : 'btn'}
            onClick={props.handleSubmit}
            style={props.style ? props.style : btnStyle}
            type={props.type ? props.type : 'button'}
        >
            {props.title}
        </button>
    );
}
