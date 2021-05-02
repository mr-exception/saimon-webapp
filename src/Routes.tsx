import React, { useEffect, useState } from "react";
import Debug from "containers/Debug/Debug";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Hosts from "containers/Hosts/Hosts";
import Profile from "containers/Profile/Profile";
import Setting from "containers/Setting/Setting";
import App from "Layout/App/App";
import Home from "containers/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { IInitialState } from "redux/types/states";
import { addHosts } from "redux/actions/hosts";
import { addContacts } from "redux/actions/contacts";

const Routes = () => {
  const storage = useSelector((state: IInitialState) => state.storage);
  const dispatch = useDispatch();

  const [initialized, set_initialized] = useState(false);

  useEffect(() => {
    const loadDateFromStorage = async () => {
      const hosts = await storage.getHosts();
      dispatch(addHosts(hosts));
      const contacts = await storage.getContacts();
      dispatch(addContacts(contacts));
      set_initialized(true);
    };
    loadDateFromStorage();
  }, [storage, dispatch]);

  if (!initialized) return <div>loading...</div>;
  else
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
