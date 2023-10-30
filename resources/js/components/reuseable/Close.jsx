import React from 'react';
import styled from 'styled-components';

const Close = (props) => {
    const { top, right, bottom, left, handleClick } = props;
    return (
        <ClosePop
            top={ top }
            right={ right }
            bottom={ bottom }
            left={ left }
            height={ props.height }
            width={ props.width }
            fontSize={ props.fontSize }
            bgc={ props.bgc }
            onClick={ e => handleClick(e) }
        ><span className={ "plus" }>&times;</span></ClosePop>
    );
};

export default Close;
export const ClosePop = styled.div`
    position: absolute;
    top: ${props => props.top};
    right: ${props => props.right};
    bottom: ${props => props.bottom};
    left: ${props => props.left};
    padding: 0px 0px 2px 0px;
    display: grid;
    align-items: center;
    justify-items: center;
    color: red;
    background: ${props => props.bgc ? props.bgc : "#f8f9fac9"};
    height: ${props => props.height ? props.height : "20px"};
    width: ${props => props.width ? props.width : "20px"};
    border-radius: 50%;
    cursor: pointer;
    z-index: 30;
    .plus{
        line-height: 0;
        font-weight: 900;
        font-size: ${props => props.fontSize ? props.fontSize : "large"};
    }
`;