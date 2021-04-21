import React, { useContext, useEffect, useState } from "react";
import Context from "./core/Context/Context";
import { IContext } from "./core/Context/def";
import Key from "./core/Key/Key";
function App() {
  const context = useContext<IContext>(Context);
  // connection
  const [server_url, set_server_url] = useState("http://localhost:5000");
  const connect = async () => {
    try {
      context.client.connect(server_url, 100);
    } catch (error) {}
  };
  // sending message to client node
  const [client_public_key, set_client_public_key] = useState("");
  const [client_message, set_client_message] = useState("");
  const sendMesssageToClient = () => {
    context.client.sendMessage(
      Buffer.from(client_message),
      Key.generateKeyByPublicKey(client_public_key)
    );
  };
  useEffect(() => {
    context.client.onMessage$.subscribe((message) => {
      console.log(message.toString());
    });
  }, [context.client]);
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
