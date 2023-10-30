import ReactDOM from "react-dom";
import React, { useContext, useEffect } from 'react';
import styled from "styled-components";
import Dashboard from "../admin/Dashboard";
import ToggleNav from "../includes/ToggleNav";
import { Link } from "react-router-dom";
import ControlLeft from "../includes/ControlLeft";
import AdminLink from "../includes/AdminLink";
import { AdminContext } from "../index/AdminContext";
import { AllContext } from "../index/AllContext";

const AdminDashboard = (props) => {
    const context = useContext(AllContext);
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

    useEffect(() => {
        const path_names = location.pathname.split('/');
        if (path_names.includes('super')) {
            context.handleAuthUser("admin");
        } else {
            context.handleAuthUser("staff");
        }
        return () => { };
    }, []);

    return (
        <React.Fragment>
            <h3 style={ styleHeader }>File Tracking System</h3>
            <AdminPage windowWidth={ context.windowWidth }>
                { context.windowWidth > 600 ?
                    <ControlLeft
                        context={ context }
                        authUser={ context.authUser } header={ "Admin Controls" }
                        color={ "#296dad" } bgc={ "#106dac" }
                        signOutPath={ "/super/logout" }
                    >
                        <AdminLink
                            activeClass={ "dashboard" }
                        />
                    </ControlLeft>
                    : ""
                }
                <React.Fragment>
                    <Dashboard />
                </React.Fragment>

            </AdminPage>
            { context.windowWidth < 600 ?
                <ToggleNav>
                    <ControlLeft
                        context={ context }
                        authUser={ context.authUser } header={ "Admin Controls" }
                        color={ "#495057" } bgc={ "#106dac" }
                        signOutPath={ "/super/logout" }
                    >
                        <AdminLink
                            activeClass={ "dashboard" }
                        />
                    </ControlLeft>
                </ToggleNav>
                : "" }
        </React.Fragment>
    );

};

export default AdminDashboard;
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
