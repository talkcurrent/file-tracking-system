import React from 'react';
import styled from 'styled-components';

function SuccessBlock(props) {
    return (
        <SuccessBlockStyle>
            {props.children }
        </SuccessBlockStyle>
    );
}

export default SuccessBlock;
const SuccessBlockStyle = styled.div`
    color: #048304;
    font-size: small;
    text-align: center;
`;