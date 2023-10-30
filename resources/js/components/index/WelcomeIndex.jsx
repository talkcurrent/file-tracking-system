import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WelcomeAdmin from "../landing/WelcomeAdmin";
import Welcome from "../landing/Welcome";
import { WelcomeProvider } from "./WelcomeContext";

export default class WelcomeTemplate extends Component {
    render() {
        return (
            <React.Fragment>
                <Switch>
                    {/* Guest routes */ }
                    <Route exact={ true } path="/" component={ Welcome } />
                    <Route exact={ true } path="/super" component={ WelcomeAdmin } />
                </Switch>
            </React.Fragment>
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    //Template class can also stay here
    if (document.getElementById("all-welcome-page")) {
        ReactDOM.render(
            <WelcomeProvider>
                <Router>
                    <WelcomeTemplate />
                </Router>
            </WelcomeProvider>
            ,
            document.getElementById("all-welcome-page")
        );
    }
});
