import React from "react";
import { IconButton } from "@material-ui/core";
import "./ButtonComponent.css";
import { StyleMUI, StyledTableCell } from "../../styles/StyleMUI";

export default function ButtonIconComponent(props) {
    const classes = StyleMUI();
    const styledTable = StyledTableCell();
    return (
        <>
            <IconButton
                color={props.color}
                className={
                    props.useStyleTable
                        ? styledTable[props.className]
                        : classes[props.className]
                }
                style={props.styles}
                onClick={props.onPress}
                size="small"
            >
                {props.icon}
            </IconButton>
        </>
    );
}
