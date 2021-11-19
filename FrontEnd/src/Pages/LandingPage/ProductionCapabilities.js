import React, { Component, useEffect, useState } from "react";
import Button from "../../components/global/Button";
import knowledgebank from "../../components/knowledgebank/KnowledgeBank.json";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { useHistory } from "react-router-dom";
import "../css/Technology.css";

class ProductionCapabilities extends Component {
    render() {
        return (
            <div>
                <div className="" id="production-capabilities">
                    <div className="row m-auto">
                        <div className="col-12">
                            <h3
                                className="text-white text-center my-5"
                                style={{ fontWeight: "700" }}
                            >
                                Production Capabilities
                            </h3>
                        </div>
                    </div>
                    <div className="px-4">
                        <Scroll background="black" />
                    </div>

                    <div className="row m-auto px-5 pt-5">
                        <div className="col-lg m-2 p-0">
                            <div className="text-white mb-5">
                                <b>Other local manufacturing:</b> Injection
                                Molding / Tool and Die Making / Casting / Metal
                                Fabrication / Wood Working
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row  my-4 ">
                        <div className="col-md d-flex justify-content-center mr-5 middle-line">
                            <div>
                                <div>
                                    <p className="py-5">
                                        Explore our manufacturing hubs to select
                                        from the portfolio of local makers.
                                        Users can sort and filter makers by
                                        their preferred company name,
                                        manufacturing process, material and
                                        location. Users know makers’ production
                                        capabilities, products, services,
                                        materials and rates by visiting their
                                        portfolio.
                                    </p>
                                </div>
                                <div>
                                    <Button
                                        btnName="Explore Manufacturing Hubs"
                                        styleClass="btn btn-lg d-flex justify-content-center"
                                        link="/manufacturer-list"
                                    />
                                </div>
                                <div className="mt-4 pb-4">
                                    <a
                                        href="/manufacturer-signup"
                                        className="order-link"
                                    >
                                        Are you a{" "}
                                        <span className="font-weight-bold">
                                            Maker?
                                        </span>{" "}
                                        Sign Up to build your portfolio
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md d-flex justify-content-center">
                            <div>
                                <p className="py-5">
                                    Share what you make. Someone might be in
                                    need of it. The Makerko platform provides
                                    makers and innovators greater visibility to
                                    their business and product ideas. Explore
                                    featured projects to learn how local
                                    innovators and makers are applying
                                    manufacturing technologies to bring good to
                                    humanity.
                                </p>

                                <Button
                                    btnName="View Featured Projects"
                                    styleClass="btn  btn-lg d-flex justify-content-center"
                                    link="feature-project"
                                />

                                <div className="mt-4 pb-4">
                                    <a href="/feature" className="order-link">
                                        Share your{" "}
                                        <span style={{ fontWeight: "bolder" }}>
                                            innovation/ Product/ Project
                                        </span>{" "}
                                        to feature in our platform
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductionCapabilities;

const MenuItem = ({ href, src, title, selected, content, background }) => {
    const [isSwiping, setSwiping] = useState(false);
    const [drag, setDrag] = useState(false);
    const history = useHistory();

    const handleClick = () => {
        if (drag) if (href) window.open(href, "_blank");
    };

    return (
        <div
            onMouseDown={() => {
                setSwiping(false);
            }}
            onMouseMove={() => {
                setSwiping(true);
            }}
            onMouseUp={(e) => {
                if (!isSwiping && e.button === 0) {
                    setDrag(true);
                } else {
                    setDrag(false);
                }

                setSwiping(false);
            }}
            onClick={() => {
                handleClick();
            }}
            className="items"
        >
            <div
                className="card-bank text-center p-0 m-0 mx-2"
                style={{
                    backgroundColor: background,
                    borderRadius: "5px",
                    overflow: "hidden",
                    height: "350px",
                    width: "225px",
                }}
            >
                <img className="mb-5" src={src} width="100%" height="200px" />
                <h6 className="text-white">{title}</h6>
                <p className="text-white img-caption">{content}</p>
            </div>
        </div>
    );
};

// All items component
// Important! add unique key
export const Menu = (list, selected, background) =>
    list.map((el, index) => {
        const { href, src, title, content } = el;

        return (
            <div key={index}>
                <MenuItem
                    href={href}
                    title={title}
                    src={src}
                    selected={selected}
                    content={content}
                    background={background}
                />
            </div>
        );
    });

const selected = "item1";
export const ArrowRight = () => {
    return (
        <div className="arrow-next">
            <i className="arrow right"></i>
        </div>
    );
};
export const ArrowLeft = () => {
    return (
        <div className="arrow-prev">
            <i className="arrow left"></i>
        </div>
    );
};
export class Scroll extends Component {
    constructor(props) {
        super(props);
        // call it again if items count changes
        this.menuItems = Menu(
            knowledgebank.slice(0, knowledgebank.length),
            this.state.selected,
            this.props.background
        );
        this.arrowLeft = ArrowLeft();
        this.arrowRight = ArrowRight();
        this.state.itemCount = knowledgebank.length;
    }

    state = {
        selected,
    };

    onSelect = (key) => {
        this.setState({ selected: key });
    };

    render() {
        const { selected } = this.state;
        // Create menu from items
        const menu = this.menuItems;

        return (
            <div>
                <ScrollMenu
                    ref={(el) => (this.menu = el)}
                    data={menu}
                    alignCenter={false}
                    arrowLeft={this.arrowLeft}
                    arrowRight={this.arrowRight}
                    // selected={selected}
                    // onSelect={this.onSelect}
                    clickWhenDrag={false}
                    wheel={false}
                    hideSingleArrow={true}
                    transition="all 0.3s ease-in-out"
                    hideArrows={false}
                />
            </div>
        );
    }
}
