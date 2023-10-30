import React, { Component } from "react";
import styled from "styled-components";

export class CustomTextarea extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.textInput = React.createRef();
    }

    componentDidMount() {
        this.textInput.current.focus();
    }
    render() {
        this.textInput.current ? (this.props.emptyTextarea == true ? (this.textInput.current.innerHTML = "") : "") : "";
        return (
            <Textarea editableempty={ this.props.editableempty } width={ this.props.width } miniHeight={ this.props.miniHeight } padding={ this.props.padding }>
                <div className="placeholder"> { this.props.editableempty === "true" ? this.props.placeholder : "" }</div>
                <div className="customTextarea">
                    <span
                        className="textarea"
                        width={ this.props.width }
                        onInput={ this.props.oninput }
                        onKeyPress={ this.props.onkeypress }
                        name={ this.props.name }
                        required
                        ref={ this.textInput }
                        suppressContentEditableWarning
                        contentEditable={ this.props.editable }
                        autoFocus
                        placeholder={ this.props.placeholder }
                    ></span>
                    { this.props.controlAbsolute == "true" ? (
                        <div className="text-btns">
                            <div className="btn-capture" title="Capture image and upload"></div>
                            <label className="btn-img-upload" title="Upload photo" htmlFor={ this.props.id }>
                                <input onChange={ this.props.onchange } style={ { display: "none" } } id={ this.props.id } type="file" multiple />
                            </label>
                            <div className="btn-emoji" title="Insert emoji"></div>
                        </div>
                    ) : (
                            ""
                        ) }
                </div>
            </Textarea>
        );
    }
}
export const Textarea = styled.span`
    display: grid;
    width: 100%;
    .placeholder {
        grid-row: 1;
        grid-column: 1;
        height: 100%;
        color: rgb(155, 155, 155);
        font-size: 16px;
        background: rgb(238, 238, 238);
        font-style: italic;
        font-family: fantasy;
        border-radius: 10px;
        padding: ${props => props.padding};
    }
    .customTextarea {
        position: relative;
        grid-row: 1;
        grid-column: 1;
        .textarea {
            min-height: ${props => props.miniHeight};
            width: ${props => props.width};
            border: none;
            word-wrap: break-word;
            word-break: break-word;
            border-radius: 10px;
            color: gray;
            background-color: ${props => (props.editableempty === "true" ? "rgb(0, 0, 0, 0)" : "rgb(238, 238, 238)")};
            padding: ${props => props.padding};
            display: inline-block;
            z-index: 1;
            cursor: text;
            -webkit-user-select: auto !important;
            -moz-user-select: none;
            /* Firefox 2+ */
            -ms-user-select: none;
            /* IE 10+ */
            user-select: none;

            /* Standard syntax */
            &:focus {
                .placeholder {
                    color: rgb(163, 136, 136);
                }
                outline: none;
                outline-width: 0;
                background-color: ${props => (props.editableempty === "true" ? "rgb(0, 0, 0, 0)" : "rgb(238, 238, 238)")};
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
        .text-btns {
            display: grid;
            grid-gap: 10px;
            position: absolute;
            grid-auto-flow: column;
            bottom: 2px;
            right: 10px;
            background: transparent;
            .btn-capture {
                display: block;
                background-image: url("/storage/image/snap_image_black.png");
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                padding: 8px;
                opacity: 0.4;
                align-self: center;
                justify-self: center;
                margin: 0px;
                cursor: pointer;
            }

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
                background-image: url("/storage/image/add_emoji.png");
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                padding: 9px;
                opacity: 0.6;
                align-self: center;
                justify-self: center;
                margin: 0px;
                cursor: pointer;
            }
        }
    }
`;
