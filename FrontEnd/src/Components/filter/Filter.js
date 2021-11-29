import React from "react";
import FilterOperator from "./FilterOperator";
import FilterInput from "./FilterInput";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export default function Filter(props) {
    const classes = useStyles();

    // function handleListKeyDown(event) {
    //     if (event.key === "Tab") {
    //         event.preventDefault();
    //         setOpen(false);
    //     }
    // }

    // return focus to the button when we transitioned from !open -> open
    // const prevOpen = React.useRef(open);
    // React.useEffect(() => {
    //     if (prevOpen.current === true && open === false) {
    //         anchorRef.current.focus();
    //     }

    //     prevOpen.current = open;
    // }, [open]);

    return (
        <>
            {/* Input value type for filter */}
            <FilterInput
                data={props.type}
                filteredData={props.data}
                operatorData={FilterOperator(props.filterTypeName)}
                filterColumn={props.filterColumn}
                tableData={props.tableData}
                parentCallBack={props.parentCallBack}
            />
        </>
    );
}
