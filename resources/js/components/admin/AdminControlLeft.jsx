import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DisplayPicture from '../reuseable/DisplayPicture';
import LoadingBtn from '../reuseable/LoadingBtn';

const ControlLeft = (props) => {
    const {
        context, authUser, header, previewable,
        handleUploadsDP, displayImgClicke,
        adminDpUploading, color, bgc, activeClass
    } = props;

    const authUserLoaded = authUser.hasOwnProperty('id');

    const handleFile = (e) => {
        if (handleUploadsDP) {
            handleUploadsDP(e);
        }
    };
    const handleDpClick = () => {
        if (displayImgClicke) {
            displayImgClicke();
        }
    };
    return (
        <React.Fragment>
            <AdminControl
                windowWidth={ context.windowWidth }
                color={ color }
                bgc={ bgc }
                className="admin-controls sticky"
            >
                <div className="sticky">
                    <div className={ `admin-cntrls-header` }>
                        <span>{ header }</span>
                    </div>
                    <div className="admin-dp"
                        style={ { position: "relative" } }
                    >
                        <DisplayPicture
                            previewable={ previewable }
                            imgTemplate={ context.imgTemplate } //temp image 
                            userObj={ authUser } //user details
                            imgClick={ handleDpClick } //fn to run on img click
                            handleFile={ handleFile }//handle file
                            uploading={ adminDpUploading } //boolean. true when uploading
                        />
                    </div>
                    <div style={ { color: color, textAlign: "center", backgroundColor: "white", border: "1px solid silver" } }>
                        <strong>{
                            authUserLoaded ? `${authUser.first_name} ${authUser.last_name}` :
                                <LoadingBtn text={ "" } lineHeight={ "unset" }
                                    fontSize={ "small" } fontWeight={ 400 } />
                        }</strong>
                    </div>
                    <div className="admin-cntrl-menu">
                        <Link
                            to={ `#` }
                            className={ activeClass === "dashboard" ? "active" : "" }
                        >
                            <span>Dashboard</span>
                        </Link>
                    </div>
                    <hr style={ {
                        width: "100%",
                        borderTop: "1px solid rgb(107, 117, 125)"
                    } } />
                    <div style={ { color: "navy", textAlign: "center", backgroundColor: "white" } }>
                        <a href={ `${location.origin}/vc/logout` }>Logout</a>
                    </div>
                </div>
            </AdminControl>
        </React.Fragment>
    );
};

export default ControlLeft;
export const AdminControl = styled.div`
    background: white;
    .sticky{
        display: grid; 
        grid-gap: 10px;
        .admin-cntrls-header{
            font-weight: bolder;
            font-size: ${props => props.windowWidth <= 680 ? "" : "20px"};
            text-align: center;
            color: #f8f9fa;
            background-color: ${props => props.bgc};
        }
        .admin-dp{
            display:grid;
            background-color: white;
            img{
                justify-self: center;
                width: 20vh;
                border-radius: 50%;
                height: 20vh;
                max-width: 100%;
            }
        }
        .admin-cntrl-menu{
            display: grid;
            grid-gap: 5px;
            padding: 0 5px;
            background-color: white;
        }
    }
    a{
        position: relative;
        background: white;
        font-size: ${props => props.windowWidth < 400 ? "smaller"
        : props.windowWidth < 768 ? "medium"
            : ""};
        padding: 0px 0px 0px 5px;
        font-family: serif; 
        text-decoration: unset;
        color:  ${props => props.color};
        &:hover{
            background-color: silver;
            color: #060606;
        }
        &.active {
            background: ${props => props.bgc};
            color: #ffffff;
            text-align: center;
            font-weight: bold;
        }
        .unread{
            position: absolute;
            top: 0;
            right: 0;
            border-radius: 50%;
            height: 15px;
            width: 15px;
            display: grid;
            align-content: center;
            justify-content: center;
            font-size: smaller;
            color: white;
            background: red;
        }
    }
`;