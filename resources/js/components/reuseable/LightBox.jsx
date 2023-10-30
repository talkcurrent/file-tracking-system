import React, { Component } from 'react';
import styled from "styled-components";
import { AdminContext } from "../index/AdminContext";

export default class LightBox extends Component {
    constructor() {
        super();
        this.state = {
            lendBtnHeight: "",
        };
    }
    render() {
        return (
            <AdminContext.Consumer>
                { context => {
                    const { authUser } = context;
                    return (
                        <React.Fragment>
                            <LightBoxModal className={ `lightbox-dialog` }
                                onClick={ e => {
                                    if (e.target.classList.contains("lightbox-dialog")) {
                                        this.props.handleClose(e);
                                    }
                                } }
                            >
                                <DialogContent windowWidth={ context.windowWidth }>
                                    <div style={ { width: "100%", display: "grid", justifyItems: "center" } }>
                                        <img
                                            src={ this.props.imageSrc }
                                            alt={ this.props.imageSrc }
                                            style={ { objectFit: "contain", maxWidth: "100%" } }
                                            className=""
                                        />
                                    </div>
                                    <div className="lend-btns">
                                        <button className={ `reg-cancel` }
                                            onClick={ e => this.props.handleClose(e) }
                                        >Close</button>
                                    </div>
                                </DialogContent>
                            </LightBoxModal>
                        </React.Fragment>
                    );
                } }
            </AdminContext.Consumer>
        );
    }
}
export const LightBoxModal = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 100;
    overflow: auto;
    justify-items: center;
`;
export const DialogContent = styled.div`
    display: grid;
    grid-gap: 4px;
    position: relative;
    margin: 0 auto;
    background-color: #00004e;
    border-radius: 5px;
    top: 20px;
    clear: both;
    padding: 20px;
    width: ${props =>
        props.windowWidth <= 400
            ? "100vw"
            : props.windowWidth <= 768
                ? "80vw"
                : props.windowWidth <= 900
                    ? "80vw"
                    : "60vw"};
    -webkit-animation-name: zoomIn;
    animation-name: zoomIn;
    -webkit-transform-origin: center top;
    transform-origin: center top;
    animation-duration: 0.5s;
    @-webkit-keyframes zoomIn {
        from {
          opacity: 0;
          -webkit-transform: scale3d(0.3, 0.3, 0.3);
          transform: scale3d(0.3, 0.3, 0.3);
        }
      
        50% {
          opacity: 1;
        }
      }
      
      @keyframes zoomIn {
        from {
          opacity: 0;
          -webkit-transform: scale3d(0.3, 0.3, 0.3);
          transform: scale3d(0.3, 0.3, 0.3);
        }
      
        50% {
          opacity: 1;
        }
      }
    label{
        color: navy;
        font-weight: bold;
    }

    .lend-btns {
        display: grid;
        grid-template-columns: 1fr;
        .reg-cancel {
            justify-self: end;
            background: white;
            color: navy;
            border-radius: 4px;
            &:hover {
                background: #ff7676;
            }
        }
    }
`;
