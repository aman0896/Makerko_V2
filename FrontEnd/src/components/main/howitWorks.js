import React, { Component } from 'react';
import './howitWorks.css';
import play from './demo.svg';

class howitWorks extends Component {
    state = {};
    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm">
                        <div className="heading">HOW TO GET A QUOTE</div>

                        <span className="quote">
                            Learn how to build your first quote, upload your
                            part and specify requirements
                        </span>
                    </div>
                </div>
                <div className="row" style={{ paddingTop: '80px' }}>
                    <div className="col-md">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                //src=""
                                style={{
                                    height: '100px',
                                    width: '100px',
                                    backgroundColor: 'lightgray',
                                }}
                            />
                        </div>

                        <div
                            className="upload"
                            style={{
                                textAlign: 'center',
                                paddingTop: '30px',
                            }}
                        >
                            Upload
                        </div>
                        <div className="quote" style={{ textAlign: 'center' }}>
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint.
                        </div>
                    </div>
                    <div className="col-md">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                // src=""
                                style={{
                                    height: '100px',
                                    width: '100px',
                                    backgroundColor: 'lightgray',
                                }}
                            />
                        </div>

                        <div
                            className="upload"
                            style={{
                                textAlign: 'center',
                                paddingTop: '30px',
                            }}
                        >
                            Configure
                        </div>
                        <div className="quote" style={{ textAlign: 'center' }}>
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint.
                        </div>
                    </div>{' '}
                    <div className="col-md">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                // src=""
                                style={{
                                    height: '100px',
                                    width: '100px',
                                    backgroundColor: 'lightgray',
                                }}
                            />
                        </div>

                        <div
                            className="upload"
                            style={{
                                textAlign: 'center',
                                paddingTop: '30px',
                            }}
                        >
                            Select
                        </div>
                        <div className="quote" style={{ textAlign: 'center' }}>
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint.
                        </div>
                    </div>{' '}
                    <div className="col-md">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                // src=""
                                style={{
                                    height: '100px',
                                    width: '100px',
                                    backgroundColor: 'lightgray',
                                }}
                            />
                        </div>

                        <div
                            className="upload"
                            style={{
                                textAlign: 'center',
                                paddingTop: '30px',
                            }}
                        >
                            Pricing
                        </div>
                        <div className="quote" style={{ textAlign: 'center' }}>
                            Amet minim mollit non deserunt ullamco est sit
                            aliqua dolor do amet sint.
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '80px' }}>
                    <div className="col">
                        <div className="title">DEMONSTRATION VIDEO</div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >

                            <video
                                style={{
                                    position: 'relative',
                                    width: '800px',
                                    height: '400px',
                                    backgroundColor: 'lightgray',
                                    marginTop: '20px',
                                    marginBottom: '50px',
                                }}
                            ></video>
                            <img
                                src={play}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '45%',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default howitWorks;
