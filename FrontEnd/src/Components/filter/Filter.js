import React from "react";
import FilterOperator from "./FilterOperator";
import FilterInput from "./FilterInput";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import "./Filter.css";

export default function Filter(props) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    // const [d, setD] = React.useState();

    // React.useEffect(() => {
    //     fetch(
    //         `https://nominatim.openstreetmap.org/search?format=json&limit=10&q=${"pokhara"}`
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data, "search data");
    //             // setData(data);
    //             setD(data);
    //         });
    // }, []);

    const handleClick = (data) => {
        setOpen(false);
        props.handleSearch(data);
    };

    const handleToggle = (event) => {
        if (event.target.value && open === false) {
            setOpen(true);
        } else {
            if (event.target.value === "") {
                setOpen(false);
            }
        }
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            {/* Input value type for filter */}
            <FilterInput
                anchorRef={anchorRef}
                handleToggle={handleToggle}
                data={props.type}
                filteredData={props.data}
                operatorData={FilterOperator(props.filterTypeName)}
                filterColumn={props.filterColumn}
                tableData={props.tableData}
                parentCallBack={props.parentCallBack}
            />
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                style={{ width: 300, zIndex: 9998 }}
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
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    style={{
                                        overflowY: "scroll",
                                        maxHeight: 300,
                                    }}
                                >
                                    {props.data?.length > 0 ? (
                                        props.data.map((item, index) => (
                                            <div
                                                key={
                                                    item.name
                                                        ? item.name
                                                        : item["display_name"]
                                                }
                                                className={`p-2 filterItem ${
                                                    index + 1 ===
                                                    props.data.length
                                                        ? ""
                                                        : "border-bottom"
                                                }`}
                                                onClick={() =>
                                                    handleClick(item)
                                                }
                                            >
                                                {item.name
                                                    ? item.name
                                                    : item["display_name"]}
                                            </div>
                                        ))
                                    ) : (
                                        <div
                                            className="text-center"
                                            onClick={handleClose}
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
        </>
    );
}
