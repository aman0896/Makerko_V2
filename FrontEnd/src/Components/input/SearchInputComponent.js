import { set } from "mobx";
import React from "react";
import { useWindowDimensions } from "../../Functions";
import PopperComponent from "../popper/PopperComponent";
import InputComponent from "./InputComponent";

function SearchInputComponent(props) {
    const { height, width } = useWindowDimensions();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [location, setLocation] = React.useState();
    const [text, setText] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [prevText, setPrevText] = React.useState("");
    React.useEffect(() => {
        if (!loading) {
            if (prevText !== text) {
                setPrevText(text);
                if (text.length > 2) {
                    setLoading(true);
                    fetchData();
                }
            }
        }
    }, [text, loading]);

    const fetchData = () => {
        fetch(
            `https://nominatim.openstreetmap.org/search?format=json&limit=10&q=${text}`
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "search data");
                setLocation(data);
                setLoading(false);
            });
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

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
            <InputComponent
                anchorRef={anchorRef}
                name="search"
                placeholder="Search"
                inputContainerStyle={{
                    width: width < 768 ? "100%" : (20 / 100) * width,
                }}
                onChangeText={(event) => {
                    handleChange(event);
                    handleToggle(event);
                }}
                value={text}
            />
            <PopperComponent
                open={open}
                loading={loading}
                anchorRef={anchorRef.current}
                placement="bottom-start"
                style={{
                    width: width < 768 ? "87%" : (20 / 100) * width,
                    zIndex: 9998,
                }}
                menuStyle={{
                    overflowY: "scroll",
                    maxHeight: 300,
                }}
                handleClose={handleClose}
                data={location}
                handleClick={handleClick}
            />
        </>
    );
}

export default SearchInputComponent;
