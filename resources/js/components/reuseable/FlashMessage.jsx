import React from 'react';
import styled from 'styled-components';

const FlashMessage = (props) => {
    const { error, msg } = props;
    return (
        <MessageFlash error={ error } >
            <div className="message-icon">
                { error === true ? <div className="m-i-danger"><span>+</span></div> : "" }
                { error === false ? <div className="m-i-success"></div> : "" }
            </div>
            <div className="msg flash">
                { msg }
            </div>
        </MessageFlash>
    );
};

export default FlashMessage;
export const MessageFlash = styled.div`
    display: grid;
    grid-gap: 0.3rem;
    grid-auto-flow: column;
    position: fixed;
    top: 10%;
    right: 5px;
    color: ${props => props.error ? "red" : "#63b385"};
    background: whitesmoke;
    padding: 0.5rem;
    box-shadow: -2px 4px 5px 0px #a2a2a2, -2px -1px 5px 0px #a2a2a2;
    border-radius: 10px 0px 0px 10px;
    font-style: italic;
    font-family: serif;
    z-index: 150;
    -webkit-animation: slideInRight .2s;
    -webkit-animation: slideInRight .2s;
    animation: slideInRight .2s;
    .message-icon{
        display: grid;
        padding: 0 10px;
        /* background: #63b385; */
        align-items: center;
        justify-items: center;
        border-radius: 50%;
        height: 1.5rem;
        width: 1.5rem;
        border: ${props => props.error ? "1px solid red" : "1px solid #63b385"};
        justify-content: center;
        .m-i-success{
            border-color: #009933;
            border-style: solid;
            border-width: 0 0.3em 0.25em 0;
            height: 1em;
            margin-top: -0.2rem;
            margin-left: -0.17rem;
            transform: rotate(45deg);
            width: 0.5em;
            /* animation-delay: 3s; */
            -webkit-animation: report .2s cubic-bezier(0.895,0.030,0.685,0.220) forwards;
            -webkit-animation: report .2s cubic-bezier(0.895,0.030,0.685,0.220) forwards;
            animation: report .2s cubic-bezier(0.895,0.030,0.685,0.220) forwards;
            @keyframes report {
                from {
                    opacity: 0;
                    transform: scale(0.3) rotate(45deg);
                }
                to {
                    opacity: 1;
                    transform: scale(1) rotate(45deg);
                }
            }
        }
        .m-i-danger{
            margin-top: -0.1rem;
            margin-left: 0.1rem;
            transform: scale(1.8) rotate(45deg);
            -webkit-animation: report 1s;
            -webkit-animation: report 1s;
            animation: report 1s;
            color: red;
            @keyframes report {
                from {
                    opacity: 0;
                    transform: scale(0.3) rotate(45deg);
                }
                to {
                    opacity: 1;
                    transform: scale(1) rotate(45deg);
                }
            }
        }
    }
    @-webkit-keyframes slideInRight {
        from {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
            visibility: visible;
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes slideInRight {
        from {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
            visibility: visible;
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }
`;
