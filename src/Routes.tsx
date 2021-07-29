import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Hosts from "Containers/Hosts/Hosts";
import Profile from "Containers/Profile/Profile";
import Setting from "Containers/Setting/Setting";
import App from "Layout/App/App";
import Home from "Containers/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAppKey,
  selectHosts,
  selectReportQueue,
  selectStorage,
} from "Redux/types/selectors";
// syncers
import hostsSyncer from "Redux/syncers/hosts";
// loaders
import hostLoader from "Redux/loaders/hosts";
import messageLoader from "Redux/loaders/messages";
import contactLoader from "Redux/loaders/contacts";
import clientLoader from "Redux/loaders/clients";
import { IInitialState } from "Redux/types/states";
import { setConnectionStatus } from "Redux/actions/others";
import { autoConnect } from "Classes/Connection/auto-connect";
import handleWorkers from "WorkerHandlers";

const Routes = () => {
  const worker = useSelector((state: IInitialState) => state.worker);
  const storage = useSelector(selectStorage);

  const app_key = useSelector(selectAppKey);
  // syncs application key with worker key
  useEffect(() => {
    if (!worker || !app_key) return;
    worker.emit("key.set", app_key.getPrivateKey());
  }, [app_key, worker]);

  const hosts = useSelector(selectHosts);
  const contact_id = useSelector(
    (state: IInitialState) => state.selected_contact_id
  );
  useEffect(() => {
    handleWorkers();
  }, []);

  const dispatch = useDispatch();

  const [contacts_loaded, set_contacts_loaded] = useState(false);
  const [hosts_loaded, set_hosts_loaded] = useState(false);
  const [client_loaded, set_client_loaded] = useState(false);

  /**
   * in this section we start all the queues
   */
  const reportQueue = useSelector(selectReportQueue);
  useEffect(() => {
    reportQueue.start();
  }, [reportQueue]);

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

  useEffect(() => {
    dispatch(setConnectionStatus(window.navigator.onLine));
    window.addEventListener("online", () => {
      dispatch(setConnectionStatus(true));
      autoConnect(hosts);
    });
    window.addEventListener("offline", () => {
      dispatch(setConnectionStatus(false));
    });
  }, [dispatch, hosts]);

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
