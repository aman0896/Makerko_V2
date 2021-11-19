import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { rgbToHex } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { File_Server } from '../common/Link';
import { GetRatings } from '../starrating/RestApi';
import StarRating, { StarRatingAverage } from '../starrating/StarRating';
import './card.css';

const CardView = (props) => {
    const [shadow, setShadow] = useState('1px 2px 5px	#A9A9A9');
    const [services, setServices] = useState();

    const onMouseEnter = () => {
        setShadow('1px 3px 20px	black');
        //setColor("rgb(240,240,240)");
    };
    const onMouseLeave = () => {
        setShadow('1px 2px 5px	black');
        //setColor("");
    };

    const onCardSelect = (index, currentHub) => {
        props.setSelected(index);
        props.getSelectedHub(currentHub);
    };

    const GetLogo = (Logo) => {
        if (Logo) {
            const { fileName, filePath } = JSON.parse(Logo);
            return filePath;
        }
    };

    useEffect(() => {
        axios
            .post(`${window.host}/get-hub-services`, {
                hubID: props.currentHub.Manufacturer_ID,
            })
            .then((response) => {
                if (response) {
                    var hubService = response.data;
                    setServices(hubService);
                }
            });
    }, [props]);

    const GetHubServices = (hubID) => {
        if (services) {
            var service = services.map((service) => {
                const { Name, Manufacturer_ID } = service;
                if (hubID == Manufacturer_ID) {
                    return Name + ', ';
                }
            });
            return <span>{service}</span>;
        }
    };

    return (
        <div>
            <Card
                onClick={() =>
                    onCardSelect(props.currentIndex, props.currentHub)
                }
                className="ml-2"
                style={{
                    marginLeft: '20px',
                    //fontFamily: 'Roboto',
                    color: 'white',
                    boxShadow: shadow,
                    height: '320px',
                    width: '230px',
                    backgroundColor: ' #5044FD',
                    cursor: 'pointer',
                    borderColor: props.selected ? '#39ff14' : '',
                    borderWidth: props.selected ? '3px' : '',
                }}
                onMouseEnter={() => onMouseEnter()}
                onMouseLeave={() => onMouseLeave()}
            >
                <Card.Img
                    variant="top"
                    src={GetLogo(props.currentHub.Logo)}
                    style={{
                        width: '100%',
                        height: '140px',
                        objectFit: 'cover',
                    }}
                />
                <div className="d-inline-block p-2" style={{ height: '500px' }}>
                    <Card.Title className=" mb-4 text-white">
                        {props.currentHub.Company_Name}
                    </Card.Title>
                    <Card.Subtitle
                        style={{ fontSize: '12px', marginBottom: '5pt' }}
                    >
                        {props.currentHub.Address}
                    </Card.Subtitle>
                    <Card.Text style={{ fontSize: '15px' }}>
                        <span>Services</span>
                        <div style={{ fontSize: '12px' }}>
                            {GetHubServices(props.currentHub.Manufacturer_ID)}
                        </div>
                    </Card.Text>
                </div>
                <span className=" m-1 d-flex justify-content-center">
                    <button
                        className="btn btn-sm "
                        style={{ backgroundColor: 'white', color: 'black' }}
                        onClick={() =>
                            props.visitProfile(props.currentHub, services)
                        }
                    >
                        Visit Profile
                    </button>
                </span>
            </Card>
        </div>
    );
};

export default CardView;

