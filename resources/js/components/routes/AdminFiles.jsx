import React, { useContext, useEffect, useState } from 'react';
import CustomEditor from '../customEditor/CustomEditor';
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import File from '../includes/File';
import WebView from '../includes/WebView';
import { AdminContext } from '../index/AdminContext';
import { AllContext } from '../index/AllContext';
import ActionBtn from '../reuseable/ActionBtn';
import Dialog from '../reuseable/Dialog';
import DialogContent from '../reuseable/DialogContent';
import FixedBottomRight from '../reuseable/FixedBottomRight';
import Loading from '../reuseable/Loading';
import LoadingBtn from '../reuseable/LoadingBtn';
import VerticalUserCard from '../reuseable/VerticalUserCard';

const AdminFiles = () => {
    const context = useContext(AllContext);
    const {
        alterStateProps, authUser, getFiles, allFiles,
        filesReady, gettingFiles, getForwardedFiles, getReceivedFiles
    } = context;
    const [state, setstate] = useState({
        savingFile: true, savingFileFailed: "", message: "",
        forwardingFile: true, forwardingFileFailed: "",
    });

    const [newFileDialog, setnewFileDialog] = useState(false);
    const [forwardingFileModal, setforwardingFileModal] = useState(false);
    const [editorNodes, setneweditorNodes] = useState("");
    const [innerHtml, setnewinnerHtml] = useState("");
    const [editorTitle, seteditorTitle] = useState("");

    const dialogWidth = useViewPort(["100%", "90%;", "80%", "80%", "70%"]);
    const columnHeadFontSize = useViewPort(["18px", "18px", "20px", "25px"]);

    useEffect(() => {
        const path_names = location.pathname.split('/');
        if (path_names.includes('super')) {
            context.handleAuthUser("admin");
        } else {
            context.handleAuthUser("staff");
        }
        // getReceivedFiles('admin');
        // getForwardedFiles('admin');
        if (!allFiles.length) {
            getFiles();
        } else { alterStateProps("filesReady", true); }
        return () => { };
    }, []);

    const handleNewFileDialog = () => {
        setstate({ ...state, message: "" });
        setnewFileDialog(!newFileDialog);
    };
    const handlForwardingModal = () => {
        setforwardingFileModal(!forwardingFileModal);
    };

    const handleContentUpload = async () => {
        return await context.handleContentUpload();
    };

    const handleOutput = async (output, saveTo) => {
        const { editorNodes, innerHtml, editorTitle } = output;

        setneweditorNodes(editorNodes);
        setnewinnerHtml(innerHtml);
        seteditorTitle(editorTitle);
        if (saveTo == "saveToDB") {
            //send html to backend
            const data = {
                title: editorTitle,
                content: innerHtml,
            };

            setstate({ ...state, savingFile: true, savingFileFailed: "", message: "" });
            const response = await useFetch('/create_file', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();
                getFiles();
                setstate({
                    ...state,
                    savingFile: false, savingFileFailed: false,
                    message: "File Succesfully Created!"
                });
            } else {
                setstate({
                    ...state, savingFile: false, savingFileFailed: true,
                    message: "Something not right. Please try again later"
                });

            }
        }
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

    const stylez = {
        display: "grid",
        gap: "3rem",
        color: "black",
    };

    return (
        <WebView
            view={ "files" }
            context={ context }
        >
            <Column
                color={ "#5a6269" }
                padding={ "3px" }
                bgc={ "rgb(225 225 225)" }
                fontSize={ columnHeadFontSize }
                iconClass={ "fas fa-paperclip" }
                header={ "Files" }
            >
                <ColumnCard
                    // color={ "#296dad" }
                    fontSize={ columnHeadFontSize }
                    viewable={ false }
                    margin={ "2px auto" }
                    bgc={ "#f9f9f9" }
                >
                    {
                        allFiles.length ?
                            <React.Fragment>
                                {/* <div className={ "file-header" }>
                                    <div>S/N</div>
                                    <div>File title</div>
                                    <div>Created by</div>
                                    <div>Action buttons</div>
                                </div> */}

                                <div className="file-container">
                                    { allFiles.map((file, key) => {
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
                            : !filesReady && gettingFiles ?
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
                                : filesReady && !allFiles.length ?
                                    <div style={ { textAlign: "center" } }>No file found!</div>
                                    : ""

                    }
                </ColumnCard>
            </Column>
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
            {newFileDialog ?
                <Dialog
                    // dialogMounted={ dialogMounted }
                    handleClose={ handleNewFileDialog }
                >
                    <DialogContent
                        bgc={ "white" }
                        width={ dialogWidth }
                        closeDialog={ handleNewFileDialog }
                    >
                        <div className="content-inner" style={ stylez }>
                            <CustomEditor
                                contextSrc={ context }
                                title={ true }
                                contentUpload={ handleContentUpload }//this function uploads image n to return a promise image path/url
                                handleEditorClose={ handleNewFileDialog }
                                handleOutput={ handleOutput } //function, returns all childNodes
                                input={ { editorNodes, innerHtml, editorTitle } }
                                initialState={ { body: "" } }//string or innerHTML
                                width={ "100%" }
                            />
                        </div>
                    </DialogContent>
                </Dialog>
                : "" }
            <FixedBottomRight
                bottom={ "10px" }
                right={ "10px" }
                bRadius={ "5px" }
            >
                <ActionBtn
                    btnText={ <> + New File</> }
                    bgc={ "#296dad" }
                    color={ "whitesmoke" }
                    btnClick={ () => handleNewFileDialog() }
                />
            </FixedBottomRight>
        </WebView>
    );
};

export default AdminFiles;
