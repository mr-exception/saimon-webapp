import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "App/App";
import Hosts from "Containers/Hosts/Hosts";
import Profile from "Containers/Profile/Profile";
import Setting from "Containers/Setting/Setting";
import Chats from "Containers/Chats/Chats";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <App>
          <Route exact path="/hosts">
            <Hosts />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/setting">
            <Setting />
          </Route>
          <Route exact path="/">
            <Chats />
          </Route>
        </App>
      </Switch>
    </Router>
  );
};
export default Routes;
