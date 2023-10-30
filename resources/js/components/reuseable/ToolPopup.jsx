import React, { Component } from 'react';
import styled from "styled-components";

export default class ToolPopup extends Component {

    render() {
        const { toolId, task } = this.props;
        return (
            <Popup left={ this.props.left } right={ this.props.right } className="popUp">
                <div className="toolPopup-header">Sure?</div>
                <div className="line-seperator"></div>
                <div className="toolPopup-btns">
                    <button
                        className="no-option"
                        onClick={ e =>
                            this.props.handlePopup(toolId, "no", task, e)
                        }
                    >No</button>
                    <button
                        className="yes-option"
                        onClick={ e =>
                            this.props.handlePopup(toolId, "yes", task, e)
                        }
                    >YES</button>
                </div>
            </Popup>
        );
    }
}
export const Popup = styled.div`
    position: absolute;
    left:  ${ props => props.left};
    right:  ${ props => props.right};
    background: rgba(2, 45, 88, 0.86);
    color: white;
    bottom: 100%;
    border-radius: 7px 7px 0 0;
    padding: 5px;
    .toolPopup-header{
        text-align: center;
        color: #dee2e6;
        width: 100%;
        line-height: 1.2;
    }
    .line-seperator{
        background: #adb5bd;
        height: 1px;
        margin-bottom: 4px;
    }
    .toolPopup-btns{
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        grid-gap: 3px;
        .no-option{
            color: white;
            background: rgba(192, 192, 192, 0.46);
            padding: 0px 4px;
            line-height: 1.2;
            border-radius: 5px;
            width: 100%;
            align-self: center;
        }
        .yes-option{
            color: white;
            background: red;
            padding: 0px 4px;
            line-height: 1.2;
            border-radius: 5px;
            width: 100%;
            align-self: center;
        }
    }
`;
