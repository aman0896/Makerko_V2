import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import CardView from '../global/card';

var list = null;
function HubListArea({ title, HubList, getSelectedHub }) {
    const [selectedCardIndex, setSelectedCardIndex] = useState('');
    const [search, setsearch] = useState();
    const [selectedHub, setSelectedHub] = useState();
    var companyList = [];

    // console.log(Hublist.hublist);
    if (HubList) {
        companyList = HubList.hublist;
        console.log(companyList);
    }

    const onClickVisitProfile = (currentHub, services) => {
        const manufacturerInfo = { currentHub, services };
        const name = currentHub.Company_Name;
        const id = currentHub.Manufacturer_ID;

        window.open(`/manufacturer-list/${id}/${name}`, '_blank');
    };

    const searchSpace = (event) => {
        let keyword = event.target.value;
        setsearch(keyword);
    };

    if (companyList && companyList.length > 0) {
        let serviceData = '';

        list = companyList
            .filter((data) => {
                if (search == null) return data;
                else if (
                    data.Company_Name.toLowerCase().includes(
                        search.toLowerCase()
                    ) ||
                    data.Address.toLowerCase().includes(search.toLowerCase())
                ) {
                    console.log(data);
                    return data;
                }
            })
            .map((company, index) => {
                if (company.Material_Name) {
                    var services = JSON.parse(company.Material_Name);
                    serviceData = services.map((service) => {
                        return (
                            <span className="text-wrap" key={service.value}>
                                {service.label},{' '}
                            </span>
                        );
                    });
                }

                if (selectedCardIndex === index) {
                    var selected = true;
                } else {
                    selected = false;
                }

                return (
                    <div key={index} className="pl-5 mb-5">
                        <CardView
                            // files={filesData}
                            services={serviceData}
                            currentHub={company}
                            currentIndex={index}
                            companyList={companyList}
                            visitProfile={onClickVisitProfile}
                            selected={selected}
                            setSelected={setSelectedCardIndex}
                            getSelectedHub={getSelectedHub}
                        />
                    </div>
                );
            });
    } else {
        list = (
            <div className="container">
                <h4 className="text-secondary d-flex justify-content-center align-items-center">
                    NO HUB FOUND
                </h4>
            </div>
        );
    }

    return (
        <div className="">
           
            {companyList && companyList.length > 0 && (
                <div className= "d-flex justify-content-start"
                    style={{marginBottom: '20px', marginTop: '20px' }}
                >
                    <div id="searchbar">
                        <input
                            className="form-control"
                            type="text"
                            title="Search"
                            placeholder="Search by Name or Location"
                            style={{
                                paddingRight: '50px',
                            }}
                            onChange={(e) => searchSpace(e)}
                        />{' '}
                        <i id="search" className="fa fa-search"></i>
                    </div>
                </div>
            )}
            <div className="container">
                <Scrollbars
                    className="text-dark"
                    style={{
                        width: '100%',
                        height: 350,
                        borderStyle: 'solid',
                        borderRadius: '5px',
                        borderColor: 'lightgray',
                        borderWidth: '1px',
                        backgroundColor: 'lightgray',
                    }}
                    autoHide
                >
                    {list != null && (
                        <div className="row mt-3 ml-auto">{list}</div>
                    )}
                </Scrollbars>
            </div>
        </div>
    );
}

export default HubListArea;