export const ManufacturingHubListView = (props) => {
    const [shadow, setShadow] = useState('1px 2px 5px	#A9A9A9');
    const [flag, setFlag] = useState(false);
    const [averageRating, setAverageRating] = useState();

    const [ID, setID] = useState();
    var services = [];
    var hubName = '';
    var hubID = '';
    var email = '';
    var briefDetail = '';
    var manufacturingServices = '';
    var materialList = '';
    var FileName = '';
    var FilePath = '';
    var address = '';
    var registeredDate = '';
    if (props.registeredHub && props.serviceList && props.materialList) {
        var files = JSON.parse(props.registeredHub.Logo);
        if (files) {
            FileName = files.fileName;
            FilePath = files.filePath;
        }

        hubID = props.registeredHub.Manufacturer_ID;
        hubName = props.registeredHub.Name;
        email = props.registeredHub.Email;
        address = props.registeredHub.Address;
        registeredDate = props.registeredHub.Date;
        //#region get_service_list
        props.serviceList.forEach((service) => {
            if (hubID == service.Manufacturer_ID) {
                services = services.concat(service);
                manufacturingServices += service.Name + ',' + ' ';
            }
        });
        var sn = manufacturingServices.lastIndexOf(',');
        manufacturingServices = manufacturingServices.substring(0, sn);
        //#endregion

        //#region get_material_list
        props.materialList.map((materialDetails) => {
            materialList +=
                materialDetails.selectedMaterial.Material_Name + ',' + ' ';
        });

        var mn = materialList.lastIndexOf(',');

        materialList = materialList.substring(0, mn);
        //#endregion

        briefDetail = props.registeredHub.Brief_Description;
    }
    //#endregion
    if (props.registeredHub) {
        hubName = props.registeredHub.Company_Name;
    }
    var dateObj;
    var dateString;
    //console.log(props.registeredHub.Logo);
    // var files = JSON.parse(props.registeredHub.Logo);
    // var FileName = files[0].fileName;
    // var FilePath = files[0].filePath;

    const onMouseEnter = () => {
        setShadow('10px 3px 20px rgba(19, 15, 15, 0.6)');
        setFlag(true);
    };
    const onMouseLeave = () => {
        //setID(0);
        setShadow('1px 2px 5px	#A9A9A9');
        setFlag(false);
    };

    useEffect(() => {
        console.log(props);
        GetRatings('', props.registeredHub.Manufacturer_ID, (err, result) => {
            if (result) {
                const { averageRating } = result;
                setAverageRating(averageRating);
            }
        });
    }, []);

    return (
        <div>
            {props.registeredHub && (
                <div
                    className="col-xs p-2"
                    key={props.registeredHub.Manufacturer_ID}
                >
                    <div
                        className="card card-list"
                        style={{
                            width: '280px',
                            height: '440px',
                            borderRadius: '5px',

                            backgroundColor: ' #5044FD',
                        }}
                        onClick={() =>
                            props.readMore(props.registeredHub, services)
                        }
                    >
                        <img
                            className="card-img-top"
                            src={`${File_Server}${FilePath}`}
                            alt={FileName}
                            style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover',
                                borderTopLeftRadius: '5px',
                            }}
                        />
                        <div
                            className="p-2"
                            // style={{
                            //     maxHeight: '250px',
                            //     overflow: 'hidden',
                            //     textOverflow: 'ellipsis',
                            // }}
                        >
                            <div className="card-title">{hubName}</div>
                            <div className="email">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    style={{ marginRight: '5px' }}
                                    size="sm"
                                />
                                {email}
                            </div>
                            <div className="date">
                                <span>
                                    <FontAwesomeIcon
                                        icon={faCalendar}
                                        style={{ marginRight: '5px' }}
                                        size="sm"
                                    />
                                </span>
                                {registeredDate}
                            </div>
                            <div className="address">
                                <span>
                                    <FontAwesomeIcon
                                        icon={faMapMarkerAlt}
                                        style={{ marginRight: '5px' }}
                                        size="sm"
                                    />
                                </span>
                                {address}
                            </div>
                            <div className="hr-line" />
                            <div className="body-view">
                                <div className="sub-title">Process:</div>
                                <div className="body-text">
                                    {manufacturingServices}
                                </div>
                                <div className="sub-title">Material:</div>
                                <div className="material-title">
                                    <div className="body-text">
                                        {materialList}
                                    </div>
                                </div>
                                <div className="sub-title">
                                    Brief introduction of the company:
                                </div>
                                <div className="body-summary">
                                    {briefDetail}
                                </div>
                            </div>
                        </div>
                        <div
                            className="p-2 readmore-div"
                            onClick={() =>
                                props.readMore(props.registeredHub, services)
                            }
                        >
                            <span
                                id="readmore"
                                //className="text-primary"
                            >
                                {'Read More'}
                            </span>
                            <span className="mt-1 ml-1">
                                {' '}
                                <i className="fas fa-angle-double-right fa-1x"></i>
                            </span>
                        </div>
                        <div className="p-2 ratings-div">
                            <StarRatingAverage
                                averageRating={averageRating}
                                widgetDimensions="15px"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
