import React from "react";
import { Modal } from "react-bootstrap";
import { colors } from "../../Values/colors";
import Button from "../Button";
import DropDown from "../input/DropDown";

function ProjectEditModal(props) {
    return (
        <>
            <div>
                {/* ------Modal------- */}
                <Modal
                    size={props.size ? props.size : ""}
                    style={{ zIndex: 9999 }}
                    show={props.show}
                    onHide={props.handleClose}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="my-4">{props.body}</Modal.Body>
                    {props.buttonName && (
                        <Modal.Footer>
                            <Button
                                onClick={props.onClickButton}
                                buttonStyle={
                                    props.buttonStyle
                                        ? props.buttonStyle
                                        : "button--primary--solid"
                                }
                                buttonSize={
                                    props.buttonSize
                                        ? props.buttonSize
                                        : "button--small"
                                }
                            >
                                {props.buttonName}
                            </Button>
                        </Modal.Footer>
                    )}
                </Modal>
            </div>
        </>
    );
}

export default ProjectEditModal;
