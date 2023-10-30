import React from 'react';
import styled from 'styled-components';
import Close from '../reuseable/Close';

function DialogContent(props) {

    return (
        <DialogContentStyle
            bgc={ props.bgc }
            width={ props.width }
        >
            <Close
                absolute={ true }
                top={ "0px" } right={ "0px" }
                bottom={ "" } left={ "" }
                handleClick={ props.closeDialog }
            />
            {props.children }
        </DialogContentStyle>
    );
}

export default DialogContent;
const DialogContentStyle = styled.div`
    position: relative;
    background-color:${props => props.bgc ? props.bgc : "white"};
    width:${props => props.width};
    border-radius: 5px;
    clear: both;
    padding: 20px;
    height: max-content;
    max-height: 99vh;
    overflow: auto;
    -webkit-animation-name: bounce;
        animation-name: bounce;
        -webkit-transform-origin: center bottom;
        transform-origin: center bottom;
        animation-duration: 0.9s;
        @-webkit-keyframes bounce {
            from,
            20%,
            53%,
            80%,
            to {
                -webkit-animation-timing-function: cubic-bezier(
                    0.215,
                    0.61,
                    0.355,
                    1
                );
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }

            40%,
            43% {
                -webkit-animation-timing-function: cubic-bezier(
                    0.755,
                    0.05,
                    0.855,
                    0.06
                );
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                -webkit-transform: translate3d(0, -30px, 0);
                transform: translate3d(0, -30px, 0);
            }

            70% {
                -webkit-animation-timing-function: cubic-bezier(
                    0.755,
                    0.05,
                    0.855,
                    0.06
                );
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                -webkit-transform: translate3d(0, -15px, 0);
                transform: translate3d(0, -15px, 0);
            }

            90% {
                -webkit-transform: translate3d(0, -4px, 0);
                transform: translate3d(0, -4px, 0);
            }
        }

        @keyframes bounce {
            from,
            20%,
            53%,
            80%,
            to {
                -webkit-animation-timing-function: cubic-bezier(
                    0.215,
                    0.61,
                    0.355,
                    1
                );
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }

            40%,
            43% {
                -webkit-animation-timing-function: cubic-bezier(
                    0.755,
                    0.05,
                    0.855,
                    0.06
                );
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                -webkit-transform: translate3d(0, -30px, 0);
                transform: translate3d(0, -30px, 0);
            }

            70% {
                -webkit-animation-timing-function: cubic-bezier(
                    0.755,
                    0.05,
                    0.855,
                    0.06
                );
                animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
                -webkit-transform: translate3d(0, -15px, 0);
                transform: translate3d(0, -15px, 0);
            }

            90% {
                -webkit-transform: translate3d(0, -4px, 0);
                transform: translate3d(0, -4px, 0);
            }
        }

    .modal-head {
        display: grid;
        align-items: center;
        justify-items: center;
        font-weight: lighter;
        .close-modal {
            display: grid;
            align-items: center;
            justify-items: center;
            position: absolute;
            top: 1px;
            right: 1px;
            width: 20px;
            padding: 0px 0px 2px 0px;
            line-height: normal;
            height: 20px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.1);
            color: red;
            transition: all ease-in 0.3s;
            &:hover {
                color: white;
                background-color: rgba(0, 0, 0, 0.4);
            }
        }
    }
    
 `;
