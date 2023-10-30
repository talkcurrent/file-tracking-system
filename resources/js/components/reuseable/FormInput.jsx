import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoadingBtn from './LoadingBtn';
import ToolTip from './ToolTip';

const FormInput = (props) => {
    const [elemParams, setParams] = useState({});
    const [toolTip, setToolTip] = useState(false);

    const {
        inputHeight, inputTextColor, help, type, thisValue, handleChange, handleKeypress, handleKeyUp, windowWidth,
        label, disabled, nameUniq, placeholder, error, ancestor,
        availabilityCheck, checking, checkResult, textarea, compulsory
    } = props;

    useEffect(() => {
        if (document.querySelector(`.${ancestor}`)) {
            document.querySelector(`.${ancestor}`)
                .addEventListener("click", handleToolTipClose, true);
        }
        return () => {
            if (document.querySelector(`.${ancestor}`)) {
                document.querySelector(`.${ancestor}`)
                    .removeEventListener("click", handleToolTipClose, true);
            }
        };
    }, []);


    const handleToolTip = (event) => {
        const params = event.target.parentElement.getBoundingClientRect();
        setParams(params);
        setToolTip(!toolTip);
    };
    const handleToolTipClose = (e) => {
        if (!e.target.closest(`.span-label-inside`)) {
            setToolTip(false);
        }
    };

    return (
        <TextInputStyle
            windowWidth={ windowWidth }
            justifySelf={ props.justifySelf }
            width={ props.width }
            fSize={ props.fSize }
        >
            <div
                className={ "inputCont" }
                style={ {
                    boxShadow: "0px -1px 1px 0px whitesmoke, 0px 1px 1px 0px whitesmoke, 1px 0px 1px 0px #9E9E9E, -1px 0px 1px 0px #9E9E9E",
                    background: "white",
                    border: error ? "1px solid deeppink" : ""
                } }
            >
                <span className=" span-label">
                    <div className="span-label-inside">
                        { label != "" ? <span className={ 'span' }>{ label }</span> : "" }
                        { compulsory ?
                            <i
                                className={ 'fas fa-asterisk' }
                                style={ { color: "deeppink", fontSize: "7px", verticalAlign: "super", marginLeft: "5px" } }
                            ></i> : "" }
                        { help ?
                            <React.Fragment>
                                <i
                                    className="fas fa-question-circle"
                                    onClick={ e => { handleToolTip(e); } }
                                ></i>
                                { toolTip ?
                                    <ToolTip
                                        elemParams={ elemParams }
                                    >
                                        <div className="tooltip-insider">
                                            { props.children }
                                        </div>
                                    </ToolTip>
                                    : "" }
                            </React.Fragment>
                            : "" }
                    </div>
                </span>
                { textarea == true ?
                    <textarea
                        style={ { height: inputHeight, color: inputTextColor } }
                        rows={ 4 }
                        name={ nameUniq }
                        id={ nameUniq } required
                        autoCapitalize="true" value={ thisValue }
                        onChange={ e => handleChange(e) } disabled={ disabled }
                        onKeyPress={ e => handleKeypress ? handleKeypress(e) : {} }
                        onKeyUp={ e => handleKeyUp ? handleKeyUp(e) : {} }
                        placeholder={ placeholder }
                        disabled={ disabled }
                    ></textarea>
                    :
                    <input
                        style={ { height: inputHeight, color: inputTextColor } }
                        type={ type } name={ nameUniq }
                        id={ nameUniq } required
                        autoFocus={ props.autoFocus }
                        autoCapitalize="true" value={ thisValue }
                        onChange={ e => handleChange(e) }
                        onKeyPress={ e => handleKeypress ? handleKeypress(e) : {} }
                        onKeyUp={ e => handleKeyUp ? handleKeyUp(e) : {} }
                        disabled={ disabled }
                        placeholder={ placeholder }
                    />
                }
                { availabilityCheck ?
                    <span className={ "span-status" }>
                        { checking ?
                            <LoadingBtn text={ "Checking" } />
                            :
                            <span>{ checkResult }</span>
                        }
                    </span>
                    : "" }
            </div>
        </TextInputStyle>
    );
};

export default FormInput;
export const TextInputStyle = styled.div`
    justify-self: ${props => props.justifySelf};
    width: ${props => props.width};
    .inputCont{
        position: relative;
        border-radius: 10px;
        margin-bottom: 5px;
        .span-label{
            position: absolute;
            top: -13px;
            left: 10px;
            padding: 0 10px;
            background: linear-gradient(180deg,rgba(0, 0, 0, 0.06),#ffff 60%);
            border-radius: 30%;
            color: #212529;
            font-weight: 500;
            line-height: 1.3;
            text-shadow: -1px -1px 1px white;
            font-size:  ${props => props.windowWidth <= 400 ? "smaller" : props.windowWidth <= 768 ? "medium" : ""};
            .span-label-inside{
                position: relative;
                .tooltip-insider{
                    background: white;
                    width: 200px;
                    p{
                        margin: 0;
                        text-shadow: unset;
                    }
                }
            }
        }
        .span-status{
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0;
            visibility: hidden;
            font-size: smaller;
            color: red;
            background: white;
            line-height: 1.2;
            display: grid;
            align-items: center;
            font-family: serif;
        }
        .span-status span:first-child {
            visibility: visible;
            background: white;
            padding: 0 2px;
        }
        input, select, textarea{
            border: unset;
            border-radius: 10px;
            padding: 05px 0.75rem 0 0.75rem;
            font-size: ${props => props.fSize ? props.fSize : "smaller"};
            /* height: 26px;  */
            width: 100%;  
            &:focus{
                border: unset;
                outline: unset;
                box-shadow: none;
            }
            &::-webkit-input-placeholder {
                color: #a2a2a2;
                font-size:  12px;
                font-style: italic;
                font-family: serif;
            }
            &::-moz-placeholder {
                color: #a2a2a2;
                font-size:  12px;
                font-style: italic;
                font-family: serif;
            }
            &:-ms-input-placeholder {
                color: #a2a2a2;
                font-size:  12px;
                font-style: italic;
                font-family: serif;
            }
            &::placeholder {
                color: #a2a2a2;
                font-size:  12px;
                font-style: italic;
                font-family: serif;
            }
        }
    }
`;