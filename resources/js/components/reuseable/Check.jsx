import React from 'react';
import styled from 'styled-components';

const Check = (props) => {
    const { obj, top, right, bottom, left, handleClick, absolute } = props;
    return (
        <CheckStyle
            top={ top } right={ right } bottom={ bottom } left={ left } absolute={ absolute }
        >
            <i className="fa fa-check check" aria-hidden="true"></i>
        </CheckStyle>
    );
};

export default Check;
export const CheckStyle = styled.div`
    position: ${props => props.absolute ? "absolute" : ""};
    top: ${props => props.top};
    right: ${props => props.right};
    bottom: ${props => props.bottom};
    left: ${props => props.left};
    padding: 0px 0px 2px 0px;
    display: grid;
    align-content: center;
    justify-content: center;
    color: red;
    background: #f8f9fac9;
    height: 20px;
    width: 20px;
    line-height: unset;
    font-weight: 900;
    font-size: larger;
    border-radius: 50%;
    cursor: pointer;
    .check-cont, .check{
        color: #5dc0b6;
        animation: check .2s cubic-bezier(0.895, 0.030, 0.685, 0.220) forwards;
        @keyframes check {
            from {
                opacity: 0;
                transform: scale(0.3);
            }
            to {
                opacity: 1;
                transform: scale(1)
            }
        }
    }
`;
