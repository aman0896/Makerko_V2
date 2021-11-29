import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { colors } from '../../Values/colors';
import ButtonComponent from '../button/ButtonComponent';

function ModalChoice(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Body className='my-5'>
                <div className='row'>
                    <div className='col-sm border-right'>
                        <div className='d-flex justify-content-end'>
                            <img src='/assests/Makerko.png' />
                        </div>
                    </div>
                    <div className='col-sm'>
                        <div className='d-flex align-items-center flex-column'>
                            <div
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: colors.primary,
                                }}
                            >
                                {props.title}
                            </div>
                            <div className='my-2 px-3'>
                                <ButtonComponent
                                    title={props.btnTitle1}
                                    onClick={props.onClickButton1}
                                />
                            </div>
                            <div className='my-2'>
                                <ButtonComponent
                                    title={props.btnTitle2}
                                    onClick={props.onClickButton2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalChoice;
