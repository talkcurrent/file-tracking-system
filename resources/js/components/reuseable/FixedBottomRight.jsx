import React from 'react';
import styled from 'styled-components';

const FixedBottomRight = (props) => {
    const { bottom, right, bRadius } = props;
    return (
        <FixedBottomRightStyle
            bottom={ bottom }
            right={ right }
            bRadius={ bRadius }
        >
            { props.children }
        </FixedBottomRightStyle>
    );
};

export default FixedBottomRight;
export const FixedBottomRightStyle = styled.div`
    position: fixed;
    bottom: ${props => props.bottom};
    right: ${props => props.right};
    border-radius: ${props => props.bRadius};
    width: auto;
    line-height: 1.5;
    z-index: 32;
`;
