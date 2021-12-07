import React from "react";
import "./PartnersAndCollaboration.css";

function PartnersAndCollaboration({ partners }) {
    return (
        <div className="partners-container">
            <div className="partners-sub-container">
                <h2 className="partners-heading">Partners and Collaborators</h2>
                <div className="partners-list">
                    {partners.map((item, index) => (
                        <div key={index}>
                            <a href={item.href} target="_blank">
                                <img
                                    className="partners-image"
                                    src={item.src}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PartnersAndCollaboration;
