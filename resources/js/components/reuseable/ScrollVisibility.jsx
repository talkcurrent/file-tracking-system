import React from 'react';
import styled from 'styled-components';

const ScrollVisibility = (props) => {
    return (
        <ScrollVisibilityStyle
            top={ props.top }
            left={ props.left }
            right={ props.right }
            bottom={ props.bottom }
            width={ props.width }
            height={ props.height }
        >
            { props.children }
        </ScrollVisibilityStyle>
    );
};

export default ScrollVisibility;
export const ScrollVisibilityStyle = styled.div`
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    right: ${props => props.right};
    bottom: ${props => props.bottom};
    width: ${props => props.width};
    height: ${props => props.height};
    background: inherit;
`;
