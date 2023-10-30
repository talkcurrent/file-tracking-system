import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import ExpressFile from '../includes/ExpressFile';
import File from '../includes/File';
import { AllContext } from '../index/AllContext';
import Dialog from '../reuseable/Dialog';
import Loading from '../reuseable/Loading';

const Dashboard = (props) => {
    const context = useContext(AllContext);
    const {
        handleResetField, alterStateProps, authUser, getFiles, allFiles,
        forwardedFilesReady,
        gettingForwardedFiles,
        receivedFilesReady,
        gettingReceivedFiles,
        getReceivedFiles, getForwardedFiles,
        forwardedFiles, receivedFiles,
        staff_count, file_count, archive_count
    } = context;

    const [forwardingFileModal, setforwardingFileModal] = useState(false);

    const [state, setstate] = useState({
        updateAttempting: false, updateFailed: "",
        forwardingFile: true, forwardingFileFailed: "",
    });

    useEffect(() => {
        if (!allFiles.length) {
            getFiles();
        } else { alterStateProps("filesReady", true); }
        getReceivedFiles('staff');
        getForwardedFiles('staff');
    }, []);

    useEffect(() => {
        if (state.updateFailed === false) {
            closeDialog();
        }
        return () => { };
    }, [state.updateFailed]);

    const closeDialog = () => {
        setaction("");
        setdialog(false);
    };


    const handlForwardingModal = () => {
        setforwardingFileModal(!forwardingFileModal);
    };

    const handleForward = async (staffId, fileId, model) => {
        const data = {
            staffId: staffId,
            fileId: fileId,
            model: model,
            guard: context.isAdmin ? "admin" : "staff",
        };
        handlForwardingModal();
        setstate({ ...state, forwardingFile: true, forwardingFileFailed: "" });
        const response = await useFetch('/forward_file', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            getReceivedFiles();
            getForwardedFiles();
            setstate({
                ...state,
                forwardingFile: false, forwardingFileFailed: false,
                message: "File succesfully forwarded!"
            });
        } else {
            setstate({
                ...state, forwardingFile: false, forwardingFileFailed: true,
                message: "Something not right. Please try again later"
            });
        }
    };

    return (
        <React.Fragment>
            <DashboardStyle windowWidth={ context.windowWidth }>
                {/* <div className="dashboard-stats">
                    { context.windowWidth <= 520 ?
                        <div className="dashboard-stats-head">
                            <span>Admin Controls</span>
                        </div>
                        : ""
                    }
                </div> */}
                <div className="dashboard-stats">
                    <Column
                        color={ "#5a6269" }
                        bgc={ "rgb(245 245 245)" }
                        fontSize={ useViewPort(["18px", "18px", "20px", "25px"]) }
                        iconClass={ "" }
                        header={ "" }
                    >
                        <div className="stat-card">
                            <h3>{ staff_count }</h3>
                            <div><i className={ "fas fa-users" }></i><span>{ " " }Total staffs</span></div>
                        </div>
                        <div className="stat-card">
                            <h3>{ file_count }</h3>
                            <div><i className={ "fas fa-paperclip" }></i><span>{ " " }Total files</span></div>
                        </div>
                        <div className="stat-card">
                            <h3>{ archive_count }</h3>
                            <div><i className={ "fas fa-plane-departure" }></i><span>{ " " }Archive files</span></div>
                        </div>
                    </Column>
                    <Column
                        color={ "#5a6269" }
                        bgc={ "rgb(245 245 245)" }
                        fontSize={ useViewPort(["18px", "18px", "20px", "25px"]) }
                        iconClass={ "fas fa-external-link-alt" }
                        header={ "Shortcuts" }
                    >
                        <ColumnCard
                            color={ "#296dad" }
                            bgc={ "white" }
                            fontSize={ useViewPort(["18px", "18px", "20px", "x-large"]) }
                            textShadow={ "1px 1px 2px whitesmoke" }
                            labelShadow={ "1px 1px 2px whitesmoke" }
                            iconClass={ "" }
                            iconColor={ "" }
                            viewable={ false }
                            cardLink={ " " }
                            cardLabel={ "" }
                            labelColor={ "#174320" }
                            cardCount={ "" }
                        >
                            <div className="shortcut-card">
                                <Link to={ "/profile" }>
                                    <div className={ "shortcut" }>
                                        <i className="fas fa-user"></i>
                                        <span>Profile</span>
                                    </div>
                                </Link>
                                <Link to={ "/staffs" }>
                                    <div className={ "shortcut" }>
                                        <i className="fas fa-users"></i>
                                        <div>Staffs</div>
                                    </div>
                                </Link>
                                <Link to={ "/files" }>
                                    <div className={ "shortcut" }>
                                        <i className="fas fa-paperclip"></i>
                                        <div>Files</div>
                                    </div>
                                </Link>
                                <Link to={ "/archives" }>
                                    <div className={ "shortcut" }>
                                        <i className="far fa-file-archive"></i>
                                        <div>Archives</div>
                                    </div>
                                </Link>
                                <Link to={ "/express" }>
                                    <div className={ "shortcut" }>
                                        <i className="fas fa-plane-departure"></i>
                                        <div>Express</div>
                                    </div>
                                </Link>
                                <Link to={ "/faculties" }>
                                    <div className={ "shortcut" }>
                                        <i className="fas fa-home"></i>
                                        <div>Faculties</div>
                                    </div>
                                </Link>
                                <Link to={ "/departments" }>
                                    <div className={ "shortcut" }>
                                        <i className="fas fa-store"></i>
                                        <div>Departments</div>
                                    </div>
                                </Link>
                            </div>
                        </ColumnCard>
                    </Column>
                    <Column
                        color={ "#5a6269" }
                        bgc={ "rgb(245 245 245)" }
                        fontSize={ useViewPort(["18px", "18px", "20px", "25px"]) }
                        iconClass={ "fas fa-reply" }
                        header={ "Received files" }
                    >
                        <ColumnCard
                            color={ "#296dad" }
                            bgc={ "white" }
                            fontSize={ useViewPort(["18px", "18px", "20px", "x-large"]) }
                            textShadow={ "1px 1px 2px whitesmoke" }
                            labelShadow={ "1px 1px 2px whitesmoke" }
                            iconClass={ "" }
                            iconColor={ "" }
                            viewable={ false }
                            cardLink={ " " }
                            cardLabel={ "" }
                            labelColor={ "#174320" }
                            cardCount={ "" }
                        >
                            {
                                receivedFiles.length ?
                                    <React.Fragment>
                                        <div className={ "file-header" }>
                                            <div>S/N</div>
                                            <div>File title</div>
                                            <div>Created by</div>
                                            <div>Action buttons</div>
                                        </div>
                                        <div className="file-container">
                                            { receivedFiles.map((file, key) => {
                                                return (
                                                    <React.Fragment key={ key }>
                                                        <ExpressFile
                                                            context={ context }
                                                            file={ file }
                                                            handleForward={ handleForward }
                                                            index={ key }
                                                        />
                                                    </React.Fragment>
                                                );
                                            }) }
                                        </div>
                                    </React.Fragment>
                                    : gettingReceivedFiles ?
                                        <Loading
                                            fixed={ false }
                                            loaderPos={ `30%` }
                                            borderRadius={ `3px / 6px` }
                                            contBorderRadius={ "10px" }
                                            transformOrigin={ `1px 10px` }
                                            width={ `1px` }
                                            height={ `6px` }
                                            background={ false }
                                            loaderColor={ "#6b757d" }
                                        />
                                        :
                                        <div style={ { textAlign: "center" } }>No file found!</div>

                            }
                        </ColumnCard>
                    </Column>
                    <Column
                        color={ "#5a6269" }
                        bgc={ "rgb(245 245 245)" }
                        fontSize={ useViewPort(["18px", "18px", "20px", "25px"]) }
                        iconClass={ "fas fa-share" }
                        header={ "Forwarded files" }
                    >
                        <ColumnCard
                            color={ "#296dad" }
                            bgc={ "white" }
                            fontSize={ useViewPort(["18px", "18px", "20px", "x-large"]) }
                            textShadow={ "1px 1px 2px whitesmoke" }
                            labelShadow={ "1px 1px 2px whitesmoke" }
                            iconClass={ "" }
                            iconColor={ "" }
                            viewable={ false }
                            cardLink={ " " }
                            cardLabel={ "" }
                            labelColor={ "#174320" }
                            cardCount={ "" }
                        >
                            {
                                forwardedFiles.length ?
                                    <React.Fragment>
                                        <div className="file-container">
                                            { forwardedFiles.map((file, key) => {
                                                return (
                                                    <React.Fragment key={ key }>
                                                        <File
                                                            context={ context }
                                                            file={ file }
                                                            handleForward={ handleForward }
                                                            index={ key }
                                                        />
                                                    </React.Fragment>
                                                );
                                            }) }
                                        </div>
                                    </React.Fragment>
                                    : gettingForwardedFiles ?
                                        <Loading
                                            fixed={ false }
                                            loaderPos={ `30%` }
                                            borderRadius={ `3px / 6px` }
                                            contBorderRadius={ "10px" }
                                            transformOrigin={ `1px 10px` }
                                            width={ `1px` }
                                            height={ `6px` }
                                            background={ false }
                                            loaderColor={ "#6b757d" }
                                        />
                                        :
                                        <div style={ { textAlign: "center" } }>No file found!</div>

                            }
                        </ColumnCard>
                    </Column>
                </div>
            </DashboardStyle>
            {forwardingFileModal ?
                <Dialog
                    // dialogMounted={ dialogMounted }
                    handleClose={ handlForwardingModal }
                >
                    <div style={ { position: "relative" } }>
                        { state.forwardingFile ?
                            <Loading
                                fixed={ false }
                                loaderPos={ `30%` }
                                borderRadius={ `3px / 6px` }
                                contBorderRadius={ "10px" }
                                transformOrigin={ `1px 10px` }
                                width={ `1px` }
                                height={ `6px` }
                                background={ false }
                                loaderColor={ "white" }
                            />
                            : !state.forwardingFileFailed ?
                                <span
                                    style={ {
                                        color: 'green',
                                        background: "whitesmoke",
                                        borderRadius: "5px",
                                        padding: "1rem"
                                    } }>Operation successful</span>
                                :
                                <span
                                    style={ {
                                        color: 'red',
                                        background: "whitesmoke",
                                        borderRadius: "5px",
                                        padding: "1rem"
                                    } }>Something went wrong</span>
                        }
                    </div>
                </Dialog>
                : ""
            }
        </React.Fragment>
    );

};
export default Dashboard;
export const DashboardStyle = styled.div`
    padding: ${props =>
    (props.windowWidth <= 520 ? "0px 0px 20px 10px" :
        props.windowWidth <= 800 ? "0px 0px 20px 10px" : "0px 0px 20px 10px")
    };
    .dashboard-stats{
        display:grid;
        gap: 10px;
        .dashboard-stats-head{
            font-weight: bolder;
            font-size: 20px;
            text-align: center;
            color: white; 
            background-color: #3f8eab;
        }
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    .view-btn{
        border: 1px solid #3f8eab;
        padding: 0 5px;
        border-radius: 30px;
        color: #3f8eab;
        cursor: pointer;
        justify-self: end;
        line-height: 1;
    }
    .content-inner{
        display: grid;
        gap: 3rem;
        color: black;
        text-align: center;
    }

    .stat-card{
        padding: 0 5px;
    }
    .stat-card:nth-child(1){
        background: rgb(255 95 69);
    }
    .stat-card:nth-child(2){
        background: rgb(0 173 90);
    }
    .stat-card:nth-child(3){
        background: rgb(0 191 243);
    }
    .shortcut-card{
        display:grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        grid-auto-rows: minmax(auto,1fr);
        .shortcut{
            display:grid;
            gap: 5px;
            align-items: center;
            justify-items: center;
            background: #f8f9fa;
            padding: 10px 0;
            border-radius: 5px;
            color: #296dad;
        }
    }

`;