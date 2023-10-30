import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import CustomEditor from '../customEditor/CustomEditor';
import useFetch from '../customHooks/useFetch';
import useViewPort from '../customHooks/useViewPort';
import Column from '../dashboard/Column';
import ColumnCard from '../dashboard/ColumnCard';
import WebView from '../includes/WebView';
import { AllContext } from '../index/AllContext';
import Loading from '../reuseable/Loading';

const File = (props) => {
    const history = useHistory();
    const context = useContext(AllContext);

    const [state, setstate] = useState({
        deletingFile: false, deletingFileFailed: "", message: "",
        savingFile: true, savingFileFailed: "", gettingFile: false
    });

    const [editorNodes, setneweditorNodes] = useState("");
    const [innerHtml, setnewinnerHtml] = useState("");
    const [editorTitle, seteditorTitle] = useState("");
    const [file, setfile] = useState({});

    const { id } = props.match.params;
    const columnHeadFontSize = useViewPort(["18px", "18px", "20px", "25px"]);

    useEffect(() => {
        const path_names = location.pathname.split('/');
        if (path_names.includes('super')) {
            context.handleAuthUser("admin");
        } else {
            context.handleAuthUser("staff");
        }
        return () => { };
    }, []);

    useEffect(() => {
        getFile();
    }, []);

    const getFile = async () => {
        const data = { id };

        setstate({ ...state, gettingFile: true });
        const response = await useFetch("/get_file", JSON.stringify(data), "POST", false);
        if (response.ok) {
            let result = await response.json();
            setfile(result);
            setnewinnerHtml(result.content);
            seteditorTitle(result.title);
            setstate({ ...state, gettingFile: false });
        } else {
            setstate({ ...state, gettingFile: false });
        }
    };

    const handleContentUpload = async () => {
        return await context.handleContentUpload();
    };

    const handleKeyUp = () => {
        setstate({ ...state, message: "" });
    };
    const goBackToFile = () => {
        history.go(-1);
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
                id: file.id,
            };

            setstate({ ...state, savingFile: true, savingFileFailed: "", message: "Saving file..." });
            const response = await useFetch('/edit_file', JSON.stringify(data), "POST", false);

            if (response.ok) {
                let result = await response.json();
                setstate({
                    ...state, savingFile: false, savingFileFailed: false,
                    message: "File saved!"
                });
            } else {
                setstate({
                    ...state, savingFile: false, savingFileFailed: true,
                    message: "Error saving file"
                });

            }
        }
    };

    return (
        <WebView
            view={ "files" }
            context={ context }
        >
            <Column
                color={ "#5a6269" }
                bgc={ "rgb(245 245 245)" }
                fontSize={ columnHeadFontSize }
                iconClass={ "" }
                header={ "" }
            >
                <ColumnCard
                    // color={ "#296dad" }
                    bgc={ "rgb(245 245 245)" }
                    fontSize={ "" }
                    viewable={ false }
                    margin={ "2px auto" }
                    bgc={ "white" }
                >
                    { file.hasOwnProperty("id") ?
                        <CustomEditor
                            contextSrc={ context }
                            title={ true }
                            response={ state.message }
                            ctrlSToSave={ true }
                            handleKeyUp={ handleKeyUp }
                            contentUpload={ handleContentUpload }//this function uploads image n to return a promise image path/url
                            handleEditorClose={ goBackToFile }
                            handleOutput={ handleOutput } //function, returns all childNodes
                            input={ { editorNodes, innerHtml, editorTitle } }
                            initialState={ { title: file.title, body: file.content } }//string or innerHTML
                            width={ "100%" }
                        />
                        :
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
                    }
                </ColumnCard>
            </Column>
        </WebView>
    );
};

export default File;
