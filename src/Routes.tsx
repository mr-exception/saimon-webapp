import React from "react";
import Debug from "containers/Debug/Debug";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Hosts from "containers/Hosts/Hosts";
import Profile from "containers/Profile/Profile";
import Setting from "containers/Setting/Setting";
import App from "Layout/App/App";
import Home from "containers/Home/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/hosts">
          <App>
            <Hosts />
          </App>
        </Route>
        <Route path="/profile">
          <App>
            <Profile />
          </App>
        </Route>
        <Route path="/setting">
          <App>
            <Setting />
          </App>
        </Route>
        <Route path="/debug">
          <Debug />
        </Route>
        <Route path="/">
          <App>
            <Home />
          </App>
        </Route>
      </Switch>
    </Router>
  );
};
export default Routes;
