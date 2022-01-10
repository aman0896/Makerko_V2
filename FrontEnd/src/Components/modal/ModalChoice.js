import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { colors } from "../../Values/colors";
import Button from "../Button";
import ButtonComponent from "../button/ButtonComponent";
import "./Modal.css";

function ModalChoice(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Body className="my-4">
                <div className="row">
                    <div
                        className="col-sm  py-sm-5 h-100"
                        style={{ borderRight: `1px solid ${colors.gray}` }}
                    >
                        <div className="d-flex  justify-content-sm-end justify-content-center align-items-center">
                            <img
                                src="/assests/Makerko.png"
                                style={{ width: 120, height: 120 }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-sm py-sm-4">
                        <div className="d-flex align-items-center flex-column justify-content-center">
                            <div className="modal-title mb-3">
                                {props.title}
                            </div>

                            <Button
                                buttonStyle="button--primary--solid"
                                buttonSize="button--medium"
                                onClick={props.onClickButton1}
                            >
                                {props.btnTitle1}
                            </Button>

                            {/* <ButtonComponent
                  title={props.btnTitle1}
                  onClick={props.onClickButton1}
                /> */}

                            <Button
                                buttonStyle="button--primary--solid"
                                buttonSize="button--medium"
                                onClick={props.onClickButton2}
                            >
                                {props.btnTitle2}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalChoice;
