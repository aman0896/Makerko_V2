import { Tab, Tabs } from "react-bootstrap";
import React, { useState } from "react";
import CustomerOrderStatus from "./CustomerOrderStatus";
import CustomerRequestDesign from "./CustomerRequestDesign";
import Sidetab from "../main/sidetab";

const TabBar = (props) => {
  const [activeTab, setActiveTab] = useState(1);
  const [color, setColor] = useState();

  const handleSelect = (selectedTab, e) => {
    setActiveTab(selectedTab);
  };
  return (
    <div className="row container-fluid m-auto">
      <div className="col-lg-2">
        <Sidetab />
      </div>
      <div
        className="col-lg"
        style={{
          marginLeft: "80px",
          paddingTop: "80px",
        }}
      >
        <div className="table-heading">
          <span className="m-auto">Order Status</span>
        </div>
        <Tabs
          activeKey={activeTab}
          onSelect={handleSelect}
          className="myClass"
          style={{ borderBottomColor: "#ffffff" }}
        >
          <Tab eventKey={1} title="Request Quotation">
            <CustomerOrderStatus />
          </Tab>
          <Tab eventKey={2} title="Request Design">
            <CustomerRequestDesign />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default TabBar;
