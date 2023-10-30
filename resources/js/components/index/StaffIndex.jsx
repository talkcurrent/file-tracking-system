import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StaffArchives from "../staff/StaffArchives";
import Department from "../routes/Department";
import Faculty from "../routes/Faculty";
import File from "../routes/File";
import Staff from "../routes/Staff";
import StaffDashboard from "../routes/StaffDashboard";
import StaffDepartments from "../staff/StaffDepartments";
import StaffExpress from "../staff/StaffExpress";
import StaffFaculties from "../staff/StaffFaculties";
import StaffFiles from "../staff/StaffFiles";
import StaffProfile from "../staff/StaffProfile";
import StaffStaffs from "../staff/StaffStaffs";
import AllProvider from "./AllContext";
import StaffProvider from "./StaffContext";
import StaffSettings from "../staff/StaffSettings";

const StaffIndexTemplate = (props) => {
    return (
        <Switch>
            <Route exact={ true } path="/dashboard" component={ StaffDashboard } />
            <Route exact={ true } path="/profile" component={ StaffProfile } />
            <Route exact={ true } path="/staffs" component={ StaffStaffs } />
            <Route exact={ true } path="/files" component={ StaffFiles } />
            <Route exact={ true } path="/archives" component={ StaffArchives } />
            <Route exact={ true } path="/express" component={ StaffExpress } />
            <Route exact={ true } path="/faculties" component={ StaffFaculties } />
            <Route exact={ true } path="/departments" component={ StaffDepartments } />
            <Route exact={ true } path="/settings" component={ StaffSettings } />

            <Route exact={ true } path="/staff/:id" component={ Staff } />
            <Route exact={ true } path="/faculty/:id" component={ Faculty } />
            <Route exact={ true } path="/edit/file/:id" component={ File } />
            <Route exact={ true } path="/department/:id" component={ Department } />
        </Switch>
    );
};

document.addEventListener("DOMContentLoaded", () => {
    //Template class can also stay here
    if (document.getElementById("staff-dashboard")) {
        ReactDOM.render(
            <AllProvider>
                <StaffProvider>
                    <Router>
                        <StaffIndexTemplate />
                    </Router>
                </StaffProvider>
            </AllProvider>
            ,
            document.getElementById("staff-dashboard")
        );
    }
});
