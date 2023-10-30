import React from 'react';
import styled from 'styled-components';

const FormSelInput = (props) => {
    const {
        justifySelf, width, error, label,
        handleChange,
        value, disabled, nameUniq, selectText
    } = props;
    return (
        <FormSelInputStyle
            justifySelf={ justifySelf }
            width={ width }
        >
            <div
                className={ "inputCont" }
                style={ {
                    boxShadow: "0px -1px 1px 0px whitesmoke, 0px 1px 1px 0px whitesmoke, 1px 0px 1px 0px #9E9E9E, -1px 0px 1px 0px #9E9E9E",
                    background: "white",
                    border: error ? "1px solid deeppink" : ""
                } }
            >
                <span className={ 'span-label' }>{ label }</span>
                <select
                    onChange={ e => handleChange(e) }
                    value={ value }
                    disabled={ disabled } className="form-control"
                    name={ nameUniq } id={ nameUniq }
                >
                    { selectText ?
                        <option value="">{ selectText }</option>
                        : "" }
                    { props.children }
                </select>
            </div>
        </FormSelInputStyle>
    );
};

export default FormSelInput;
export const FormSelInputStyle = styled.div`
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
            color:#212529;
            font-weight: 500;
            line-height: 1.3;
            text-shadow: -1px -1px 1px white;
            font-size:  ${props => props.windowWidth <= 400 ? "smaller" : props.windowWidth <= 768 ? "small" : ""};
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
            top: -10px;
            right: 0;
            font-size: smaller;
            color: red;
            background: white;
            line-height: 1.2;
        }
        input, select{
            border: unset;
            border-radius: 10px;
            padding: 0 0.75rem;
            font-size: smaller;
            height: 26px; 
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
