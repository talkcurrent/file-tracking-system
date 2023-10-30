import React from 'react';
import styled from 'styled-components';

const Heart = (props) => {
    const { hasLiked, fontSize, title, handleClick, animate } = props;
    return (
        <HeartStyle
            onClick={ e => handleClick() }
            title={ title }
            fontSize={ fontSize }
            className={ `${hasLiked ? "fas" : "far"} fa-heart ${animate ? "beat" : ""}` }
        ></HeartStyle>
    );
};

export default Heart;
export const HeartStyle = styled.i`
    line-height: normal;
    color: #f66d9b;
    font-size: ${props => props.fontSize};
    cursor: pointer;
    &.beat {
        -webkit-animation-name: heartBeat;
        animation-name: heartBeat;
        -webkit-animation-duration: 1.3s;
        animation-duration: 1.3s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
    }
    @keyframes heartBeat {
        0% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        14% {
            -webkit-transform: scale(1.3);
            transform: scale(1.3);
        }

        28% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }

        42% {
            -webkit-transform: scale(1.3);
            transform: scale(1.3);
        }

        70% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
`;
