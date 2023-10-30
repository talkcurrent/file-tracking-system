import React, { Component } from "react";
import styled from "styled-components";
import LoadingBtn from "./LoadingBtn";

export default class Theme extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        window.addEventListener('click', (e) => {
            const { themeDialog } = this.props;
            if (themeDialog) {
                if (!e.target.closest(".theme-settings") && !e.target.classList.contains("msg-box-theme")) {
                    this.props.closeThis("themeSettingsDialog");
                }
            }
        });
        this.props.context.handleDefault(this.props.conversation);
    }
    componentWillUnmount() {
        window.removeEventListener('click', (e) => {
            const { themeDialog } = this.props;
            if (themeDialog) {
                if (!e.target.closest(".theme-settings") && !e.target.classList.contains("msg-box-theme")) {
                    this.props.closeThis("themeSettingsDialog");
                }
            }
        });
    }
    render() {
        const {
            themeHeadSettings, context, conversation,
            whichTheme, closeThis, position, btnText,
        } = this.props;
        const {
            handleThemeChange, handleThemeFile, handleApplyTheme, applyingTheme, themeResetting,
            head_footer, backgroundColor, textColor, handleThemeReset, themeCreateError
        } = context;
        return (
            <React.Fragment>
                <ThemeSettings
                    className="theme-settings"
                    data-modal={ `theme-settings-modal` }
                    onClick={ e => {
                        if (e.target.dataset.modal == "theme-settings-modal") {
                            closeThis("themeSettingsDialog");
                        }
                    } }
                    position={ position }
                >
                    <div className="theme-setting-content" style={ { overflow: "auto" } }>
                        <div className={ `modal-settings-statement` }>
                            <h6>{ themeHeadSettings }</h6>
                        </div>
                        <hr />
                        <div className="theme-settings-color">
                            <div className="color-input">
                                <label htmlFor="head">Header/footer color</label>
                                <div className="outter-input">
                                    <input
                                        type="color"
                                        onChange={ e => handleThemeChange(e, conversation) }
                                        // onInput={ e => handleThemeChange(e, conversation) }
                                        id="head" name="head_footer" data-name="head_footerError" value={ head_footer }
                                    />
                                </div>
                            </div>
                            <div className="color-input">
                                <label htmlFor="background">Background color</label>
                                <div className="outter-input">
                                    <input
                                        type="color"
                                        onChange={ e => handleThemeChange(e, conversation) }
                                        // onInput={ e => handleThemeChange(e, conversation) }
                                        id="background" name="backgroundColor" data-name="backgroundColorError" value={ backgroundColor }
                                    />
                                </div>
                            </div>
                            <div className="color-input">
                                <label htmlFor="text-color">Text color</label>
                                <div className="outter-input">
                                    <input
                                        type="color"
                                        onChange={ e => handleThemeChange(e, conversation) }
                                        // onInput={ e => handleThemeChange(e, conversation) }
                                        id="text-color" name="textColor" data-name="textColorError" value={ textColor }
                                    />
                                </div>
                            </div>
                            <div className="color-input">
                                <label >Background image</label>
                                <label htmlFor="background_img" style={ { fontSize: " large" } }>
                                    <i className="fas fa-camera"></i>
                                </label>
                            </div>
                            <input type="file"
                                onChange={ handleThemeFile } style={ { display: "none" } }
                                id="background_img" name="backgroundImg" />
                        </div>
                        <div className=" dialog-footer">
                            <button type="button"
                                className=" cancel-btn "
                                onClick={ e => closeThis("themeSettingsDialog") }>
                                Cancel
                            </button>
                            <button type="button"
                                disabled={ themeResetting }
                                className=" reset-btn "
                                onClick={ e => handleThemeReset(conversation) }>
                                { themeResetting ?
                                    <LoadingBtn text={ "Resetting" } />
                                    : "Reset" }

                            </button>
                            <button type="submit" className="settings-btn"
                                disabled={ applyingTheme }
                                onClick={ e => {
                                    handleApplyTheme(conversation, whichTheme);
                                } }>
                                { applyingTheme ?
                                    <LoadingBtn text={ "Applying" } />
                                    : btnText }
                            </button>
                        </div>
                        { themeCreateError != "" && <div className="theme-error">{ themeCreateError }</div> }

                    </div>
                </ThemeSettings>
            </React.Fragment >
        );
    }
}
export const ThemeSettings = styled.div`
    position: ${ props => props.position};
    left: 0px;
    height: 100%;
    width: 100%;
    .theme-setting-content {
        position: relative;
        background-color: #fefefe;
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
        .modal-settings-statement{

        }
        .theme-settings-color{
            display: grid;
            grid-gap: 2px;
            .color-input{
                display: grid;
                grid-template-columns: 70% 30%;
                align-items: center;
                input[type=color]{
                    background: unset;
                    border: unset;
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
        .modal-settings-statement {
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
            .reset-btn{
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
                &:hover {
                    color: white;
                    background-color: #495057;
                }
            }
            .settings-btn {
                border-radius: 30px;
                color: rgb(136, 161, 136);
                font-size: small;
                background-color: transparent;
                line-height: normal;
                padding: 1px 8px 1px 8px;
                transition: all ease-in 0.2s;
                &:hover {
                    color: white;
                    background-color: #0d7739;
                }
                &:focus {
                    outline-color: transparent;
                    outline-width: 0;
                }
            }
        }
        .theme-error{
            font-size: smaller;
            color: deeppink;
            text-align: center;
        }
    }
`;
