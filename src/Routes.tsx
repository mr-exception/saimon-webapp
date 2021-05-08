import React, { useCallback, useEffect, useState } from "react";
import Debug from "containers/Debug/Debug";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Hosts from "containers/Hosts/Hosts";
import Profile from "containers/Profile/Profile";
import Setting from "containers/Setting/Setting";
import App from "Layout/App/App";
import Home from "containers/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { addHosts } from "redux/actions/hosts";
import { addContacts } from "redux/actions/contacts";
import Key from "core/Key/Key";
import Client from "core/Client/Client";
import {
  storeAppKey,
  storeClient,
  storeConnectionState,
} from "redux/actions/client";
import { filter } from "rxjs/operators";
import Message from "Classes/Message/Message";
import { addMessage } from "redux/actions/conversations";
import { clearAll } from "redux/actions/clear";
import { selectAppKey, selectStorage } from "redux/types/selectors";
import Host from "Classes/Host/Host";

const Routes = () => {
  const storage = useSelector(selectStorage);
  const app_key = useSelector(selectAppKey);
  const dispatch = useDispatch();

  const [initialized, set_initialized] = useState(false);

  /**
   * this method loads key from storage
   * if there isn't any private key provided in storage
   * then creates a new one and creates the client
   * based on created key
   * also stores the created private key into the storage again
   */
  const loadKey = useCallback(() => {
    const private_key = localStorage.getItem("private_key");
    let key: Key;
    let client: Client;
    if (private_key) {
      key = Key.generateKeyByPrivateKey(private_key);
      client = new Client(key);
    } else {
      key = Key.generateFreshKey();
      localStorage.setItem("private_key", key.getPrivateKey());
      client = new Client(key);
    }
    dispatch(storeClient(client));
    dispatch(storeAppKey(key));
    // subscribe to all
    client.onMessage$.subscribe(
      ({ content, address }: { content: Buffer; address: string }) => {
        const message = new Message(
          "not defined",
          "not defined",
          address,
          content,
          "RECEIVED",
          Date.now(),
          "DELIVERED",
          storage
        );
        dispatch(addMessage(message));
      }
    );
    // subscribe to host connections state
    client.onConnectionStates$
      .pipe(
        filter((connection_state) => {
          return (
            connection_state.state === "CONNECTED" ||
            connection_state.state === "DISCONNECTED" ||
            connection_state.state === "CONNECTING" ||
            connection_state.state === "NETWORK_ERROR"
          );
        })
      )
      .subscribe(({ connection_id, state, address }) =>
        dispatch(storeConnectionState(connection_id, state, address))
      );
  }, [dispatch, storage]);
  /**
   * this method loads all hosts from storage into redux store
   */
  const loadHosts = useCallback(async () => {
    const host_records = await storage.getHosts();
    const hosts = host_records.map(
      (rec) =>
        new Host(
          rec.name,
          rec.address,
          rec.score,
          rec.type,
          rec.protocl,
          rec.advertise_period,
          app_key,
          (packet) => {
            console.log(packet);
          },
          (state) => {
            console.log(state);
          },
          storage
        )
    );
    dispatch(addHosts(hosts));
  }, [app_key, storage, dispatch]);
  /**
   * this method loads all contacts from storage into redux store
   */
  const loadContacts = useCallback(async () => {
    const contacts = await storage.getContacts();
    dispatch(addContacts(contacts));
  }, [dispatch, storage]);
  /**
   * this methods runs on page load
   * inits all recommended data from stroage APIs
   * starts all connections with host nodes
   * gathers the build-up data from host nodes
   * starts listeners on connection channels for different events
   */
  useEffect(() => {
    const loadDateFromStorage = async () => {
      dispatch(clearAll());
      // load data
      loadKey();
      loadHosts();
      loadContacts();
      set_initialized(true);
    };
    loadDateFromStorage();
  }, [dispatch, loadKey, loadHosts, loadContacts]);

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
