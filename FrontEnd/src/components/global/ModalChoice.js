import { sign } from 'jsonwebtoken';
import React from 'react';
import Button from './Button';

function ModalChoice({
    title,
    option1,
    option2,
    id,
    link1,
    link2,
    showModal,
    placeOrder,
}) {
    return (
        <div>
            <div
                className="modal fade"
                id={id}
                tabIndex="-1"
                aria-labelledby="placeOrderModalLabel"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    style={{ maxWidth: '600px' }}
                >
                    <div className="modal-content  ">
                        <div
                            className="modal-body"
                            style={{
                                height: '350px',
                            }}
                        >
                            <div
                                className="row p-0 m-0 d-flex justify-content-center align-items-center"
                                style={{ height: '100%' }}
                            >
                                <div
                                    className="col-sm  d-flex align-items-center justify-content-center border-Right"
                                    style={{
                                       //borderRight: '1px solid #C4C4C4',
                                        height: '60%',
                                    }}
                                >
                                    <div
                                        className="pt-1"
                                        style={{
                                            color: '#5044FD',
                                            fontSize: '2.3rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        MAKERKO
                                    </div>
                                </div>
                                {placeOrder ? (
                                    <div className="col d-flex justify-content-center align-items-center flex-column">
                                        <div
                                            className=""
                                            style={{
                                                color: '#5044FD',
                                                fontSize: '22px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {title}
                                        </div>
                                        <div className="mt-3">
                                            <a href={link1}>
                                                <button
                                                    type="button"
                                                    className="btn px-4 py-1  text-white"
                                                    style={{
                                                        backgroundColor:
                                                            '#5044FD',
                                                        borderRadius: '5px',
                                                        boxShadow:
                                                            '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    {option1}
                                                </button>
                                            </a>
                                        </div>
                                        <div className="mt-3">
                                            <a href={link2}>
                                                <button
                                                    type="button"
                                                    className="btn ml-1 px-4 py-1 "
                                                    style={{
                                                        color: 'white',
                                                        backgroundColor:
                                                            '#5044FD',
                                                        borderRadius: '5px',
                                                        boxShadow:
                                                            '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                                        fontSize: '16px',
                                                    }}
                                                >
                                                    {option2}
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-sm d-flex align-items-center justify-content-center">
                                        <div>
                                            <div
                                                className="row pb-4"
                                                style={{
                                                    color: '#5044FD',
                                                    fontSize: '22px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {title}
                                            </div>
                                            <div className="row">
                                                <div className="col p-0 m-0">
                                                    <a href={link1}>
                                                        <button
                                                            type="button"
                                                            className="btn px-4 py-1  text-white"
                                                            style={{
                                                                backgroundColor:
                                                                    '#5044FD',
                                                                borderRadius:
                                                                    '5px',
                                                                boxShadow:
                                                                    '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                                            }}
                                                        >
                                                            {option1}
                                                        </button>
                                                    </a>
                                                </div>
                                                <div className="col pr-2 m-0">
                                                    <a href={link2}>
                                                        <button
                                                            type="button"
                                                            className="btn ml-1 px-4 py-1 "
                                                            style={{
                                                                color: 'white',
                                                                backgroundColor:
                                                                    '#5044FD',
                                                                borderRadius:
                                                                    '5px',
                                                                boxShadow:
                                                                    '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                                            }}
                                                        >
                                                            {option2}
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalChoice;
