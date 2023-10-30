import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Close from '../reuseable/Close';

function Dialog(props) {

    useEffect(() => {
        if (props.dialogMounted) {
            props.dialogMounted();
        }
    }, []);

    return (
        <DialogStyle>
            {props.handleClose ?
                <Close
                    absolute={ true }
                    top={ "0px" } right={ "0px" }
                    bottom={ "" } left={ "" }
                    handleClick={ props.handleClose }
                />
                : "" }
            {props.children }
        </DialogStyle>
    );
}

export default Dialog;
const DialogStyle = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 35;
    display: grid;
    justify-items: center;
    align-items: center;
    overflow: auto;
    
`;
