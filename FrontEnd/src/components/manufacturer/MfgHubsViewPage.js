import axios from 'axios';
import React, { Component } from 'react';
import { ManufacturingHubListView } from '../global/card';
import '../main/style.css';
import { withRouter } from 'react-router-dom';
import Footer from '../main/footer';

class ManufacturingHubsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registeredHubs: [],
            serviceList: [],
            search: '',
        };
    }

    componentDidMount() {
        //#region Get all Registered Hubs and Its services
        window.scrollTo({
            top: -50,
        });
        axios.post(`${window.host}/registeredhubs`).then((response) => {
            if (response.data) {
                const { manufacturerList, serviceList } = response.data;
                manufacturerList.map((hub) => {
                    var services = [];
                    serviceList.map((service) => {
                        if (hub.Manufacturer_ID == service.Manufacturer_ID) {
                            services = services.concat(service);
                            hub.services = services;
                            return hub;
                        }
                    });
                });
                console.log(
                    manufacturerList,
                    '------------------',
                    serviceList
                );
                this.setState({
                    registeredHubs: manufacturerList,
                    serviceList: serviceList,
                });
            }
        });
        //#endregion
    }
    onClickReadMore = (currentHub, services) => {
        const { match } = this.props;
        const name = currentHub.Company_Name;
        const id = currentHub.Manufacturer_ID;
        //window.location.href = `${match.path}/${id}/${name}`;
        // this.props.history.push({
        //     pathname: `/manufacturer-list/${id}/${name}`,
        // });
        window.open(`/manufacturer-list/${id}/${name}`, '_blank');
    };

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword });
    };

    render() {
        const { registeredHubs, serviceList, search } = this.state;
        var materials = [];
        console.log(materials, 'check');
        return (
            <div>
                <div
                    className="container-fluid"
                    style={{
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        width: '90%',
                    }}
                >
                    <div className="row m-auto">
                        <div className="col-xs p-2">
                            {' '}
                            <div
                                className="font-weight-bold"
                                style={{ fontSize: '24px', marginTop: '60px' }}
                            >
                                Manufacturers
                            </div>
                        </div>

                        <div className="col">
                            <div
                                className="d-flex justify-content-end"
                                style={{
                                    marginBottom: '20px',
                                    marginTop: '50px',
                                }}
                            >
                                <div id="searchbar">
                                    <input
                                        className="form-control"
                                        type="text"
                                        title="Search"
                                        placeholder="Search by hubs, location, process, material"
                                        style={{ paddingRight: '60px' }}
                                        onChange={(e) => this.searchSpace(e)}
                                    />{' '}
                                    <i id="search" className="fa fa-search"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row  pt-2 mfg-view">
                        {registeredHubs
                            .filter((data) => {
                                if (search == null) return data;
                                else if (
                                    data.Company_Name.toLowerCase().includes(
                                        search.toLowerCase()
                                    ) ||
                                    data.Email.toLowerCase().includes(
                                        search.toLowerCase()
                                    ) ||
                                    data.Address.toLowerCase().includes(
                                        search.toLowerCase()
                                    )
                                ) {
                                    return data;
                                } else {
                                    var result;
                                    if (data.services) {
                                        data.services.filter((service) => {
                                            const materialDetails = JSON.parse(
                                                service.Material_Name
                                            );
                                            if (
                                                service.Name.toLowerCase().includes(
                                                    search.toLowerCase()
                                                )
                                            ) {
                                                result = data;
                                            } else {
                                                if (materialDetails) {
                                                    materialDetails.filter(
                                                        (material) => {
                                                            if (
                                                                material.selectedMaterial.Material_Name.toLowerCase().includes(
                                                                    search.toLowerCase()
                                                                )
                                                            ) {
                                                                result = data;
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        });
                                    }
                                    if (result) return result;
                                }
                            })
                            .map((registeredHub, index) => {
                                //#region Geting servicelist of current hub
                                var materialList = [];
                                var materialExist = false;
                                serviceList.forEach((service) => {
                                    if (
                                        registeredHub.Manufacturer_ID ===
                                        service.Manufacturer_ID
                                    ) {
                                        materials = materials.concat(
                                            JSON.parse(service.Material_Name)
                                        );
                                        console.log('mm', materials);
                                    }
                                });

                                return (
                                    <div key={index}>
                                        {console.log('material', materials)}
                                        <ManufacturingHubListView
                                            key={registeredHub.ID}
                                            registeredHub={registeredHub}
                                            serviceList={serviceList}
                                            materialList={materials}
                                            index={index}
                                            readMore={this.onClickReadMore}
                                        />
                                        {(materials = [])}
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default withRouter(ManufacturingHubsView);
