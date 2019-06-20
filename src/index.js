import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import App from "./layouts/App";
import "./assets/scss/main.scss";
import "./assets/css/nucleo-icons.css";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/races" render={props => <App {...props} />} />
            <Redirect from="/" to="/races/dashboard" />
        </Switch>
    </Router>,
    document.getElementById("root")
);
