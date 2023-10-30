import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useViewPort from '../customHooks/useViewPort';
import ActionBtn from '../reuseable/ActionBtn';
import Dialog from '../reuseable/Dialog';
import DialogContent from '../reuseable/DialogContent';
import Downloader from '../reuseable/Downloader';
import ScrollerX from '../reuseable/ScrollerX';
import TooltipBtn from '../reuseable/TooltipBtn';
import TooltipContents from '../reuseable/TooltipContents';
import LoadingDialog from './LoadingDialog';

const Deleted = (props) => {
    const { context, file, index, handleForward } = props;
    const [closetooltip, setclosetooltip] = useState(false);

    const closeTool = useRef(null);
    const [isFileOpen, setisFileOpen] = useState(false);
    const [searchKeys, setsearchKeys] = useState("");
    const [searching, setsearching] = useState(false);
    const [state, setstate] = useState({
        deletingFile: false, deletingFileFailed: "", message: "",
    });

    const dialogWidth = useViewPort(["100%", "90%;", "80%", "80%", "70%"]);

    useEffect(() => {
        if (searchKeys != "" && !searching) {
            handleUserSearch(searchKeys);
        }
        return () => { };
    }, [searchKeys]);

    const handleFileRestore = () => {
        context.handleFileRestore(file.id);
    };

    const handleOpenFile = () => {
        setisFileOpen(!isFileOpen);
    };

    return (
        <>
            <FileStyle>
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
                        toolTip={ true }
                        class={ `tooltip-restore-btn` }
                        fontSize={ "" }
                        tooltipBgc={ "white" }
                        textColor={ "rgb(134, 145, 154)" }
                        backgroundColor={ "transparent" }
                        btnText={ "Restore" }
                        context={ context }
                        border={ "unset" }
                        padding={ "0 4px" }
                        closeable={ true }
                    >
                        <TooltipContents
                            cardsBgc={ "white" }
                            width={ "300px" }
                            maxHeight={ "45vh" }
                            gtr={ "max-content auto" }
                            height={ "max-content" }
                            overflowY={ "hidden" }
                            padding={ "5px 5px 5px 5px" }
                            color={ "#5a6269" }
                        >
                            <div>
                                <span>This action will remove this file from trash.</span>
                                <div>Continue anyway?</div>
                                <ActionBtn
                                    processing={ context.restoringFile }
                                    progressText={ "Restoring" }
                                    btnText={
                                        <>
                                            <span>Yes restore</span>
                                        </>
                                    }
                                    btnClick={ () => handleFileRestore() }
                                    justify={ "center" }
                                    bgc={ "transparent" }
                                    color={ "red" }
                                    width={ "100%" }
                                // border={ "unset" }
                                />
                            </div>
                        </TooltipContents>
                    </TooltipBtn>
                </div>
                {
                    isFileOpen ?
                        <Dialog >
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
            {context.restoringFile ? <LoadingDialog bgc={ "transparent" } /> : "" }
        </>
    );
};

export default Deleted;
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
