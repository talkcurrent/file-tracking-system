import React, { Component } from "react";
import styled from "styled-components";

export default class Warning extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        window.addEventListener('click', (e) => {
            const { warningDialog } = this.props;
            if (warningDialog) {
                if (!e.target.closest(".warning-modal") && !e.target.closest(".block-user")) {
                    this.props.closeThis("warningDialog");
                }
            }
        });
    }
    componentWillUnmount() {
        window.removeEventListener('click', (e) => {
            const { warningDialog } = this.props;
            if (warningDialog) {
                if (!e.target.closest(".warning-modal") && !e.target.closest(".block-user")) {
                    this.props.closeThis("warningDialog");
                }
            }
        });
    }
    render() {
        const {
            warningText, btnConfirmText,
            typeOfAction, closeThis, position,
            obj, actionAgainst, handleWarning
        } = this.props;
        return (
            <React.Fragment>
                <WarningDialog
                    className="warning-modal"
                    data-modal={ `warning-del-modal` }
                    onClick={ e => {
                        if (e.target.dataset.modal == "warning-del-modal") {
                            closeThis("warningDialog");
                        }
                    } }
                    position={ position }
                >
                    <div className="warning-modal-content" style={ { overflow: "auto" } }>
                        <div className={ `modal-warning-statement` }>
                            { warningText }
                        </div>
                        <div className=" dialog-footer">
                            <button type="button"
                                className=" cancel-btn "
                                onClick={ e => closeThis("warningDialog") }>
                                Cancel
                            </button>
                            <button type="submit" className="warning-btn"
                                onClick={ e => {
                                    handleWarning(typeOfAction, obj, actionAgainst);
                                    closeThis("warningDialog");
                                } }>
                                { btnConfirmText }
                            </button>
                        </div>
                    </div>
                </WarningDialog>
            </React.Fragment >
        );
    }
}
export const WarningDialog = styled.div`
    position: ${props => props.position};
    left: 0px;
    height: 100%;
    width: 100%;
    .warning-modal-content {
        position: relative;
        background-color: white;
        border-radius: 5px;
        margin: 0 auto;
        top: 10%;
        padding: 3px 5px;
        width: 95%;
        box-shadow: 0px 0px 50px 20px #6c757d;
        -webkit-animation-name: saint_modal_content;
        animation-name: saint_modal_content;
        -webkit-animation-duration: 0.6s;
        animation-duration: 0.6s;

        .warning-modal-head {
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
        .modal-warning-statement {
            color: rgb(63, 92, 117);
            font-size: small;
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
            .warning-btn {
                border-radius: 30px;
                color: rgb(136, 161, 136);
                font-size: small;
                background-color: transparent;
                line-height: normal;
                padding: 1px 8px 1px 8px;
                transition: all ease-in 0.2s;
                &:hover {
                    color: white;
                    background-color: #e3342f;
                }
                &:focus {
                    outline-color: transparent;
                    outline-width: 0;
                }
            }
        }
    }
`;
