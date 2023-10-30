import React, { Component } from 'react';
import styled from "styled-components";

export default class AwaitResponse extends Component {
    render() {
        return (
            <ResponseAwait>
                <div className="awaitRes animate ">
                    <div className={ `await-fill` }></div>
                    <div className={ `await-fill` }></div>
                    <div className={ `await-fill` }></div>
                    <div className={ `await-fill` }></div>
                    <div className={ `await-fill` }></div>
                    <div className={ `await-fill` }></div>
                    <div className={ `await-fill` }></div>
                </div>
            </ResponseAwait>
        );
    }
}
export const ResponseAwait = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(230, 234, 237, 0.7);
    transition: all ease-in 1s;
    
    .awaitRes{
        display: grid;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        .await-fill:nth-child(odd){
            background: #f8f9fa9e;
        }
        .await-fill:nth-child(even){
            background: #adb1b5;
        }
        &:before {
            position: absolute;
            top: 0;
            left: -75%;
            z-index: 2;
            display: block;
            content: "";
            width: 50%;
            height: 100%;
            background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
            background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
            /* -webkit-transform: skewX(-25deg);
            transform: skewX(-25deg); */
        }
        &:after {
            position: absolute;
            top: 0;
            left: 75%;
            z-index: 2;
            display: block;
            content: "";
            width: 50%;
            height: 100%;
            background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
            background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
            /* -webkit-transform: skewX(-25deg);
            transform: skewX(-25deg); */
        }
        &.animate {
            &::before {
                -webkit-animation: shine 1s ease-in infinite;
                animation: shine 1s ease-in infinite;
            }
            @-webkit-keyframes shine {
                100% {
                    left: 125%;
                }
            }
            @keyframes shine {
                100% {
                    left: 125%;
                }
            }
        }
        &.animate {
            &::after {
                -webkit-animation: moving 1.5s ease-out infinite;
                animation: moving 1.5s ease-out infinite;
            }
            @-webkit-keyframes moving {
                100% {
                    left: -125%;
                }
            }
            @keyframes moving {
                100% {
                    left: -125%;
                }
            }
        }
    }
`;
