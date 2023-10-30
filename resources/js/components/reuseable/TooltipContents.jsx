import React, { useContext } from 'react';
import styled from 'styled-components';

const TooltipContents = (props) => {
    return (
        <TooltipContentsStyle
            minWidth={ props.minWidth }
            width={ props.width }
            gtr={ props.gtr }
            maxHeight={ props.maxHeight }
            height={ props.height }
            overflowY={ props.overflowY }
            bgc={ props.cardsBgc }
            color={ props.color }
            nav_color={ props.nav_color }
            padding={ props.padding }
            lineHeight={ props.lineHeight }
            alignItems={ props.alignItems }
            justifyItems={ props.justifyItems }
            fontSize={ props.fontSize }
        >
            { props.children }
        </TooltipContentsStyle>
    );
};

export default TooltipContents;
export const TooltipContentsStyle = styled.div`
    display: grid;
    gap: 5px;
    align-items: ${props => !props.alignItems ? "unset" : props.alignItems};
    grid-template-rows: ${props => props.gtr};
    justify-items: ${props => !props.justifyItems ? "unset" : props.justifyItems};
    background: ${props => props.bgc};
    color: ${props => props.color};
    min-width: ${props => props.minWidth};
    width: ${props => props.width ? props.width : "100%"};
    font-size: ${props => props.fontSize};
    max-width: ${props => props.maxWidth ? props.maxWidth : "100%"};
    height: ${props => props.height};
    max-height: ${props => props.maxHeight};
    overflow-y: ${props => props.overflowY};
    padding: ${props => props.padding};
    border-radius: 10px;
    line-height: ${props => !props.lineHeight ? "normal" : props.lineHeight};
    .listingd-tooltip{
        padding: 0px 4px;
        transition: all ease-in-out 0.2s;
        &:hover{
            color: whitesmoke;
            background: ${props => props.nav_color}
        }
    }
`;

