import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import AdminProvider from "./AdminContext";
import AllProvider from "./AllContext";
import AdminDashboard from "../routes/AdminDashboard";
import AdminStaffs from "../routes/AdminStaffs";
import AdminFiles from "../routes/AdminFiles";
import AdminArchives from "../routes/AdminArchives";
import AdminExpress from "../routes/AdminExpress";
import AdminTrash from "../routes/AdminTrash";
import AdminSettings from "../routes/AdminSettings";
import AdminProfile from "../routes/AdminProfile";
import AdminFaculties from "../routes/AdminFaculties";
import AdminDepartments from "../routes/AdminDepartments";
import Department from "../routes/Department";
import Faculty from "../routes/Faculty";
import Staff from "../routes/Staff";
import File from "../routes/File";

export default class AdminTemplate extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact={ true } path="/super/dashboard" component={ AdminDashboard } />
                    <Route exact={ true } path="/super/profile" component={ AdminProfile } />
                    <Route exact={ true } path="/super/staffs" component={ AdminStaffs } />

                    <Route exact={ true } path="/super/staff/:id" component={ Staff } />
                    <Route exact={ true } path="/staff/:id" component={ Staff } />
                    <Route exact={ true } path="/super/faculty/:id" component={ Faculty } />
                    <Route exact={ true } path="/super/edit/file/:id" component={ File } />
                    <Route exact={ true } path="/department/:id" component={ Department } />
                    <Route exact={ true } path="/super/department/:id" component={ Department } />

                    <Route exact={ true } path="/super/files" component={ AdminFiles } />
                    <Route exact={ true } path="/super/archives" component={ AdminArchives } />
                    <Route exact={ true } path="/super/express" component={ AdminExpress } />
                    <Route exact={ true } path="/super/faculties" component={ AdminFaculties } />
                    <Route exact={ true } path="/super/departments" component={ AdminDepartments } />
                    <Route exact={ true } path="/super/trash" component={ AdminTrash } />
                    <Route exact={ true } path="/super/settings" component={ AdminSettings } />
                </Switch>
            </React.Fragment>
        );
    }
}
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("admin-dashboard")) {
        ReactDOM.render(
            <AllProvider>
                <AdminProvider>
                    <Router>
                        <AdminTemplate />
                    </Router>
                </AdminProvider>
            </AllProvider>,
            document.getElementById("admin-dashboard")
        );
    }
});
