import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ActionBtn from './ActionBtn';

function Form(props) {
    const {
        btnWidth, gap, processing, progressText, btnSubmitText, width,
        handleSubmit, handleCancel, disabled, submitBtnBgc, submitBtnColor,
    } = props;

    return (
        <FormStyle
            gap={ gap }
            width={ width }
        >
            {props.children }
            <div className="form-btns">
                <ActionBtn
                    processing={ processing }
                    progressText={ progressText }
                    btnText={ btnSubmitText }
                    btnClick={ handleSubmit }
                    disabled={ disabled }
                    bgc={ submitBtnBgc }
                    color={ submitBtnColor }
                    justify={ "center" }
                    width={ btnWidth ? btnWidth : "max-content" }
                />
            </div>
        </FormStyle>
    );
}

export default Form;
const FormStyle = styled.div`
    display: inline-grid;
    width: ${props => props.width};
    gap: ${props => props.gap};
    min-width: 50%;
    .form-btns{
        display: grid;
        grid-auto-flow: column;
        justify-items: center;
    }
 `;
