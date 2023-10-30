import React from 'react';
import styled from 'styled-components';

const LoadingDialog = (props) => {

    return (
        <DialogStyle bgc={ props.bgc }>
            {props.children }
        </DialogStyle>
    );
};

export default LoadingDialog;

const DialogStyle = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background: ${props => props.bgc};
    z-index: 100;
    display: grid;
    justify-items: center;
    align-items: center;
`;