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
import Key from "core/Key/Key";
import Client from "core/Client/Client";
import { storeClient, storeConnectionState } from "redux/actions/client";
import { filter } from "rxjs/operators";
import Message from "Classes/Message/Message";
import { addMessage } from "redux/actions/conversations";
import { clearAll } from "redux/actions/clear";

const Routes = () => {
  const storage = useSelector((state: IInitialState) => state.storage);
  const dispatch = useDispatch();

  const [initialized, set_initialized] = useState(false);

  useEffect(() => {
    const loadDateFromStorage = async () => {
      dispatch(clearAll());
      // load client
      const private_key = localStorage.getItem("private_key");
      if (private_key) {
        const key = Key.generateKeyByPrivateKey(private_key);
        const client = new Client(key);
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
        dispatch(storeClient(client));
      } else {
        const key = Key.generateFreshKey();
        const client = new Client(key);
        dispatch(storeClient(client));
      }
      // load hosts
      const hosts = await storage.getHosts();
      dispatch(addHosts(hosts));
      // load contacts
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
