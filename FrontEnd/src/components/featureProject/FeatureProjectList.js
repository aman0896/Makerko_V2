import React from 'react';
import '../main/style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './feature.css';
import ReactHtmlParser from 'react-html-parser';
import '../global/card.css';
import { useHistory } from 'react-router';
import Footer from '../main/footer';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidetab from '../main/sidetab';
import { File_Server } from '../common/Link';

function FeatureProjectList(props) {
    const [featureProject, setfeatureProject] = useState([]);
    const [search, setsearch] = useState();
    var dateObj;
    var dateString;
    const [ID, setID] = useState();

    useEffect(() => {
        axios.get(`${window.host}/feature-project`).then((response) => {
            if (response.data) {
                console.log(response.data);
                setfeatureProject(response.data);
            }
        });
    }, []);

    const onClickReadMore = (ID, title) => {
        setID(ID);
        //setSelected(true);
        const { match } = props;
        const name = title;
        const id = ID;
        console.log(`${match.path}/${id}/${name}`);
        // window.location.href = `${match.path}/${id}/${name}`;
        // history.push(`/feature-project/${id}/${name}`);
        window.open(`/feature-project/${id}/${name}`, '_blank');
    };

    const searchSpace = (event) => {
        let keyword = event.target.value;
        setsearch(keyword);
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
                var files = JSON.parse(project.Image);
                var ImageFileName = files.fileName;
                var ImageFilePath = files.filePath;
            }

            return (
                <div
                    className="col-xs p-3"
                    target="_blank"
                    key={project.Project_ID}
                >
                    <div
                        className="card card-list"
                        style={{
                            width: '270px',
                            height: '460px',
                            borderRadius: '5px',
                            backgroundColor: ' #5044FD',
                        }}
                        onClick={() =>
                            onClickReadMore(project.Project_ID, project.Title)
                        }
                    >
                        <img
                            className="card-img-top"
                            src={`${File_Server}${ImageFilePath}`}
                            alt={ImageFileName}
                            style={{
                                width: '100%',
                                height: '180px',
                                //objectFit: "cover",
                                borderTopLeftRadius: '5px',
                            }}
                        />
                        <div
                            className="p-2"
                            // style={{
                            //     maxHeight: '250px',
                            //     overflow: 'hidden',
                            //     textOverflow: 'ellipsis',
                            //     whiteSpace: 'nowrap',
                            // }}
                        >
                            <div className="card-title">{project.Title}</div>
                            <div className="email">
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
                                <div className="body-text mb-3">
                                    {project.Fabrication_Process}
                                </div>

                                <div className="sub-title">Material:</div>
                                <div className="material-title mb-3">
                                    <div className="body-text">
                                        {project.Material}
                                    </div>
                                </div>
                                <div className="sub-title">Summary:</div>
                                <div className="body-summary ">
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
                                    <i className="fas fa-angle-double-right fa-1x text-white"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

    return (
        <div>
            <div
                className=""
                style={{
                    paddingTop: '20px',
                    paddingBottom: '20px',
                }}
            >
                <div className="container">
                    <div className="row m-auto">
                        <div
                            className="col font-weight-bold "
                            style={{
                                fontSize: '24px',
                                marginTop: '60px',
                            }}
                        >
                            Feature Projects
                        </div>
                        <div className="col">
                            <div
                                className=" d-flex justify-content-end"
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
                                        placeholder="Search by date, process, material"
                                        onChange={(e) => searchSpace(e)}
                                        style={{ paddingRight: '60px' }}
                                    />{' '}
                                    <i id="search" className="fa fa-search"></i>
                                </div>
                            </div>
                        </div>{' '}
                    </div>

                    <div className="">
                        <div className="row pt-2 feature">{list}</div>
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
            </div>
        </div>
    );
}

export default FeatureProjectList;
