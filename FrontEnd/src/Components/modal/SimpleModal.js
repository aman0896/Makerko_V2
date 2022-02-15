import React from "react";
import { Modal } from "react-bootstrap";
import { colors } from "../../Values/colors";
import Button from "../Button";
import DropDown from "../input/DropDown";

function SimpleModal(props) {
    return (
        <>
            <div>
                {/* ------Modal------- */}
                <Modal
                    size={props.size ? props.size : ""}
                    style={{ zIndex: 99999 }}
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

export default SimpleModal;

// {
//     props.showModal && (
//         <div
//             className="modal fade"
//             tabIndex="-1"
//             aria-labelledby="showModal"
//             aria-hidden="true"
//         >
//             <div className="modal-dialog modal-dialog-centered">
//                 <div className="modal-content">
//                     <div className="modal-header m-0 p-0">
//                         <h5
//                             className="modal-title"
//                             id="showModal"
//                             style={{
//                                 fontWeight: "bold",
//                                 marginLeft: "1rem",
//                                 padding: 0,
//                                 alignSelf: "center",
//                             }}
//                         >
//                             Update Status
//                         </h5>
//                         <span
//                             type="button"
//                             data-dismiss="modal"
//                             aria-label="Close"
//                             aria-hidden="true"
//                             style={closeButtonStyle}
//                         >
//                             &times;
//                         </span>
//                     </div>
//                     <div className="modal-body mt-3 mb-3">
//                         {/* <DropDown
//                         selectedValue={selectedValue}
//                         ID={`statusDropDown${index}`}
//                         options={statusOption}
//                         onChange={onStatusSelect}
//                     /> */}
//                     </div>
//                     <div className="modal-footer">
//                         {/* <Button
//                         onClick={handleSubmit}
//                         buttonStyle="button--primary--solid"
//                         buttonSize="button--small"
//                     >
//                         {props.btnName}
//                     </Button> */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
