import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export default function FilterInput(props) {
    const [filterValue, setFilterValue] = useState("");
    const [filterOperator, setfilterOperator] = useState("contains");
    const [open, setOpen] = React.useState(true);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        console.log("inside toggle");
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        if (Object.keys(filterValue).length > 0) {
            showFilter();
        }
    }, [filterValue, filterOperator]);

    const showFilter = (data) => {
        if (data === true) {
            let data = null;
            props.parentCallBack(data);
            // props.filterCallBack();
        } else {
            let param = {
                filterData: filterValue,
                filterOperator: filterOperator,
            };
            let data = {
                key: props.filterColumn,
                param: param,
                isFilter: true,
            };
            props.parentCallBack(data);
        }
    };
    // const changeOperator = (event) => {
    //     setfilterOperator(event.target.value);
    //     if (event.target.value === "") {
    //         setFilterValue("");
    //         showFilter(true);
    //     }
    // };

    const filterSet = (event) => {
        setFilterValue(event.target.value.toLowerCase());
        if (event.target.value === "") {
            showFilter(true);
        }
    };

    const filterType = {
        string: (
            <div>
                <input
                    ref={anchorRef}
                    type="text"
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    placeholder="Search"
                    className="mapSearch"
                    onChange={(event) => {
                        filterSet(event);
                        handleToggle(event);
                    }}
                    value={filterValue}
                />
                <div
                    anchorEl={anchorRef.current}
                    style={{
                        width: 300,
                        zIndex: 9998,
                    }}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === "bottom"
                                        ? "center top"
                                        : "center bottom",
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="menu-list-grow"
                                        // onKeyDown={handleListKeyDown}
                                    >
                                        {props.filteredData?.length > 0 ? (
                                            props.filteredData.map(
                                                (item, index) => (
                                                    <MenuItem
                                                        style={{
                                                            flex: 1,
                                                            flexWrap: "wrap",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                        onClick={handleClose}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                )
                                            )
                                        ) : (
                                            <MenuItem
                                                style={{
                                                    flex: 1,
                                                    flexWrap: "wrap",
                                                    justifyContent: "center",
                                                }}
                                                onClick={handleClose}
                                            >
                                                Not Found
                                            </MenuItem>
                                        )}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </div>
            </div>
            // <InputComponent
            //     className="mx-2"
            //     label="Value"
            //     onChangeText={filterSet}
            //     value={filterValue}
            //     disabled={filterOperator === "" ? true : false}
            // />
        ),
    };
    return <>{filterType[props.data]}</>;
}
