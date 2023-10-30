import React, { Component } from "react";
import styled from "styled-components";
import LoadingBtn from "./LoadingBtn";

export default class GrpConversation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        window.addEventListener('click', (e) => {
            const { conversationGrpDialog } = this.props.context;
            if (conversationGrpDialog) {
                if (!e.target.closest(".conversation-group") && !e.target.classList.contains("create-grp-elem")) {
                    this.props.closeThis("conversationGrpDialog");
                }
            }
        });
        console.info();
    }
    componentWillUnmount() {
        window.removeEventListener('click', (e) => {
            const { conversationGrpDialog } = this.props.context;
            if (conversationGrpDialog) {
                if (!e.target.closest(".conversation-group") && !e.target.classList.contains("create-grp-elem")) {
                    this.props.closeThis("conversationGrpDialog");
                }
            }
        });
    }
    render() {
        const {
            context, closeThis, position,
        } = this.props;
        const {
            handleGrpConversationChange, creatingGroup, groupNameError, descriptionsError,
            groupCreateError, handleGroupCreate, groupName, descriptions,
            conv_Grp_Template, handle_CG_File,
        } = context;
        const img_preview = [];
        conv_Grp_Template.forEach((val, attr) => {
            img_preview[0] = val;
        });
        var bgImage = img_preview.length > 0 ? `url(${img_preview[0]})` : "";
        return (
            <React.Fragment>
                <ConversationGroup
                    background_image={ bgImage }
                    className="conversation-group"
                    data-modal={ `conversation-group-modal` }
                    onClick={ e => {
                        if (e.target.dataset.modal == "conversation-group-modal") {
                            closeThis("conversationGrpDialog");
                        }
                    } }
                    position={ position }
                >
                    <div className="create-grp-content" style={ { overflow: "auto" } }>
                        <div className={ `modal-head-statement` }>
                            <h6>{ "Create chat GROUP" }</h6>
                        </div>
                        <hr />
                        <div className="conversation-group-inputs">
                            <div
                                className={ "inputCont" }
                                style={ {
                                    boxShadow: `${
                                        groupNameError
                                            ? "0px -1px 1px 0px whitesmoke, 0px 1px 1px 0px whitesmoke, 1px 0px 1px 0px red, -1px 0px 1px 0px red"
                                            : "0px -1px 1px 0px whitesmoke, 0px 1px 1px 0px whitesmoke, 1px 0px 1px 0px green, -1px 0px 1px 0px green"
                                        }`,

                                } }
                            >
                                <span className={ 'span-label' }>Group name</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="groupName" name="groupName"
                                    data-name="groupNameError" value={ groupName }
                                    required
                                    autoFocus
                                    autoCapitalize="true"
                                    onChange={ e => handleGrpConversationChange(e) }
                                    disabled={ creatingGroup }
                                    placeholder="e.g Prince and Princess"
                                />
                            </div>
                            <div
                                className={ "inputCont" }
                                style={ {
                                    boxShadow: `${
                                        descriptionsError
                                            ? "0px -1px 1px 0px whitesmoke, 0px 1px 1px 0px whitesmoke, 1px 0px 1px 0px red, -1px 0px 1px 0px red"
                                            : "0px -1px 1px 0px whitesmoke, 0px 1px 1px 0px whitesmoke, 1px 0px 1px 0px green, -1px 0px 1px 0px green"
                                        }`,

                                } }
                            >
                                <span className={ 'span-label' }>Descriptions</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="descriptions" name="descriptions"
                                    data-name="descriptionsError" value={ descriptions }
                                    required
                                    autoCapitalize="true"
                                    onChange={ e => handleGrpConversationChange(e) }
                                    disabled={ creatingGroup }
                                    placeholder="e.g King's son and daughter..."
                                />
                            </div>
                            <div className="create-grp-input" >
                                <label >Display photo</label>
                                <label htmlFor="displayPhoto"
                                    className="photo-select-cg"
                                    style={ { fontSize: " large" } }>
                                    <i className="fas fa-camera"></i>
                                </label>
                            </div>
                            <input type="file"
                                onChange={ handle_CG_File } style={ { display: "none" } }
                                id="displayPhoto" name="displayPhoto" />
                        </div>
                        <div className=" dialog-footer">
                            <button type="button"
                                className=" cancel-btn "
                                onClick={ e => closeThis("conversationGrpDialog") }>
                                Cancel
                            </button>
                            <button type="button"
                                disabled={ creatingGroup || groupNameError || descriptionsError }
                                className=" create-btn "
                                onClick={ e => handleGroupCreate(e) }>
                                { creatingGroup ?
                                    <LoadingBtn text={ "Creating" } />
                                    : "Create" }

                            </button>
                        </div>
                        { groupCreateError != "" && <div className="create-grp-error">{ groupCreateError }</div> }

                    </div>
                </ConversationGroup>
            </React.Fragment >
        );
    }
}
export const ConversationGroup = styled.div`
    position: ${ props => props.position};
    left: 0px;
    height: 100%;
    width: 100%;
    .create-grp-content {
        position: relative;
        background-color: #fefefe;
        border-radius: 5px;
        margin: 0 auto;
        top: 10%;
        padding: 3px 5px;
        width: 95%;
        box-shadow: 0px 22px 50px 0px #6c757d;
        -webkit-animation-name: saint_modal_content;
        animation-name: saint_modal_content;
        -webkit-animation-duration: 0.6s;
        animation-duration: 0.6s;
        .modal-head-statement{

        }
        .conversation-group-inputs{
            display: grid;
            grid-gap: 10px;
            .inputCont{
                position: relative;
                border-radius: 7px;
                .span-label{
                    position: absolute;
                    top: -10px;
                    left: 10px;
                    padding: 0 10px;
                    background: linear-gradient(180deg,#adb5bd,transparent 60%);
                    border-radius: 30%;
                    color: #3f5c75;
                    // opacity: 0.7;
                    font-weight: 600;
                    font-size:  ${props => props.windowWidth <= 400 ? "smaller" : props.windowWidth <= 768 ? "small" : ""};
                    line-height: 1.3;
                }
                .span-status{
                    position: absolute;
                    top: -10px;
                    right: 0;
                    font-size: smaller;
                    color: red;
                    background: white;
                    line-height: 1.2;
                }
                input, select{
                    border: unset;
                    padding: 0 0.75rem;
                    font-size: smaller;
                    height: 26px;   
                    &:focus{
                        border: unset;
                        outline: unset;
                        box-shadow: none;
                    }
                    &::-webkit-input-placeholder {
                        color: #a2a2a2;
                        font-size:  11px;
                    }
                    &::-moz-placeholder {
                    color: #a2a2a2;
                    font-size:  11px;
                    }
                    &:-ms-input-placeholder {
                    color: #a2a2a2;
                    font-size:  11px;
                    }
                    &::placeholder {
                    color: #a2a2a2;
                    font-size:  11px;
                    }
                }
            }
            .create-grp-input{
                display: grid;
                grid-auto-flow: column;
                justify-items: center;
                .photo-select-cg{
                    width: 100%;
                    text-align: center;
                    margin: 0;
                    color: ${props => props.background_image != "" ? "white" : ""};
                    background-image: ${props => props.background_image};
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
            }
        }
        .theme-setting-head {
            display: grid;
            align-items: center;
            background: rgba(221, 221, 221, 0.767);
            padding: 0px 0px 0px 10px;
            .modal-title {
                color: rgb(63, 92, 117);
            }
            .close-modal {
                display: grid;
                align-items: center;
                justify-items: center;
                position: absolute;
                top: 1px;
                right: 1px;
                width: 20px;
                padding: 0px 0px 2px 0px;
                line-height: normal;
                height: 20px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.1);
                color: red;
                transition: all ease-in 0.3s;
                &:hover {
                    color: white;
                    background-color: rgba(0, 0, 0, 0.4);
                }
            }
        }
        .modal-head-statement {
            color: rgb(63, 92, 117);
            font-size: small;
            text-align: center;
        }
        .dialog-footer {
            display: grid;
            grid-auto-flow: column;
            align-items: center;
            justify-items: center;
            .cancel-btn {
                border-radius: 30px;
                color: rgb(136, 161, 136);
                line-height: normal;
                font-size: small;
                padding: 1px 8px 1px 8px;
                background-color: transparent;
                transition: all ease-in 0.2s;
                &:focus {
                    outline-color: transparent;
                    outline-width: 0;
                }
            }
            .create-btn{
                border-radius: 30px;
                color: rgb(136, 161, 136);
                line-height: normal;
                font-size: small;
                padding: 1px 8px 1px 8px;
                background-color: transparent;
                transition: all ease-in 0.2s;
                cursor: pointer;
                &:focus {
                    outline-color: transparent;
                    outline-width: 0;
                }
                &:hover {
                    color: white;
                    background-color: rgb(59, 120, 58);
                }
                &:disabled{
                    cursor: not-allowed;
                    opacity: 0.6;
                }
            }
        }
        .create-grp-error{
            font-size: smaller;
            color: deeppink;
            text-align: center;
        }
    }
`;
