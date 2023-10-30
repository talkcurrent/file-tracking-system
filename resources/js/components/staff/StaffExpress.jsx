import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import ExpressFile from '../includes/ExpressFile';
import File from '../includes/File';
import StaffWebView from '../includes/StaffWebView';
import { AdminContext } from '../index/AdminContext';
import { AllContext } from '../index/AllContext';
import Loading from '../reuseable/Loading';

const StaffExpress = (props) => {
    const context = useContext(AllContext);
    const {
        handleResetField, authUser,
        forwardedFilesReady,
        gettingForwardedFiles,
        receivedFilesReady,
        gettingReceivedFiles, forwardedFiles, receivedFiles,
        getReceivedFiles, getForwardedFiles,
    } = context;

    const [state, setstate] = useState({
        forwardingFile: true, forwardingFileFailed: "",
    });

    useEffect(() => {
        const path_names = location.pathname.split('/');
        if (path_names.includes('super')) {
            context.handleAuthUser("admin");
        } else {
            context.handleAuthUser("staff");
        }
        getReceivedFiles("staff");
        getForwardedFiles("staff");
        return () => { };
    }, []);

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
        <StaffWebView
            view={ "express" }
            context={ context }
        >
            <ExpressStyle>
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
                                                        index={ key }
                                                        handleForward={ handleForward }
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
            </ExpressStyle>
        </StaffWebView>
    );
};

export default StaffExpress;
const ExpressStyle = styled.div`
    display: grid;
    gap: 6px;
    
`;