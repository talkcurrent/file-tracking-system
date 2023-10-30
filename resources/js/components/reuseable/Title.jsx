import React from 'react';
import styled from 'styled-components';

const Title = (props) => {
    const { color, fontSize, mBottom, windowWidth, textAlign, boxShadow } = props;
    return (
        <TitleStyle
            color={ color }
            fontSize={ fontSize }
            mBottom={ mBottom }
            windowWidth={ windowWidth }
            textAlign={ textAlign }
            boxShadow={ boxShadow }
        >{ props.children }</TitleStyle>
    );
};

export default Title;
export const TitleStyle = styled.h5`
    font-size: ${props => props.windowWidth <= 400 ? ""
        : props.windowWidth <= 600 ? "medium"
            : props.windowWidth <= 800 ? "large" : "initial"};
    color: ${props => props.color};
    text-align: ${props => props.textAlign};
    margin-bottom: ${props => props.mBottom};
    text-shadow: ${props => props.boxShadow};
`;
