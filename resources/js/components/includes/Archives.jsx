import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useViewPort from '../customHooks/useViewPort';
import ActionBtn from '../reuseable/ActionBtn';
import Downloader from '../reuseable/Downloader';
import ScrollerX from '../reuseable/ScrollerX';

const Archives = (props) => {
    const { context, file, index, handleForward } = props;
    const [closetooltip, setclosetooltip] = useState(false);

    const closeTool = useRef(null);
    const [searchKeys, setsearchKeys] = useState("");
    const [searching, setsearching] = useState(false);
    const [state, setstate] = useState({
        deletingFile: false, deletingFileFailed: "", message: "",
    });

    const dialogWidth = useViewPort(["100%"]);
    const fileNameInStorage = `${file.id}_${file.title.split(' ').join('_')}.pdf`;

    useEffect(() => {
        if (searchKeys != "" && !searching) {
            handleUserSearch(searchKeys);
        }
        return () => { };
    }, [searchKeys]);

    const handleFileDownload = () => {
        Downloader(`/storage/pdf/${fileNameInStorage}`, fileNameInStorage);
    };

    const handleOpenFile = () => {
        var a = document.createElement("a");
        a.style = "display: none";
        a.href = `/storage/pdf/${fileNameInStorage}`;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
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
                        <i className="far fa-file-pdf" style={ { color: "rgb(214 144 142)" } }></i>{ " " }
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

                    <ActionBtn
                        processing={ false }
                        progressText={ "" }
                        btnText={
                            <>
                                <span>Download</span>
                                <small style={ { color: "rgb(134, 145, 154)", fontWeight: 100, marginLeft: 3 } }>(pdf)</small>
                            </>
                        }
                        btnClick={ () => handleFileDownload() }
                        justify={ "center" }
                        bgc={ "transparent" }
                        color={ "rgb(134, 145, 154)" }
                        width={ "100%" }
                    />
                </div>

            </FileStyle>
        </>
    );
};

export default Archives;
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
`;
