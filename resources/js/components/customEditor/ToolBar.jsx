import React, { useRef } from 'react';
import styled from 'styled-components';
import IconToolTipBtn from '../reuseable/IconToolTipBtn';
import { ImagePreview } from '../reuseable/ImagePreview';
import Loading from '../reuseable/Loading';
import LoadingBtn from '../reuseable/LoadingBtn';
import TooltipBtn from '../reuseable/TooltipBtn';
import TooltipContents from '../reuseable/TooltipContents';

const ToolBar = (props) => {
    const {
        handleEffect, handleBlock, handleSave, handleEditorClose,
        handlePress, handleInsert,
        handleDelPreview, previewable, imgTemplate,
    } = props;
    const headings = useRef(null);
    return (
        <ToolBarStyle className={ "editor-toolbar" }>
            <div className="editings">
                <TooltipBtn
                    linkBtn={ false } btnLink={ "" } class={ `editings-btn` }
                    toolTip={ true } ancestor={ "admin-dashboard" }
                    textColor={ "black" } fontSize={ "" }
                    closeTooltip={ props.closeTooltip == "headings" }
                    tooltipBgc={ "white" }
                    backgroundColor={ "whitesmoke" }
                    hoverBgColor={ "" }
                    hoverColor={ "" }
                    borderRadius={ "5px" }
                    border={ "unset" }
                    padding={ "" }
                    btnShadow={ "" }
                    loadingText={ "" }
                    handleClick={ () => { } }
                    tooltipMounted={ () => { } }
                    onMouseDown={ (e) => e.preventDefault() }
                    btnText={ "Heading" }
                    animateBtn={ false }
                    fixedBottom={ true }
                    disabled={ false }
                    context={ props.contextSrc }
                >
                    <TooltipContents
                        padding={ "10px 5px 0px 5px" }
                        cardsBgc={ "white" }
                        alignItems={ "center" }
                        justifyItems={ "center" }
                        contextSrc={ props.contextSrc }
                    >
                        <span className={ "h-list" } onMouseDown={ e => handleBlock(e, "h1") }>H1</span>
                        <span className={ "h-list" } onMouseDown={ e => handleBlock(e, "h2") }>H2</span>
                        <span className={ "h-list" } onMouseDown={ e => handleBlock(e, "h3") }>H3</span>
                        <span className={ "h-list" } onMouseDown={ e => handleBlock(e, "h4") }>H4</span>
                        <span className={ "h-list" } onMouseDown={ e => handleBlock(e, "h5") }>H5</span>
                        <span className={ "h-list" } onMouseDown={ e => handleBlock(e, "h6") }>H6</span>
                    </TooltipContents>
                </TooltipBtn>
                <i className="fas fa-bold" onMouseDown={ e => handleEffect(e, "text-bold", 'fontWeight') }></i>
                <i className="fas fa-italic" onMouseDown={ e => handleEffect(e, "text-italic", 'fontStyle') }></i>
                <i className="fas fa-underline" onMouseDown={ e => handleEffect(e, "text-underline", 'textDecoration') }></i>
                <i className="fas fa-align-left" onMouseDown={ e => handleEffect(e, "text-a-left", 'textAlign') }></i>
                <i className="fas fa-align-justify" onMouseDown={ e => handleEffect(e, "text-a-justify", 'textAlign') }></i>
                <i className="fas fa-align-right" onMouseDown={ e => handleEffect(e, "text-a-right", 'textAlign') }></i>
                <IconToolTipBtn
                    linkBtn={ false } class={ `editor-camera-btn` }
                    toolTip={ true } ancestor={ "settin" }
                    textColor={ "black" }
                    context={ props.contextSrc }
                    fontSize={ "" }
                    iconClass={ "fas fa-camera" }
                    tooltipBgc={ "white" }
                    backgroundColor={ imgTemplate.size ? "#63b385" : "" }
                    hoverBgColor={ "" }
                    hoverColor={ "" }
                    borderRadius={ "" }
                    border={ "unset" }
                    btnText={ '' }
                    handleClick={ e => { } }
                    onMouseDown={ (e) => e.preventDefault() }
                    closeable={ true }
                    tooltipMounted={ () => { } }
                    closeable={ true }
                    fixedBottom={ true }
                    closeTooltip={ props.closeTooltip == "imgInsert" }
                >
                    <TooltipContents
                        padding={ "10px 5px 0px 5px" }
                        cardsBgc={ "white" }
                        alignItems={ "center" }
                        justifyItems={ "center" }
                        contextSrc={ props.contextSrc }
                    >
                        { previewable == "customEditor" && imgTemplate.size ?
                            <div className="preview">
                                <ImagePreview
                                    handleDelPreview={ handleDelPreview }
                                    min={ "100px" }
                                    max={ "150px" }
                                    imgTemplate={ imgTemplate } />
                            </div>
                            : ""
                        }
                        { !props.contextSrc.uploadingPhoto ?
                            <TooltipBtn
                                linkBtn={ false } btnLink={ "" } class={ `insert-to-editor-btn` }
                                toolTip={ false } ancestor={ "admin-dashboard" }
                                textColor={ "black" } fontSize={ "small" }
                                closeTooltip={ "" }
                                tooltipBgc={ "white" }
                                backgroundColor={ "whitesmoke" }
                                hoverBgColor={ "" }
                                hoverColor={ "" }
                                borderRadius={ "5px" }
                                border={ "unset" }
                                padding={ "" }
                                btnShadow={ "" }
                                loadingText={ "" }
                                handleClick={ () => { } }
                                tooltipMounted={ () => { } }
                                onMouseDown={ (e) => {
                                    imgTemplate.size ? handleInsert(e) : handlePress(e, "photo");
                                } }
                                btnText={ imgTemplate.size ? "Insert" : "Choose photo" }
                                animateBtn={ false }
                                disabled={ false }
                                closeable={ true }
                                context={ props.contextSrc }
                            />
                            :
                            <LoadingBtn text={ "Uploading" } color={ "" } lineHeight={ "unset" }
                                fontSize={ "small" } fontWeight={ 300 } loadMore={ false } />
                        }
                    </TooltipContents>
                </IconToolTipBtn>
                < IconToolTipBtn
                    linkBtn={ false } class={ `editor-save-btn` }
                    toolTip={ true } ancestor={ "settings" }
                    textColor={ "black" }
                    fontSize={ "" }
                    iconClass={ "fas fa-save" }
                    handleClick={ () => { } }
                    tooltipMounted={ () => { } }
                    onMouseDown={ e => e.preventDefault() }
                    border={ "unset" }
                    closeable={ true }
                    fixedBottom={ true }
                    context={ props.contextSrc }
                    tooltipBgc={ "white" }
                    closeTooltip={ props.closeTooltip == "save" }
                >
                    <TooltipContents
                        padding={ "10px" }
                        cardsBgc={ "white" }
                        alignItems={ "center" }
                        justifyItems={ "center" }
                        context={ props.contextSrc }
                    >
                        <div>Click 'Confirm' to save</div>
                        <button onMouseDown={ e => {
                            e.preventDefault();
                            handleSave("saveToDB");
                        } }>Confirm</button>
                    </TooltipContents>
                </IconToolTipBtn>
                <i className="fas fa-times" onClick={ e => handleEditorClose(e) }></i>
            </div>
        </ToolBarStyle>
    );
};

export default ToolBar;
export const ToolBarStyle = styled.div`
    position: sticky;
    top: 0;
    .editings{
        display: grid;
        grid-auto-flow: column;
        gap: 2px;
        padding: 0.5rem;
        background: wheat;
        justify-items: center;
        align-items: center;
        i{
            cursor: pointer;
        }
    }
    .h-list{
        cursor: pointer;
        &:hover{
            font-weight: bold;
        }
    }
`;

export const BLOCK_TYPES = [
    { label: " “ ” ", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "{ }", style: 'code-block' }
];
export const BLOCK_TYPE_HEADINGS = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" }
];