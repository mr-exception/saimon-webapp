import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Hosts from "containers/Hosts/Hosts";
import Profile from "containers/Profile/Profile";
import Setting from "containers/Setting/Setting";
import App from "Layout/App/App";
import Home from "containers/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAppKey,
  selectHosts,
  selectStorage,
} from "redux/types/selectors";
// syncers
import hostsSyncer from "redux/syncers/hosts";
// loaders
import hostLoader from "redux/loaders/hosts";
import messageLoader from "redux/loaders/messages";
import contactLoader from "redux/loaders/contacts";
import clientLoader from "redux/loaders/clients";
import { IInitialState } from "redux/types/states";
import { start as startQueueHandler } from "Queues/handler";

const Routes = () => {
  const storage = useSelector(selectStorage);
  const app_key = useSelector(selectAppKey);
  const hosts = useSelector(selectHosts);
  const contact_id = useSelector(
    (state: IInitialState) => state.selected_contact_id
  );

  const dispatch = useDispatch();

  const [contacts_loaded, set_contacts_loaded] = useState(false);
  const [hosts_loaded, set_hosts_loaded] = useState(false);
  const [client_loaded, set_client_loaded] = useState(false);
  /**
   * this methods will run on page load
   * inits all recommended data from stroage APIs
   * starts all connections with host nodes
   * gathers the build-up data from host nodes
   * starts listeners on connection channels for different events
   */
  // load key for the first time
  useEffect(() => {
    clientLoader(dispatch);
    set_client_loaded(true);
  }, [dispatch]);
  // load all contacts for the first time
  useEffect(() => {
    contactLoader(storage, dispatch);
    set_contacts_loaded(true);
  }, [storage, dispatch]);
  // load all messages for selected contact id
  useEffect(() => {
    if (!contact_id) return;
    messageLoader(contact_id, storage, dispatch);
  }, [storage, contact_id, dispatch]);
  // load all hosts for the first time
  useEffect(() => {
    if (!app_key) return;
    hostLoader(app_key, storage, dispatch);
    set_hosts_loaded(true);
  }, [app_key, storage, dispatch]);

  /**
   * registering syncers. syncers subscribe to a list and update
   * the redux store based on changes
   */
  useEffect(() => {
    if (!app_key) return;
    hostsSyncer(hosts, dispatch, app_key);
  }, [hosts, dispatch, app_key]);

  /**
   * register layer handlers
   */
  useEffect(() => {
    startQueueHandler();
  }, []);
  /**
   * request permission for push notifications
   */
  useEffect(() => {
    Notification.requestPermission(async (status) => {
      console.debug(`notification permission status: `, status);
      // if (status === "granted") {
      //   try {
      //     const reg = await navigator.serviceWorker.getRegistration();
      //     if (!reg) throw new Error("not registered");
      //     reg.showNotification("some title", { body: "some body!" });
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
    });
  }, []);

  if (!contacts_loaded || !hosts_loaded || !client_loaded)
    return <div>loading...</div>;
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
