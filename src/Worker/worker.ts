import { IPacket } from "Classes/Connection/def";
import Key from "Classes/Key/Key";
import handlePacketReceive from "./events/packets_recieve";
import handlePacketSend from "./events/packets_send";
import { IWorkerMessage } from "./utils";

let app_key: Key | undefined;

onmessage = function (ev) {
  const payload = ev.data as IWorkerMessage;
  const event_name = payload.event;
  switch (event_name) {
    case "packets.send":
      if (!app_key) return;
      const data = payload.data;
      handlePacketSend(
        data.content,
        data.address,
        data.host_ids,
        data.id,
        app_key
      );
      break;
    case "packets.receive":
      const packet = payload.data as IPacket;
      if (!!app_key) handlePacketReceive(packet, app_key);
      break;
    case "key.set":
      app_key = Key.generateKeyByPrivateKey(payload.data as string);
      break;
  }
};
