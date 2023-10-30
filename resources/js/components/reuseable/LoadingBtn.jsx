import React, { Component } from 'react';
import styled from "styled-components";

export default class LoadingBtn extends Component {
    render() {
        const { lineHeight, fontSize, fontWeight, loadMore, color } = this.props;
        return (
            <Saving
                lineHeight={ lineHeight }
                fontSize={ fontSize }
                color={ color }
                fontWeight={ fontWeight }
            >{ this.props.text } { loadMore ?
                <React.Fragment><span>&#8226;</span><span>&#8226;</span><span>&#8226;</span></React.Fragment>
                : <React.Fragment><span>&#46;</span><span>&#46;</span><span>&#46;</span></React.Fragment> }</Saving>
        );
    }
}
export const Saving = styled.span`
    line-height: ${props => props.lineHeight};
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
    font-weight: ${props => props.fontWeight};
    letter-spacing: 1px;
    span{
        animation-name: blinkkk;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        &:nth-child(2){
            animation-delay: 0.2s;
        }
        &:nth-child(3){
            animation-delay: 0.4s;
        }
        @-webkit-keyframes blinkkk {
            0% {
                opacity: 0.2;
            }
            20% {
                opacity: 1;
            }
            100% {
                opacity: 0.2;
            }
        }
            
        @keyframes blinkkk {
            0% {
                opacity: 0.2;
            }
            20% {
                opacity: 1;
            }
            100% {
                opacity: 0.2;
            }
        }
    }
`;
