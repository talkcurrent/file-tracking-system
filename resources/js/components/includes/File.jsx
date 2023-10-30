import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import ActionBtn from '../reuseable/ActionBtn';
import EditableDiv from '../reuseable/EditableDiv';
import HorizontalUserCard from '../reuseable/HorizontalUserCard';
import IconToolTipBtn from '../reuseable/IconToolTipBtn';
import Loading from '../reuseable/Loading';
import Response from '../reuseable/Response';
import ScrollerX from '../reuseable/ScrollerX';
import SearchResult from '../reuseable/SearchResult';
import SQLDateToJSDate from '../reuseable/SQLDateToJSDate';
import TooltipContents from '../reuseable/TooltipContents';
import handleClick from '../reuseable/handleClick';
import TooltipBtn from '../reuseable/TooltipBtn';
import TrackLists from './TrackLists';
import Dialog from '../reuseable/Dialog';
import DialogContent from '../reuseable/DialogContent';

const File = (props) => {
    const { context, file, index, handleForward } = props;
    const [closetooltip, setclosetooltip] = useState(false);

    const closeTool = useRef(null);
    const [searchKeys, setsearchKeys] = useState("");
    const [searching, setsearching] = useState(false);
    const [staffs, setstaffs] = useState([]);
    const [state, setstate] = useState({
        deletingFile: false, deletingFileFailed: "", message: "",
        savingFile: true, savingFileFailed: "", searchResultReady: true,
    });
    const [isFileOpen, setisFileOpen] = useState(false);

    const dialogWidth = useViewPort(["100%", "90%;", "80%", "80%", "70%"]);
    const columnHeadFontSize = useViewPort(["18px", "18px", "20px", "25px"]);

    useEffect(() => {
        if (searchKeys != "" && !searching) {
            handleUserSearch(searchKeys);
        }
        return () => { };
    }, [searchKeys]);

    const handleOninput = (e) => {
        const target = e.target;
        const { textContent } = target;
        setsearchKeys(textContent);
    };

    useEffect(() => {
        if (closetooltip) {
            closeTool.current = setTimeout(() => {
                setclosetooltip(false);
            }, 200);
        }
        return () => { };
    }, [closetooltip]);

    const closeToolTip = () => {
        setclosetooltip(true);
    };

    const handleUserSearch = async () => {
        setsearching(true);
        setstate({ ...state, searchResultReady: false });

        const data = {
            searchKeys: searchKeys,
            guard: context.isAdmin ? "admin" : "staff",
        };
        const response = await useFetch('/searchStaffs', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            setstaffs(result);
            setsearching(false);
            setstate({ ...state, searchResultReady: true });
        } else {
            setsearching(false);
            setstate({ ...state, searchResultReady: true });
        };
    };

    const handleFileExpress = () => {
        context.getFileExpress(file.id);
    };

    const doubleClick = (target, params) => {
        const { id, model } = params;
        handleForward(id, file.id, model);
    };

    const handleDelete = async () => {
        const data = {
            id: file.id,
        };
        setstate({ ...state, deletingFile: true, deletingFileFailed: "", message: "" });
        const response = await useFetch('/delete_file', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            context.getFiles();
            closeToolTip();
            setstate({
                ...state,
                deletingFile: false, deletingFileFailed: false,
                message: "File Succesfully Deleted!"
            });
        } else {
            setstate({
                ...state, deletingFile: false, deletingFileFailed: true,
                message: "Something not right. Please try again later"
            });
        }
    };

    const handleOpenFile = () => {
        setisFileOpen(!isFileOpen);
    };

    const stylez = {
        display: "grid",
        gap: "3rem",
        color: "black",
    };

    return (
        <>
            <FileStyle  >
                <div
                    className="file-index file-col light-seperator"
                    style={ { width: "100%", textAlign: "center" } }
                >{ index + 1 }</div>
                <div
                    className="file-title file-col light-seperator"
                    style={ { width: "100%" } }
                >
                    <div className={ "icon-n-text" }>
                        <i className="fas fa-paperclip" style={ { color: "#a5abaf" } }></i>{ " " }
                        <ScrollerX>
                            <span>{ file.title }</span>
                        </ScrollerX>
                    </div>
                </div>
                <div
                    className="file-createdBy file-col light-seperator"
                    style={ { width: "100%", textAlign: "center", lineHeight: 1.3 } }
                >
                    <ScrollerX>
                        <span>{ file.creator.first_name }{ " " } { file.creator.last_name }</span>
                    </ScrollerX>
                    <small style={ { color: "#86919a", fontWeight: 100 } }>(Creator)</small>
                </div>
                <div className="file-fn file-col">
                    <ActionBtn
                        processing={ false }
                        progressText={ "" }
                        btnText={ "Open" }
                        btnClick={ () => handleOpenFile() }
                        justify={ "center" }
                        bgc={ "transparent" }
                        color={ "rgb(134, 145, 154)" }
                        width={ "100%" }
                        border={ "unset" }
                    />
                    <TooltipBtn
                        toolTip={ true } ancestor={ "react-house" }
                        class={ `tooltip-tracker-btn` }
                        fontSize={ "" }
                        tooltipBgc={ "white" }
                        textColor={ "#296dad" }
                        backgroundColor={ "transparent" }
                        btnText={
                            <>
                                <i className={ 'fas fa-search-location' }></i>
                                <span>{ " Tracker" }</span>
                            </>
                        }
                        context={ context }
                        tooltipMounted={ handleFileExpress }
                        border={ "unset" }
                        padding={ "0 4px" }
                        closeable={ true }
                    >
                        <TooltipContents
                            cardsBgc={ "white" }
                            width={ "300px" }
                            maxHeight={ "60vh" }
                            gtr={ "max-content auto" }
                            height={ "60vh" }
                            overflowY={ "hidden" }
                            padding={ "5px 5px 5px 5px" }
                            color={ "#5a6269" }
                        >
                            <div>
                                <h6 style={ { textAlign: "center" } }>FILE TRACKER</h6>
                                <div
                                    style={ { display: "grid", gridAutoFlow: "column", gap: "3px", gridTemplateColumns: "max-content", gridAutoFlow: "column" } }
                                >
                                    <strong>File name:</strong>
                                    <ScrollerX>{ file.title }</ScrollerX>
                                </div>
                                <hr style={ { margin: "0.5rem 0.5rem" } } />
                            </div>
                            <SearchResult
                                maxHeight={ "300px" }
                                overflowY={ "auto" }
                                gap={ "2px" }
                            >
                                <HorizontalUserCard
                                    cardBgc={ "whitesmoke" }
                                    cardElemBgc={ "whitesmoke" }
                                    gtc={ "40px auto" }
                                    cardImgUrl={ `/storage/image/${file.creator.profile.dp}` }
                                    fSize={ "" }
                                    handleClick={ () => { } }
                                    lHeight={ 1 }
                                    margin={ "0 10px" }
                                    bShadow={ "0px 0px 2px #296DBB" }
                                >
                                    <h5 style={ { color: "#296dad", margin: 0 } }>{ file.creator.first_name }{ ' ' }{ file.creator.last_name }{ ' ' }{ file.creator.other_name }</h5>
                                    <div>Created on:<strong>{ ` ${SQLDateToJSDate(file.creator.created_at, true)}` }</strong></div>
                                </HorizontalUserCard>
                                <i style={ { justifySelf: "center" } } className="fas fa-angle-double-down"></i>
                                <Response
                                    responsive={ true }
                                    windowWidth={ context.windowWidth }
                                    dataReady={ context.expressReady }
                                    datas={ context.fileExpress }
                                    height={ "50px" }
                                    gap={ "2px" }
                                    gettingData={ context.gettingExpress }
                                    noRecordText={ "This file has not left the creator's table" }
                                >
                                    { context.fileExpress.length ?
                                        context.fileExpress.map((express, key) => {
                                            var last = context.fileExpress[context.fileExpress.length - 1];
                                            return (
                                                <React.Fragment key={ key } >
                                                    <TrackLists express={ express } />
                                                    {
                                                        last.id != express.id ?
                                                            <i style={ { justifySelf: "center" } } className="fas fa-angle-double-down"></i>
                                                            :
                                                            ""
                                                    }
                                                </React.Fragment>
                                            );
                                        })
                                        : "" }
                                </Response>
                            </SearchResult>
                        </TooltipContents>
                    </TooltipBtn>
                </div>

                {
                    isFileOpen ?
                        <Dialog>
                            <DialogContent
                                bgc={ "white" }
                                width={ dialogWidth }
                                closeDialog={ handleOpenFile }
                            >
                                <div className="deleted-title" dangerouslySetInnerHTML={ { __html: file.title } } ></div>
                                <div className="deleted-content" dangerouslySetInnerHTML={ { __html: file.content } } ></div>
                            </DialogContent>
                        </Dialog>
                        : ""
                }
            </FileStyle>
        </>
    );
};

export default File;
export const FileStyle = styled.div`
    display: grid;
    grid-template-columns: 0.4fr 2fr 2fr 2fr;
    justify-items: center;
    /* align-items: center; */
    background: white;
    box-shadow: 0px 0px 3px silver;
    border-radius: 3px;
    gap: 5px;
    .file-col{
        display: grid;
        align-items: center;
        .icon-n-text{
            display: grid;
            grid-auto-flow: column;
            align-items: center;
            gap: 4px;
            grid-template-columns: max-content;
        }
    }
    .file-fn{
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
    }

    .deleted-title{
        font-weight: 600;
        color: #212529;
        text-align: center;
        border-bottom: 1px solid silver;
    }
    .deleted-content{
        color: #212529;
    }
`;
