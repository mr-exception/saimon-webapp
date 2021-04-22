import React, { useContext, useEffect, useState } from "react";
import Client from "./core/Client/Client";
import Context from "./core/Context/Context";
import { IContext } from "./core/Context/def";
import Key from "./core/Key/Key";
function App() {
  const context = useContext<IContext>(Context);
  // connection
  const [server_url, set_server_url] = useState("http://localhost:5000");
  const connect = async () => {
    if (!context.client) return;
    try {
      context.client.connect(server_url, 1000);
    } catch (error) {}
  };
  // sending message to client node
  const [client_public_key, set_client_public_key] = useState("");
  const [client_message, set_client_message] = useState("");
  const sendMesssageToClient = () => {
    if (!context.client) return;
    context.client.sendMessage(
      Buffer.from(client_message),
      Key.generateKeyByPublicKey(client_public_key)
    );
  };
  useEffect(() => {
    if (!context.client) return;
    context.client.onMessage$.subscribe((message) => {
      console.log(message.toString());
    });
  }, [context.client]);
  // request the address status
  const ack = async () => {
    if (!context.client) return;
    const results = await context.client.getClientStates([client_public_key]);
    console.log(results);
  };
  // subscribes the address status
  const subscrribe = async () => {
    if (!context.client) return;
    await context.client.subscribeToClientState([client_public_key]);
  };

  // creating to client based on local storage
  useEffect(() => {
    const public_key = localStorage.getItem("public_key");
    const private_key = localStorage.getItem("private_key");
    if (!public_key || !private_key) {
      const key = Key.generateFreshKey();
      localStorage.setItem("public_key", key.getPublicKey());
      localStorage.setItem("private_key", key.getPrivateKey());
      context.client = new Client(key);
    } else {
      const key = Key.generateKeyByPrivateKey(private_key);
      context.client = new Client(key);
    }
  }, [context]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: 10,
          marginTop: 15,
          maxHeight: 30,
        }}
      >
        <label style={{ marginRight: 5 }}>server url:</label>
        <input
          type="text"
          value={server_url}
          onChange={(e) => set_server_url(e.target.value)}
        />
        <button style={{ marginLeft: 5 }} onClick={connect}>
          connect
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: 10,
          marginTop: 15,
          maxHeight: 30,
        }}
      >
        <label style={{ marginRight: 5 }}>send message to client node:</label>
        <input
          type="text"
          value={client_public_key}
          placeholder="public key"
          onChange={(e) => set_client_public_key(e.target.value)}
        />
        <button onClick={ack}>ack</button>
        <button onClick={subscrribe}>sub</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: 10,
          marginTop: 15,
          maxHeight: 30,
        }}
      >
        <textarea
          value={client_message}
          placeholder="message"
          onChange={(e) => set_client_message(e.target.value)}
        />
        <button style={{ marginLeft: 5 }} onClick={sendMesssageToClient}>
          send
        </button>
      </div>
    </div>
  );
}

export default App;
