import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
// import FileViewer from "react-file-viewer";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function TermsAndPolicy(props) {
    const [modalShow, setModalShow] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const pagelist = [];

    for (var i = 1; i <= numPages; i++) {
        pagelist.push(<Page scale={1.2} pageNumber={i} />);
    }

    return (
        <>
            <a style={props.style} onClick={() => setModalShow(true)}>
                {props.subject}
            </a>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.subject}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <FileViewer fileType={props.type} filePath={props.file} /> */}
                    <div className="d-flex justify-content-center">
                        <Document
                            file={props.file}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            {pagelist}
                        </Document>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn"
                        style={{ backgroundColor: "#5044fd", color: "white" }}
                        onClick={() => setModalShow(false)}
                    >
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
