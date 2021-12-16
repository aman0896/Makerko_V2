import React from "react";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

function PopperComponent(props) {
    return (
        <Popper
            open={props.open}
            anchorEl={props.anchorRef}
            role={undefined}
            placement={props.placement}
            transition
            disablePortal
            style={props.style}
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                            placement === "bottom-start"
                                ? "left top"
                                : "left bottom",
                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={props.handleClose}>
                            <MenuList style={props.menuStyle}>
                                {props.loading ? (
                                    <div
                                        className="text-center"
                                        // onClick={props.handleClose}
                                    >
                                        Searching
                                        <div
                                            className="spinner-border text-secondary spinner-border-sm mx-2"
                                            role="status"
                                        >
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                ) : props.data?.length > 0 ? (
                                    props.data.map((item, index) => (
                                        <div
                                            key={
                                                item.Company_Name
                                                    ? item.Company_Name
                                                    : item["display_name"]
                                            }
                                            className={`p-2 filterItem ${
                                                index + 1 === props.data.length
                                                    ? ""
                                                    : "border-bottom"
                                            }`}
                                            onClick={() =>
                                                props.handleClick(item)
                                            }
                                        >
                                            {console.log(
                                                item.Company_Name,
                                                "popper comopnenet"
                                            )}
                                            {item.Company_Name
                                                ? item.Company_Name
                                                : item["display_name"]}
                                        </div>
                                    ))
                                ) : (
                                    <div
                                        className="text-center"
                                        onClick={props.handleClose}
                                    >
                                        Not Found
                                    </div>
                                )}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}

export default PopperComponent;
