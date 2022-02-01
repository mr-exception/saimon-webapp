import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "App/App";
import Hosts from "Containers/Hosts/Hosts";

const Routes = () => {
  return (
    <App>
      <Router>
        <Switch>
          <Route path="/hosts">
            <Hosts />
          </Route>
        </Switch>
      </Router>
    </App>
  );
};
export default Routes;
