import React from 'react';
import styled from 'styled-components';

function ErrorBlock(props) {
    return (
        <ErrorBlockStyle>
            {props.children }
        </ErrorBlockStyle>
    );
}

export default ErrorBlock;
const ErrorBlockStyle = styled.div`
    color: deeppink;
    font-size: small;
    text-align: center;
`;
