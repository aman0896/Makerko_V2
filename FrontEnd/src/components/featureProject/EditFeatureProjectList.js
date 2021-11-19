import React from 'react';
import '../main/style.css';
import { useState, useEffect } from 'react';
import './feature.css';
import { useHistory, useLocation } from 'react-router-dom';
import '../form/registrationPage.css';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import ReactHtmlParser from 'react-html-parser';
import { GetCookiesInfo } from '../global/GlobalFunction';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalDelete from './ModalDelete';
import Footer from '../main/footer';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Sidetab from '../main/sidetab';
import { File_Server } from '../common/Link';

function EditFeatureProjectList(props) {
    const [featureProject, setfeatureProject] = useState([]);
    const [search, setsearch] = useState();
    const { customerID } = GetCookiesInfo();
    const [filteredData, setfilteredData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [ProjectID, setProjectID] = useState();

    var dateObj;
    var dateString;
    var projectList;
    var files;
    const history = useHistory();

    var filterProjectList;
    useEffect(async () => {
        const info = await GetCookiesInfo().then((response) => {
            if (response.data) {
                return response.data;
            }
        });
        console.log('info', info);
        axios.get(`${window.host}/feature-project`).then((response) => {
            if (response.data) {
                console.log(response.data);
                projectList = response.data;
                console.log(projectList);
                filterProjectList = projectList.filter(
                    (data) => data.Customer_ID == info.uid
                );
                console.log(filterProjectList);
                setfeatureProject(filterProjectList);
            }
        });
    }, []);
    const onClickReadMore = (ID, title) => {
        const { match } = props;
        const name = title;
        const id = ID;
        console.log(name, id, match);
        window.open(`edit-projectlist/${id}/${name}`, '_blank');
    };

    const searchSpace = (event) => {
        let keyword = event.target.value;
        setsearch(keyword);
    };

    const onClickDelete = (Project_ID) => {
        const filteredData = featureProject.filter((data) => {
            if (data.Project_ID !== Project_ID) {
                console.log('filtered');
                return data;
            }
        });

        console.log(filteredData);

        console.log('delete');
        setfilteredData(filteredData);
        setShowModal(true);
        setProjectID(Project_ID);
    };
    const onClickEdit = (Project_ID) => {
        console.log('edit');

        history.push({ pathname: `/${Project_ID}/edit-project` });
    };
    const dropzoneHandleCallback = (childData) => {
        setfeatureProject(childData);
    };

    var list = featureProject
        .filter((data) => {
            if (search == null) return data;
            else if (
                data.Material.toLowerCase().includes(search.toLowerCase()) ||
                data.Fabrication_Process.toLowerCase().includes(
                    search.toLowerCase()
                ) ||
                data.Title.toLowerCase().includes(search.toLowerCase())
            ) {
                console.log(data);
                return data;
            }
        })
        .map((project, index) => {
            if (project.Files) {
                files = JSON.parse(project.Image);
                console.log(files);
            }

            return (
                <div
                    className="col-xs p-3"
                    target="_blank"
                    key={project.Project_ID}
                >
                    <div
                        className="card card-list "
                        style={{
                            width: '300px',
                            backgroundColor: ' #5044FD',
                            height: '460px',
                            borderRadius: '5px',
                            color: 'white',
                        }}
                    >
                        <div className="m-0 p-0">
                            <img
                                className="m-0 p-0"
                                src={`${File_Server}${files.filePath}`}
                                alt={files.fileName}
                                style={{
                                    width: '100%',
                                    height: '180px',
                                    // objectFit: "cover",
                                    borderTopLeftRadius: '5px',
                                }}
                            />
                        </div>
                        <div
                            className="p-2"
                            // style={{
                            //     maxHeight: '220px',
                            //     overflow: 'hidden',
                            //     textOverflow: 'ellipsis',
                            // }}
                        >
                            <div className="row m-auto">
                                <div
                                    className="col-10 p-0 m-0 card-title body-text pr-3"
                                    style={{ fontSize: 20 }}
                                >
                                    {project.Title}
                                </div>
                                <div
                                    className="col-2 p-0 m-0"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Edit"
                                        onClick={() =>
                                            onClickEdit(project.Project_ID)
                                        }
                                    >
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            size="sm"
                                        />
                                    </span>
                                    <span
                                        className="ml-3 text-danger"
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title="Delete"
                                        onClick={() =>
                                            onClickDelete(project.Project_ID)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrashAlt}
                                            size="sm"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="email">
                                {' '}
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    style={{ marginRight: '5px' }}
                                    size="sm"
                                />
                                {project.Email}
                            </div>
                            <div className="date">
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    style={{ marginRight: '5px' }}
                                    size="sm"
                                />
                                {
                                    ((dateObj = new Date(project.Date)),
                                    (dateString = dateObj.toLocaleDateString()))
                                }
                            </div>
                            <div className="hr-line" />
                            <div className="body-view">
                                <div className="sub-title">Process:</div>
                                <div className="body-text">
                                    {project.Fabrication_Process}
                                </div>
                                <div className="sub-title">Material:</div>
                                <div className="material-title">
                                    <div className="body-text">
                                        {project.Material}
                                    </div>
                                </div>
                                <div className="sub-title">Summary:</div>
                                <div className="body-summary">
                                    {ReactHtmlParser(project.Summary)}
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    position: 'absolute',
                                    alignItems: 'center',
                                    bottom: 0,

                                    cursor: 'pointer',
                                    marginRight: '1rem',
                                }}
                                onClick={() =>
                                    onClickReadMore(
                                        project.Project_ID,
                                        project.Title
                                    )
                                }
                            >
                                <span id="readmore">{'Read More'}</span>
                                <span className="mt-1 ml-1">
                                    {' '}
                                    <i className="fas fa-angle-double-right fa-1x"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

    return (
        <div>
            <div className="row container-fluid m-auto">
                <div className="col-lg-2">
                    <Sidetab />
                </div>
                <div
                    className="col-lg d-flex justify-content-start align-items-start flex-column"
                    style={{
                        paddingBottom: '80px',
                        paddingTop: '80px',
                    }}
                >
                    <div className="row w-100">
                        <div
                            className="col font-weight-bold "
                            style={{
                                fontSize: '24px',
                                color: '#5044fd',
                            }}
                        >
                            My Projects
                        </div>
                        <div className="col">
                            <div
                                className=""
                                style={{
                                    marginBottom: '20px',
                                }}
                            >
                                <div id="searchbar">
                                    <input
                                        className="form-control"
                                        type="text"
                                        title="Search"
                                        placeholder="Search by date, process, material"
                                        onChange={(e) => searchSpace(e)}
                                        style={{ paddingRight: '60px' }}
                                    />{' '}
                                    <i id="search" className="fa fa-search"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-2">{list}</div>{' '}
                    {list.length == 0 && (
                        <div className="container pt-5 mt-5">
                            <h4 className="text-secondary d-flex justify-content-center align-items-center">
                                NO PROJECT FOUND
                            </h4>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <ModalDelete
                showModal={showModal}
                handleClose={() => {
                    setShowModal(false);
                }}
                Project_ID={ProjectID}
                parentCallback={dropzoneHandleCallback}
                filteredData={filteredData}
            />
        </div>
    );
}

export default EditFeatureProjectList;
