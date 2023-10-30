import ReactDOM from "react-dom";
import React, { Component, useContext } from 'react';
import styled from "styled-components";
import ToggleNav from "../includes/ToggleNav";
import { Link } from "react-router-dom";
import ControlLeft from "../includes/ControlLeft";
import AdminLink from "../includes/AdminLink";
import StaffLink from "./StaffLink";

const WebView = (props) => {
    const { context } = props;

    const styleHeader = {
        color: "whitesmoke",
        background: "rgb(41 109 173)",
        width: "100%",
        textAlign: "center",
        padding: "4px 0",
        margin: 0,
        position: "sticky",
        zIndex: 10,
        top: 0,
    };

    return (
        <React.Fragment>
            <h3 style={ styleHeader }>File Tracking System</h3>
            <AdminPage windowWidth={ context.windowWidth }>
                { context.windowWidth > 600 ?
                    <ControlLeft
                        context={ context }
                        handleUploadsDP={ context.updloadDp }
                        authUser={ context.authUser } header={ "Admin Controls" }
                        color={ "#296dad" } bgc={ "#106dac" }
                        signOutPath={ `${context.isAdmin ? "/super/logout" : "/logout"}` }
                    >
                        { context.isAdmin ?
                            <AdminLink
                                context={ context }
                                activeClass={ props.view }
                            />
                            :
                            <StaffLink
                                activeClass={ props.view }
                            />
                        }
                    </ControlLeft>
                    : ""
                }
                <React.Fragment>
                    { props.children }
                </React.Fragment>

            </AdminPage>
            { context.windowWidth < 600 ?
                <ToggleNav>
                    <ControlLeft
                        context={ context }
                        authUser={ context.authUser } header={ "Admin Controls" }
                        color={ "#495057" } bgc={ "#106dac" }
                        signOutPath={ `${context.isAdmin ? "/super/logout" : "/logout"}` }
                    >
                        { context.isAdmin ?
                            <AdminLink
                                context={ context }
                                activeClass={ props.view }
                            />
                            :
                            <StaffLink
                                activeClass={ props.view }
                            />
                        }
                    </ControlLeft>
                </ToggleNav>
                : "" }
        </React.Fragment>
    );

};

export default WebView;
export const AdminPage = styled.div`
    display: grid;
    gap: 0;
    grid-template-columns:${props =>
        props.windowWidth <= 600 ? "100%" : "25% 75%"};
    width: 100%;
    margin-top: 5px;
    margin-right: auto;
    margin-left: auto;
    align-items: stretch;
`;
