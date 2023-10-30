import React, { Component } from "react";
import styled from "styled-components";

export default class Loading extends Component {
    render() {
        return (
            <Spinner
                fixed={ this.props.fixed }
                contBorderRadius={ this.props.contBorderRadius }
                background={ this.props.background }
                bgc={ this.props.bgc }
            >
                <Loader
                    loaderPos={ this.props.loaderPos }
                    borderRadius={ this.props.borderRadius }
                    transformOrigin={ this.props.transformOrigin }
                    width={ this.props.width }
                    height={ this.props.height }
                    loaderColor={ this.props.loaderColor ? this.props.loaderColor : "#0051a2" }
                >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </Loader>
            </Spinner>
        );
    }
}
export const Spinner = styled.div`
    position: ${props => (props.fixed ? "fixed" : "absolute")};
    background-color: ${props =>
        props.background === false ? "transparent" :
            props.bgc ? props.bgc :
                props.fixed ?
                    "rgba(0, 0, 0, 0.4)" :
                    "rgba(0, 0, 0, 0.2)"
    };
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
    border-radius: ${props => props.contBorderRadius};
    justify-items: center;
`;
export const Loader = styled.div`
    position: relative;
    display: grid;
    width: 0;
    margin: 0 auto;
    border-radius: 5px;
    top: ${props => props.loaderPos};
    clear: both;
    div {
        position: absolute;
        animation: animate-div linear 1s infinite;
        background: #0051a2;
        width: ${props => props.width}; 
        height: ${props => props.height};
        border-radius: ${props => props.borderRadius};
        transform-origin: ${props => props.transformOrigin};
    }
    div:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -0.9166666666666666s;
        background: ${props => props.loaderColor};
    }
    div:nth-child(2) {
        transform: rotate(30deg);
        animation-delay: -0.8333333333333334s;
        background: ${props => props.loaderColor};
    }
    div:nth-child(3) {
        transform: rotate(60deg);
        animation-delay: -0.75s;
        background: ${props => props.loaderColor};
    }
    div:nth-child(4) {
        transform: rotate(90deg);
        animation-delay: -0.6666666666666666s;
        background: ${props => props.loaderColor};
    }
    div:nth-child(5) {
        transform: rotate(120deg);
        animation-delay: -0.5833333333333334s;
        background: ${props => props.loaderColor};
    }
    div:nth-child(6) {
        transform: rotate(150deg);
        animation-delay: -0.5s;
        background: ${props => props.loaderColor};
    }
    div:nth-child(7) {
        transform: rotate(180deg);
        animation-delay: -0.4166666666666667s;
        background: ${props => props.loaderColor};
    }
    div:nth-child(8) {
        transform: rotate(210deg);
        animation-delay: -0.3333333333333333s;
        background: ${props => props.loaderColor};
    }
    div:nth-child(9) {
        transform: rotate(240deg);
        animation-delay: -0.25s;
        background: ${props => props.loaderColor};
    }
    div:nth-child(10) {
        transform: rotate(270deg);
        animation-delay: -0.16666666666666666s;
        background: ${props => props.loaderColor};
    }
    div:nth-child(11) {
        transform: rotate(300deg);
        animation-delay: -0.08333333333333333s;
        background: ${props => props.loaderColor};
    }
    div:nth-child(12) {
        transform: rotate(330deg);
        animation-delay: 0s;
        background: ${props => props.loaderColor};
    }
`;
