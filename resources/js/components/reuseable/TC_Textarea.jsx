import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Creatables from './Creatables';
import { HomeContext } from '../index/HomeContext';

const TC_Textarea = (props) => {
    const { createables, fetchCreateables, handleResetField } = useContext(HomeContext);

    const [editableEmpty, seteditableEmpty] = useState("");
    const [closeTooltip, setcloseTooltip] = useState(false);
    const [loadingCreatables, setloadingCreatables] = useState(false);
    const [userCreatablesReady, setuserCreatablesReady] = useState(false);
    const textInput = React.createRef();

    useEffect(() => {
        if (props.content && props.content.length > 0) {
            textInput.current.innerHTML = props.content;
            setTimeout(() => {
                const post = textInput.current.textContent;
                const offSet = post.length;
                const range = document.createRange();
                const sel = window.getSelection();
                range.setStart(textInput.current.childNodes[0], offSet);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                textInput.current.focus();
            }, 500);
        } else { textInput.current.focus(); }
    }, []);
    useEffect(() => {
        props.editableempty === "true" ?
            textInput.current.innerHTML = ""
            : "";
    });

    const handleOninput = e => {
        const textareaHeight = textInput.current.clientHeight;
        seteditableEmpty(e.target.textContent.trim().replace(/\s\s+/g, " "));
        props.oninput(e, textareaHeight);
    };
    const handleKeyUp = e => {
        const textareaHeight = textInput.current.clientHeight;
        props.updateTextareaHeight(textareaHeight);
    };

    const handleTruncate = (words, number) => {
        var splitted = words.split(" ");
        var res = splitted.slice(0, number).join(" ");
        var truncated;
        if (splitted.length > number) {
            truncated = res + "...";
        } else {
            truncated = res;
        }
        return truncated;
    };
    const handlePaste = (e) => {
        e.preventDefault();
        var text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    const handleCreatable = (creatableObj) => {
        handleResetField("createable", creatableObj);
        setcloseTooltip(true);
        setTimeout(() => {
            setcloseTooltip(false);
        }, 400);
    };

    const getCreatable = async () => {
        const data = {
            id: props.media.id,
            type: props.media.media_type,
        };
        if (!createables.length) {
            setuserCreatablesReady(false);
            setloadingCreatables(true);
            const responseOk = await fetchCreateables(data);

            if (responseOk) {
                setloadingCreatables(false);
                setuserCreatablesReady(true);
            } else {
                setloadingCreatables(false);
            }
        }
    };

    const creatableDatas = {
        closeTooltip: closeTooltip,
        tooltipMounted: getCreatable,
        creatables: createables, //available creatables
        loadingCreatables: loadingCreatables,
        handleCreatable
    };

    var { handleReplyMsg, windowWidth, textareaHeight,
        replyingToBody, messaging, textareaMaxHeight,
    } = props;
    textInput.current ?
        props.emptyTextarea == true ?
            (textInput.current.innerHTML = "")
            : ""
        : "";

    return (
        <React.Fragment>
            {/* if textarea is from messaging */ }
            { replyingToBody != "" && messaging ?
                <ReplyingTo >
                    <p className="replying-to">
                        <span style={ { alignSelf: "end" } }><img
                            src="/storage/image/replying_black.png"
                            style={ { width: 20, height: 20, objectFit: "contain", opacity: 0.4 } }
                            alt=""
                        /></span>
                        <span
                            className={ "replying-to-text" }
                        >{ replyingToBody != "talk_cur_rent_files" ? handleTruncate(replyingToBody, 12) : "Replying to file(s)" }</span>
                    </p>
                    <span className={ "cancel-replying-to" }><i
                        className="far fa-trash-alt"
                        style={ { fontSize: "11px" } }
                        title="Delete"
                        onClick={ e => {
                            handleReplyMsg("", "", e);
                        } }
                    ></i></span>
                </ReplyingTo>
                : <React.Fragment></React.Fragment>
            }
            <Textarea
                editableempty={ props.editableempty }
                width={ props.width }
                miniHeight={ props.miniHeight }
                padding={ props.padding }
                messaging={ messaging }
                borderRadius={ props.borderRadius }
                textareaMaxHeight={ textareaMaxHeight }
                replying={ replyingToBody != "" }
            >
                <div className="placeholder">
                    { " " }
                    { props.editableempty === "true"
                        ? props.placeholder
                        : "" }
                </div>
                <div className="customTextarea">
                    <span
                        className="textarea-custom"
                        width={ props.width }
                        onInput={ e => handleOninput(e) }
                        onKeyPress={ props.onkeypress }
                        // onKeyUp={ handleKeyUp }
                        name={ props.name }
                        required
                        ref={ textInput }
                        suppressContentEditableWarning
                        contentEditable={ props.editable }
                        autoFocus
                        placeholder={ props.placeholder }
                        onPaste={ e => handlePaste(e) }
                    ></span>
                    { props.controlAbsolute == "true" ? (
                        <React.Fragment>
                            {/* { windowWidth <= 520 ?
                                <button
                                    className="close-chat-back"
                                    onClick={ e => {
                                        props.handleCloseThis("messenger");
                                    } }
                                    style={ { border: "none" } }
                                ><i className="fas fa-arrow-left"></i></button>
                                : ""
                            } */}
                            <div className="text-btns">
                                {/* if textarea is in comment or post */ }
                                { props.commenting === true ?
                                    <Creatables { ...creatableDatas } />
                                    : ""
                                }
                                <label
                                    className="btn-microphone"
                                    title="Record voice"
                                    htmlFor={ "fa-microphone" }
                                    style={ { marginBottom: 0, opacity: 0.5, cursor: "pointer" } }
                                >
                                    <i className="fas fa-microphone"></i>
                                </label>
                                <label
                                    className="btn-emoji"
                                    title="Add emoji"
                                    htmlFor={ "fa-smile" }
                                    style={ { marginBottom: 0, opacity: 0.5, cursor: "pointer" } }
                                >
                                    <i className="fas fa-smile"></i>
                                </label>
                                <label
                                    className="btn-video"
                                    title="Add video"
                                    htmlFor={ "fa-video" }
                                    style={ { marginBottom: 0, opacity: 0.5, cursor: "pointer" } }
                                >
                                    <i className="fas fa-video"></i>
                                </label>
                                <label
                                    className="btn-img-capture"
                                    title="Take a photo"
                                    htmlFor={ "" }
                                    style={ { marginBottom: 0, opacity: 0.5, cursor: "pointer" } }
                                    onClick={ e => {
                                        props.openThis("media", "snapshot", "audiochat", "video", "gallery");
                                    } }
                                >
                                    <i className="fas fa-camera snapshot" ></i>
                                </label>
                                <label
                                    className="btn-imgUpload"
                                    title="Upload photo"
                                    htmlFor={ props.id }
                                    style={ { marginBottom: 0, opacity: 0.5, cursor: "pointer" } }
                                >
                                    <i className="fas fa-image"></i>
                                    <input
                                        onChange={ e => props.onchange(e) }
                                        onClick={ e => {
                                            e.target.value = "";
                                        } }
                                        style={ { display: "none" } }
                                        id={ props.id }
                                        type="file"
                                        multiple
                                    />
                                </label>
                            </div>
                        </React.Fragment>
                    ) : (
                        ""
                    ) }
                </div>
            </Textarea>
        </React.Fragment>
    );
};

export default TC_Textarea;
export const ReplyingTo = styled.span`
    position: relative;
    max-width: 95%;
    display: block;
    .replying-to{
        padding: 0px 3px 2px 1px;
        margin: 0;
        background: #dee2e6;
        border-radius: 10px 10px 0 0;
        font-size: smaller;
        border: 1px solid #adc5bb;
        border-bottom: unset;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        .replying-to-text{
            color: rgb(122, 141, 158);
            font-weight: 100;
        }
    }
    .cancel-replying-to{
        position: absolute;
        right: -10px;
        top: 0;
        color: deeppink;
        cursor: pointer;
    }
`;
export const Textarea = styled.span`
    display: grid;
    width: 100%;
    /* border: ${props => props.messaging ? "1px solid #21693f29" : "unset"}; */
    /* border-radius: 0 10px 10px 10px; */
    /* overflow: hidden; */
    margin: ${props => props.messaging ? "2px 0" : "unset"};
    .placeholder {
        grid-row: 1;
        grid-column: 1;
        height: 100%;
        color: rgb(155, 155, 155);
        font-size: inherit;
        background: rgb(238, 238, 238);
        font-style: italic;
        font-family: serif;
        border-radius: ${props => (props.borderRadius ? "10px" : "unset")};
        padding: ${props => props.padding};
    }
    .customTextarea {
        position: relative;
        grid-row: 1;
        grid-column: 1;
        .textarea-custom {
            min-height: ${props => props.miniHeight};
            width: ${props => props.width};
            border: none;
            overflow-x: hidden;
            word-wrap: break-word;
            word-break: break-word;
            border-radius: ${props => (props.borderRadius ? "10px" : "unset")};
            color: gray !important;
            line-height: 1.2;
            font-size: smaller;
            background-color: ${props =>
        props.editableempty === "true"
            ? "rgb(0, 0, 0, 0)"
            : "rgb(238, 238, 238)"} !important;
            margin: ${props => props.padding};
            max-height: ${props => props.textareaMaxHeight};
            overflow: ${props => props.textareaMaxHeight ? "auto" : ""};
            display: inline-block;
            z-index: 1;
            cursor: text;
            
            &:focus {
                .placeholder {
                    color: rgb(163, 136, 136);
                }
                outline: none;
                outline-width: 0;
                background-color: ${props =>
        props.editableempty === "true"
            ? "rgb(0, 0, 0, 0)"
            : "rgb(238, 238, 238)"};
            }

            &:empty:before {
                content: "\feff";
                display: block;
                // min-height: 10vh;
                /* For Firefox */
            }

            &:focus:before {
                color: rgb(156, 18, 18);
                opacity: 0.4;
                font-style: italic;
            }
        }
        .close-chat-back{
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 0px 8px;
            justify-self: start;
            border-radius: 30px;
            background: transparent;
            &:hover {
                outline: none;
                outline-width: 0;
                color: green;
            }
        }
        .text-btns {
            display: grid;
            grid-gap: 10px;
            position: absolute;
            grid-auto-flow: column;
            bottom: 2px;
            right: 10px;
            line-height: 1;
            background: transparent;

            .btn-img-upload {
                display: block;
                background-image: url("/storage/image/add_photo_black.png");
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                border-top: 1px solid black;
                padding: 8px;
                opacity: 0.3;
                align-self: center;
                justify-self: center;
                margin: 0px;
                cursor: pointer;
            }

            .btn-emoji {
                display: block;
                cursor: pointer;
            }
        }
    }
`;

