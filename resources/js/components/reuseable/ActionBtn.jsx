import React from 'react';
import styled from 'styled-components';
import LoadingBtn from './LoadingBtn';

const ActionBtn = (props) => {
    const { processing, progressText, btnText, btnClick, disabled } = props;
    return (
        <ActionBtnStyle
            justify={ props.justify }
            bgc={ props.bgc }
            color={ props.color }
            width={ props.width }
            border={ props.border }
            fWeight={ props.fWeight }
            fontSize={ props.fontSize }
            disabled={ disabled }
        >
            <button
                disabled={ disabled }
                onClick={ e => { btnClick ? btnClick() : ""; } }
            >

                { processing ?
                    <LoadingBtn text={ progressText } lineHeight={ "unset" }
                        fontSize={ "small" } fontWeight={ 300 } loadMore={ false } />
                    : btnText }
            </button>
        </ActionBtnStyle>
    );
};

export default ActionBtn;
export const ActionBtnStyle = styled.div`
    display: grid;
    align-items: center;
    justify-items: ${props => props.justify};
    margin: 2px 0;
    button{
        border-radius: 5px;
        background: ${props => props.bgc};
        color: ${props => props.color};
        border: ${props => props.border ? `${props.border}!important` : ""};
        font-weight: ${props => props.fWeight ? props.fWeight : 100};
        width: ${props => props.width};
        font-size: ${props => props.fontSize};
        cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
        &:hover{
            opacity: 0.8;
        }
    }
`;
