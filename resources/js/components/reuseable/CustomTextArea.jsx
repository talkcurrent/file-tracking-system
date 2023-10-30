import React, { Component } from "react";
import styled from "styled-components";
import { HomeContext } from "../index/HomeContext";
import Creatables from "./Creatables";

export class CustomTextarea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textarea: "",
            inputHeight: "",
            editableEmpty: ""
        };
        this.textInput = React.createRef();
    }

    componentDidMount() {
        if (this.props.content && this.props.content.length > 0) {
            this.textInput.current.innerHTML = this.props.content;
            setTimeout(() => {
                const post = this.textInput.current.textContent;
                const offSet = post.length;
                const range = document.createRange();
                const sel = window.getSelection();
                range.setStart(this.textInput.current.childNodes[0], offSet);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                this.textInput.current.focus();
            }, 500);
        } else { this.textInput.current.focus(); }
    }
    handleOninput = e => {
        const textareaHeight = this.textInput.current.clientHeight;
        this.setState({
            editableEmpty: e.target.textContent.trim().replace(/\s\s+/g, " ")
        });
        this.props.oninput(e, textareaHeight);
        console.info(this.textInput.current.clientHeight);
    };
    handleKeyUp = e => {
        const textareaHeight = this.textInput.current.clientHeight;
        this.props.updateTextareaHeight(textareaHeight);
    };
    componentDidUpdate = (prevProps, prevState) => {
        // if (this.textInput.current) {
        //     if (this.props.textareaHeight != this.textInput.current.clientHeight && this.props.messaging) {
        //         this.props.updateTextareaHeight(this.textInput.current.clientHeight);
        //     }
        // }
    };
    handleTruncate = (words, number) => {
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
    handlePaste = (e) => {
        e.preventDefault();
        var text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };
    render() {
        var { handleReplyMsg, windowWidth, textareaHeight, replyingToBody, messaging } = this.props;
        this.textInput.current ?
            this.props.emptyTextarea == true ?
                (this.textInput.current.innerHTML = "")
                : ""
            : "";
        return (
            <HomeContext.Consumer>
                { context => {
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
                                        <span className={ "replying-to-text" }>{ this.handleTruncate(replyingToBody, 12) }</span>
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
                                editableempty={ this.props.editableempty }
                                width={ this.props.width }
                                miniHeight={ this.props.miniHeight }
                                padding={ this.props.padding }
                                messaging={ messaging }
                                borderRadius={ this.props.borderRadius }
                                replying={ replyingToBody != "" }
                            >
                                <div className="placeholder">
                                    { " " }
                                    { this.props.editableempty === "true"
                                        ? this.props.placeholder
                                        : "" }
                                </div>
                                <div className="customTextarea">
                                    <span
                                        className="textarea-custom"
                                        width={ this.props.width }
                                        onInput={ this.handleOninput }
                                        onKeyPress={ this.props.onkeypress }
                                        // onKeyUp={ this.handleKeyUp }
                                        name={ this.props.name }
                                        required
                                        ref={ this.textInput }
                                        suppressContentEditableWarning
                                        contentEditable={ this.props.editable }
                                        autoFocus
                                        placeholder={ this.props.placeholder }
                                        onPaste={ this.handlePaste(e) }
                                    ></span>
                                    { this.props.controlAbsolute == "true" ? (
                                        <React.Fragment>
                                            { windowWidth <= 520 ?
                                                <button
                                                    className="close-chat-back"
                                                    onClick={ e => {
                                                        this.props.handleCloseThis("messenger");
                                                    } }
                                                    style={ { border: "none" } }
                                                ><i className="fas fa-arrow-left"></i></button>
                                                : ""
                                            }
                                            <div className="text-btns">
                                                {/* if textarea is in comment or post */ }
                                                { this.props.commenting === true ?
                                                    <Creatables { ...this.props.creatableDatas } />
                                                    : ""
                                                }
                                                <label
                                                    className="btn-emoji"
                                                    title="Add emoji"
                                                    htmlFor={ "fa-smile" }
                                                    style={ { marginBottom: 0, opacity: 0.5 } }
                                                >
                                                    <i className="fas fa-smile"></i>
                                                </label>
                                                <label
                                                    className="btn-img-capture"
                                                    title="Take a photo"
                                                    htmlFor={ "" }
                                                    style={ { marginBottom: 0, opacity: 0.5, cursor: "pointer" } }
                                                    onClick={ e => {
                                                        this.props.openThis("media", "snapshot", "audiochat", "video", "gallery");
                                                    } }
                                                >
                                                    <i className="fas fa-camera snapshot" ></i>
                                                </label>
                                                <label
                                                    className="btn-imgUpload"
                                                    title="Upload photo"
                                                    htmlFor={ this.props.id }
                                                    style={ { marginBottom: 0, opacity: 0.5, cursor: "pointer" } }
                                                >
                                                    <i className="fas fa-image"></i>
                                                    <input
                                                        onChange={ this.props.onchange }
                                                        onClick={ e => {
                                                            e.target.value = "";
                                                        } }
                                                        style={ { display: "none" } }
                                                        id={ this.props.id }
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
                } }
            </HomeContext.Consumer>
        );
    }
}
CustomTextarea.contextType = HomeContext;
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
    border: ${props => props.messaging ? "1px solid #21693f29" : "unset"};
    border-radius: 0 10px 10px 10px;
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
            padding: ${props => props.padding};
            display: inline-block;
            z-index: 1;
            cursor: text;
            /* -webkit-user-select: auto !important; */
            /* -moz-user-select: none; */
            /* Firefox 2+ */
            /* -ms-user-select: none; */
            /* IE 10+ */
            /* user-select: none; */

            /* Standard syntax */
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
