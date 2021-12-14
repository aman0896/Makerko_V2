import React from "react";

export default function PopUpComponent(props) {
    return (
        <div>
            <span className="font-weight-bold">Name: </span> {props.data.name}
            <br />
            <span className="font-weight-bold">Location: </span>
            {props.data.location}
            <br />
            <span className="font-weight-bold">Contact: </span>
            {props.data.contact}
            <br />
            <span className="font-weight-bold">Office Hour: </span>
            {props.data.officeHour}
            <br />
        </div>
    );
}
