import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ToggleNav from '../includes/ToggleNav';
import { AdminContext } from '../index/AdminContext';
import LightBox from '../reuseable/LightBox';
import Loading from '../reuseable/Loading';
import AdminControlLeft from './AdminControlLeft';

const AppFormDetails = (props) => {
    const a_context = useContext(AdminContext);
    const { applications, windowWidth } = a_context;
    const [application, setapplication] = useState({});
    //light box
    const [preview, setpreview] = useState(false);
    const [imgSrc, setimgSrc] = useState("");
    const [imgAlt, setimgAlt] = useState("");

    const { id } = props.match.params;

    useEffect(() => {
        const selApplication = applications.find(app => app.id == id);
        if (selApplication) {
            setapplication(selApplication);
        }
        return () => { };
    }, []);
    const handleOpenPreview = (e) => {
        const imgSource = e.target.src;
        const imgAlternative = e.target.getAttribute("alt");
        setpreview(true);
        setimgSrc(imgSource);
        setimgAlt(imgAlternative);
    };
    const handleClosePreview = () => {
        setpreview(false);
    };

    const detailsLoaded = application.hasOwnProperty("id");
    const timeCreated = detailsLoaded ? new Date(`${application.created_at}`).toDateString() : "";
    return (
        <React.Fragment>
            <AppFormDetailsStyle windowWidth={ windowWidth }>
                { windowWidth > 600 ?
                    <AdminControlLeft activeClass="applications" />
                    : ""
                }
                <React.Fragment>
                    <div className={ "form" }>
                        <div className="form-update-header">
                            <strong style={ { display: "block", textAlign: "center" } }>{ `${application.firstname} Application` }</strong>
                        </div>
                        <div className="form-body">
                            <div className="preview-cont">
                                <div className="label-data">
                                    <div className="label"><strong>First Name</strong></div>
                                    <div className="data">{ application.firstname }</div>
                                </div>
                                <div className="label-data">
                                    <div className="label"><strong>Last Name</strong></div>
                                    <div className="data">{ application.lastname }</div>
                                </div>
                                <div className="label-data">
                                    <div className="label"><strong>Email</strong></div>
                                    <div className="data">{ application.email }</div>
                                </div>
                                <div className="label-data">
                                    <div className="label"><strong>Date Of Birth</strong></div>
                                    <div className="data">{ application.firstname }</div>
                                </div>
                                <div className="label-data">
                                    <div className="label"><strong>State</strong></div>
                                    <div className="data">{ application.state }</div>
                                </div>
                                <div className="label-data">
                                    <div className="label"><strong>City</strong></div>
                                    <div className="data">{ application.city }</div>
                                </div>
                                <div className="label-data">
                                    <div className="label"><strong>Street</strong></div>
                                    <div className="data">{ application.street }</div>
                                </div>
                                <div className="label-data">
                                    <div className="label"><strong>Zip Code</strong></div>
                                    <div className="data">{ application.zipcode }</div>
                                </div>
                                <div className="label-data">
                                    <div className="label"><strong>State Security Number</strong></div>
                                    <div className="data">{ application.ssn }</div>
                                </div>
                                <div className="label-data">
                                    <div className="label"><strong>Phone Number</strong></div>
                                    <div className="data">{ application.phone }</div>
                                </div>
                                <div><strong>Resumes</strong></div>
                                <div className="application-img">
                                    <img
                                        src={ `/storage/image/${application.resumes}` }
                                        alt={ "an image" }
                                        onClick={ e => handleOpenPreview(e) }
                                    />
                                </div>
                                <div><strong>Drivers License Front</strong></div>
                                <div className="application-img">
                                    <img
                                        src={ `/storage/image/${application.driverLicenseFront}` }
                                        alt={ "an image" }
                                        onClick={ e => handleOpenPreview(e) }
                                    />
                                </div>

                                <div><strong>Drivers License Back</strong></div>
                                <div className="application-img">
                                    <img
                                        src={ `/storage/image/${application.driverLicenseBack}` }
                                        alt={ "an image" }
                                        onClick={ e => handleOpenPreview(e) }
                                    />
                                </div>

                                <div className="label-data">
                                    <div className="label"><strong>Applied On</strong></div>
                                    <div className="data">{ timeCreated }</div>
                                </div>
                            </div>
                            { !detailsLoaded ?
                                <Loading
                                    fixed={ false }
                                    loaderPos={ `30%` }
                                    borderRadius={ `3px / 6px` }
                                    contBorderRadius={ "10px" }
                                    transformOrigin={ `1px 10px` }
                                    width={ `1px` }
                                    height={ `6px` }
                                    background={ true }
                                    loaderColor={ "#768999" }
                                />
                                : ""
                            }

                        </div>
                    </div>
                </React.Fragment>

            </AppFormDetailsStyle>
            { windowWidth < 600 ?
                <ToggleNav>
                    <AdminControlLeft activeClass="applications" />
                </ToggleNav>
                : "" }
            { preview ?
                <LightBox
                    handleClose={ handleClosePreview }
                    imageSrc={ imgSrc }
                    imageAlt={ imgAlt }
                />
                : "" }
        </React.Fragment>
    );
};

export default AppFormDetails;
const AppFormDetailsStyle = styled.div`
    display: grid;
    grid-gap: ${props => props.windowWidth >= 800 ? "10px" : "2px"};
    grid-template-columns: ${props =>
        props.windowWidth <= 600 ? "100%" : "25% 75%"};
    width: ${props => props.windowWidth >= 800 ? "85%" : "99%"};
    margin-top: 5px;
    margin-right: auto;
    margin-left: auto;
    align-items: stretch;
    .form{
        padding: 10px 5px 30px 5px;
        .form-update-header{
            padding: 3px;
            font-size: larger;
            margin-bottom: 15px;
            text-align: center;
            background: #e6e6e6;
            font-weight: bold;
            border-radius: 5px;
            position: sticky;
            top: 0;
            z-index: 2;
        }
        .form-body{
            display: grid;
            grid-gap: 13px;
            width: 95%;
            margin: 0 auto;
            position: relative;
            .form-subHead{
                font-weight: 700;
                border-bottom: 1px solid #e6e6e6;
            }
            .preview-cont{
                border: 1px solid #e6e6e6;
                background: #f8f9fa;
                .label-data{
                    display: grid;
                    grid-template-columns: 35% 65%;
                    line-height: 1.24;
                    padding-left: 3px;
                    .label{
                        color: #3f5c75;
                        padding: 4px 0;
                        strong{
                            font-weight: 300;
                        }
                    }
                    .data{
                        display: grid;
                        align-content: center;
                        font-size: small;
                        color: #3f5c75;
                        font-weight: 800;
                    }
                    &:nth-child(odd){
                        background: rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }
    }
    .application-img{
        display: grid;
        justify-items: center;
        img{
            height: 300px;
            width: 260px;
            object-fit: contain;
            border-radius: 10px;
            background: #b5b5b5;
        }
    }
`;