import ReactDOM from "react-dom";
import React, { Component, useContext, useEffect } from 'react';
import styled from "styled-components";
import ToggleNav from "../includes/ToggleNav";
import { AdminPage } from "./AdminDashboard";
import { StaffContext } from "../index/StaffContext";
import Dashboard from "../staff/Dashboard";
import ControlLeft from "../includes/ControlLeft";
import { Link } from "react-router-dom";
import StaffLink from "../includes/StaffLink";
import { AllContext } from "../index/AllContext";
import StaffWebView from "../includes/StaffWebView";

const StaffDashboard = (props) => {
    const context = useContext(AllContext);

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
        <StaffWebView
            view={ "dashboard" }
            context={ context }
        >
            <React.Fragment>
                <Dashboard />
            </React.Fragment>
        </StaffWebView>
    );
};

export default StaffDashboard;