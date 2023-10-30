import React from 'react';
import styled from 'styled-components';

const Head = (props) => {
    return (
        <HeadStyle
            fontSize={ props.fontSize }
            fontWeight={ props.fontWeight }
            color={ props.color }
            lineHeight={ props.lineHeight }
            padding={ props.padding }
        >{ props.children }</HeadStyle>
    );
};

export default Head;
const HeadStyle = styled.strong`
    display:block;
    font-size: ${props => props.fontSize};
    font-weight: ${props => props.fontWeight};
    color: ${props => props.color};
    line-height: ${props => props.lineHeight};
    padding: ${props => props.padding};
`;
