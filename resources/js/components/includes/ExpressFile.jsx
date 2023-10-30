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
import LoadingDialog from './LoadingDialog';

const ExpressFile = (props) => {

    const { context, file, index, handleForward } = props;
    const [closetooltip, setclosetooltip] = useState(false);

    const closeTool = useRef(null);
    const [searchKeys, setsearchKeys] = useState("");
    const [searching, setsearching] = useState(false);
    const [staffs, setstaffs] = useState([]);
    const [openFile, setopenFile] = useState(false);
    const [state, setstate] = useState({
        deletingFile: false, deletingFileFailed: "", message: "",
        savingFile: true, savingFileFailed: "", searchResultReady: true,
        archivingFile: false, archivingFileFailed: "",
    });

    const dialogWidth = useViewPort(["100%", "90%;", "80%", "80%", "70%"]);
    const columnHeadFontSize = useViewPort(["18px", "18px", "20px", "25px"]);

    useEffect(() => {
        if (searchKeys != "" && !searching) {
            handleUserSearch(searchKeys);
        }
        return () => {
            setstate({ ...state, archivingFile: false, archivingFileFailed: "" });
        };
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
            guard: props.context.isAdmin ? "admin" : "staff",
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
    const handleOpenFile = () => {
        setopenFile(!openFile);
    };

    const singleClick = (target, params) => {

    };

    const doubleClick = (target, params) => {
        const { id, model } = params;
        handleForward(id, file.id, model);
    };

    const handleDelete = async () => {
        const data = {
            id: file.id,
            guard: props.context.isAdmin ? "admin" : "staff",
        };
        setstate({ ...state, deletingFile: true, deletingFileFailed: "", message: "" });
        const response = await useFetch('/delete_file', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            context.getReceivedFiles(props.context.isAdmin ? "admin" : "staff");
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

    const handleArchive = async () => {
        const data = {
            id: file.id,
            guard: props.context.isAdmin ? "admin" : "staff",
        };
        setstate({ ...state, archivingFile: true, archivingFileFailed: "", message: "" });
        const response = await useFetch('/archive_file', JSON.stringify(data), "POST", false);

        if (response.ok) {
            let result = await response.json();
            context.getReceivedFiles();
            context.getForwardedFiles();
            closeToolTip();
            setstate({
                ...state,
                archivingFile: false, archivingFileFailed: false,
                message: "File Succesfully Archived!"
            });
        } else {
            setstate({
                ...state, archivingFile: false, archivingFileFailed: true,
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
        <>
            <FileStyle
                openFile={ openFile }
            >
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
                        <span> { file.creator.first_name }{ " " } { file.creator.last_name }</span>
                    </ScrollerX>
                    <small style={ { color: "#86919a", fontWeight: 100 } }>(Creator)</small>
                </div>
                <div className="file-fn file-col">
                    <IconToolTipBtn
                        toolTip={ true } ancestor={ "all-container" }
                        class={ `tooltip-delete-btn` }
                        textColor={ "#e95c41" }
                        fontSize={ "" }
                        context={ context }
                        iconClass={ "fas fa-trash-alt" }
                        handleClick={ () => { } }
                        tooltipMounted={ () => { } }
                        tooltipUnMounted={ () => { } }
                        border={ "unset" }
                        padding={ "0" }
                        fixedTop={ false }
                        closeTooltip={ closetooltip }
                        closeable={ true }

                    >
                        <TooltipContents
                            cardsBgc={ "white" }
                            width={ "150px" }
                            padding={ "15px 5px 5px 5px" }
                            color={ "rgb(41, 109, 173)" }
                        >
                            <span>Only super admin can bring this file back. Continue anyway?</span>
                            <ActionBtn
                                processing={ state.deletingFile }
                                progressText={ "Deleting" }
                                btnText={ "Delete" }
                                btnClick={ handleDelete }
                                disabled={ state.deletingFile }
                                justify={ "center" } bgc={ "#e95c41" }
                                color={ "whitesmoke" } width={ "" }
                            />
                            { state.deletingFileFailed === true ?
                                <span>{ state.message }</span>
                                : ""
                            }
                        </TooltipContents>

                    </IconToolTipBtn>
                    <IconToolTipBtn
                        linkBtn={ true }
                        btnLink={ props.context.isAdmin ? `/super/edit/file/${file.id}` : `/edit/file/${file.id}` }
                        class={ `tooltip-edit-btn` }
                        textColor={ "gray" }
                        fontSize={ "" }
                        context={ context }
                        iconClass={ "fas fa-edit" }
                        handleClick={ handleOpenFile }
                        border={ "unset" }
                        padding={ "0" }
                    />

                    <IconToolTipBtn
                        toolTip={ true }
                        class={ `tooltip-archive-btn` }
                        textColor={ "#58ae5c" }
                        fontSize={ "" }
                        context={ context }
                        iconClass={ "fas fa-file-archive" }
                        handleClick={ () => { } }
                        tooltipMounted={ () => { } }
                        tooltipUnMounted={ () => { } }
                        border={ "unset" }
                        padding={ "0" }
                        fixedTop={ false }
                        closeTooltip={ closetooltip }
                        closeable={ true }
                    >
                        <TooltipContents
                            cardsBgc={ "white" }
                            width={ "150px" }
                            padding={ "15px 5px 5px 5px" }
                            color={ "rgb(41, 109, 173)" }
                        >
                            <span>By archiving this file, you will no longer be able to edit or forward it. Click "Archive" to proceed.</span>
                            <ActionBtn
                                processing={ state.archivingFile }
                                progressText={ "Please wait" }
                                btnText={ "Archive" }
                                btnClick={ e => handleArchive() }
                                disabled={ false }
                                justify={ "center" } bgc={ "#58ae5c" }
                                color={ "#ffffff" } width={ "" }
                            />
                        </TooltipContents>

                    </IconToolTipBtn>
                    <IconToolTipBtn
                        toolTip={ true } ancestor={ "" }
                        class={ `tooltip-forward-btn` }
                        textColor={ "#56bff4" }
                        fontSize={ "" }
                        context={ context }
                        iconClass={ "fas fa-forward" }
                        handleClick={ () => { } }
                        tooltipMounted={ () => { } }
                        tooltipUnMounted={ () => { } }
                        border={ "unset" }
                        padding={ "0" }
                        fixedTop={ false }
                        closeable={ true }
                    >
                        <TooltipContents
                            cardsBgc={ "white" }
                            width={ "300px" }
                            maxHeight={ "60vh" }
                            gtr={ "max-content 30px max-content auto" }
                            height={ "50vh" }
                            overflowY={ "hidden" }
                            padding={ "20px 5px 5px 5px" }
                            color={ "rgb(41, 109, 173)" }
                        >
                            <h5>Forward file to: </h5>
                            <EditableDiv
                                placeholder={ "Search by staff name or dep't..." }
                                width={ '100%' }
                                miniHeight={ 'auto' }
                                padding={ '0 10px' }
                                borderRadius={ '30px' }
                                searchBar={ true }
                                overflow={ "visible" }
                                searching={ searching }
                                windowWidth={ context.windowWidth }
                                handleOninput={ handleOninput }
                                handleSearch={ handleUserSearch }
                            />
                            <small style={ { color: "#e95c41", textAlign: "center", letterSpacing: 1 } }>Double click staff to forward file.</small>
                            <SearchResult
                                maxHeight={ "250px" }
                                overflowY={ "auto" }
                            >
                                { context.authUser.id != file.creator.id ?
                                    <HorizontalUserCard
                                        key={ index }
                                        cardBgc={ "whitesmoke" }
                                        cardElemBgc={ "whitesmoke" }
                                        gtc={ "40px auto" }
                                        cardImgUrl={ `/storage/image/${file.creator.profile.dp}` }
                                        fSize={ "" }
                                        lHeight={ 1 }
                                        handleClick={ (e) => handleClick(e, singleClick, doubleClick, { id: file.creator.id, model: 'staff' }) }
                                        margin={ "0 10px" }
                                        bShadow={ "0px 0px 2px #296DBB" }
                                    >
                                        { file.creator.hasOwnProperty("id") ?
                                            <>
                                                <h5 style={ { color: "#296dad", margin: 0 } }>{ file.creator.first_name }{ ' ' }{ file.creator.last_name }{ ' ' }{ file.creator.other_name }</h5>
                                                <div>Creator of this file</div>
                                                <div>Role:<strong>{ ' Admin' }</strong></div>
                                            </>
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
                                    </HorizontalUserCard>
                                    : "" }
                                <Response
                                    responsive={ true }
                                    windowWidth={ context.windowWidth }
                                    dataReady={ state.searchResultReady }
                                    datas={ staffs }
                                    height={ "50px" }
                                    gettingData={ searching }
                                    noRecordText={ "Enter keyword to see staff" }
                                >
                                    { staffs.length ?
                                        staffs.map((staff, key) => {
                                            return (
                                                <HorizontalUserCard
                                                    key={ key }
                                                    cardBgc={ "whitesmoke" }
                                                    cardElemBgc={ "whitesmoke" }
                                                    gtc={ "40px auto" }
                                                    cardImgUrl={ `/storage/image/${staff.profile.dp}` }
                                                    fSize={ "" }
                                                    handleClick={ (e) => handleClick(e, singleClick, doubleClick, { id: staff.id, model: 'staff' }) }
                                                    lHeight={ 1 }
                                                    margin={ "0 10px" }
                                                    bShadow={ "0px 0px 2px #296DBB" }
                                                >
                                                    <h5 style={ { color: "#296dad", margin: 0 } }>{ staff.first_name }{ ' ' }{ staff.last_name }{ ' ' }{ staff.other_name }</h5>
                                                    <div>{ staff.department.d_name }{ " " } department</div>
                                                    <div style={ {
                                                        display: "grid",
                                                        gridAutoFlow: "column",
                                                        gridTemplateColumns: "max-content",
                                                        color: "gray",
                                                        fontFamily: "serif"
                                                    } }>
                                                        <span>Role (s):{ " " }</span>
                                                        { staff.roles ?
                                                            staff.roles.length ?
                                                                <ScrollerX>
                                                                    { staff.roles.map((role, index) => {
                                                                        var last = staff.roles[staff.roles.length - 1];
                                                                        return <span key={ index }>{ role.role_name }{ last.id != role.id ? ", " : "" }</span>;
                                                                    }) }
                                                                </ScrollerX>
                                                                : ""
                                                            : "Admin"
                                                        }
                                                    </div>
                                                </HorizontalUserCard>
                                            );
                                        })
                                        : "" }
                                </Response>
                            </SearchResult>
                        </TooltipContents>

                    </IconToolTipBtn>
                    {/* <IconToolTipBtn
                        linkBtn={ true }
                        btnLink={ "#" }
                        class={ `tooltip-report-btn` }
                        textColor={ "#296dad" }
                        fontSize={ "" }
                        context={ context }
                        iconClass={ "fas fa-comment-dots" }
                        border={ "unset" }
                    /> */}
                </div>

            </FileStyle>
            {state.archivingFile ? <LoadingDialog bgc={ "transparent" } /> : "" }
        </>
    );
};

export default ExpressFile;
const FileStyle = styled.div`
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
