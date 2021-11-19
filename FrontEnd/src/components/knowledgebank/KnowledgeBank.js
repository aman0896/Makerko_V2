import React, { useEffect } from 'react';

import './KnowledgeBankBlog.css';
import knowledgebank from './KnowledgeBank.json';
import Footer from '../main/footer';
import { Scroll } from '../main/ProductionCapabilities';

function KnowledgeBank(props) {
    useEffect(() => {
        window.scrollTo({
            top: -50,
            // behavior: 'smooth',
        });
    }, []);

    return (
        <div className="pt-4 pb-4 " style={{ marginTop: '115px' }}>
            {/* <div className="row m-auto px-5 pb-5">
                {knowledgebank.map((item) => (
                    <div className="col-md m-2 p-0 d-flex justify-content-center">
                        <a href={item.href} target="_blank">
                            <div
                                className="card-bank text-center p-0 m-0"
                                style={{
                                    backgroundColor: '#5044FD',
                                    borderRadius: '5px',
                                    overflow: 'hidden',
                                    height: '350px',
                                    width: '230px',
                                }}
                            >
                                <img
                                    className="mb-5"
                                    src={item.src}
                                    width="100%"
                                    height="200px"
                                />
                                <h6 className="text-white">{item.title}</h6>
                                <p className="text-white img-caption">
                                    {item.content}
                                </p>
                            </div>{' '}
                        </a>
                    </div>
                ))}
            </div> */}
            <div className="px-4 pb-5 mb-5 mt-2">
                <Scroll background="#5044fd" />
            </div>
            <Footer />
        </div>
    );
}

export default KnowledgeBank;
