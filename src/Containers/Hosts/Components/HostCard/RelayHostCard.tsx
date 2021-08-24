import React, { useCallback } from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { showConfirmationModal } from "Redux/actions/modals";
import { IRelayHostCardProps } from "./def";
import { removeHost } from "Redux/actions/hosts";
import { ConnectionStatus } from "Classes/Connection/def";
import ActionItem from "../ActionItem/ActionItem";

const translateConnectionState = (state?: ConnectionStatus): JSX.Element => {
  if (!state) {
    return <span>no connection</span>;
  }
  switch (state) {
    case "CONNECTING":
      return <span>connecting</span>;
    case "CK":
    case "HK":
    case "VA":
    case "VF":
    case "VQ":
      return <span>handshake</span>;
    case "CONNECTED":
      return <span>connected</span>;
    case "DISCONNECTED":
      return <span>disconnected</span>;
    case "NETWORK_ERROR":
      return <span>network error</span>;
    default:
      return <span>not connected</span>;
  }
};

const RelayHostCard: React.FC<IRelayHostCardProps> = ({
  host,
}: IRelayHostCardProps) => {
  const dispatch = useDispatch();

  const canConnect = host ? host.state !== "CONNECTED" : true;
  const canDisconnect = host ? host.state === "CONNECTED" : false;

  // connect to the host node (again)
  const connect = useCallback(async () => {
    if (!canConnect) return;
    try {
      host.enable();
      host.connect();
    } catch (error) {
      console.log(error);
    }
  }, [host, canConnect]);

  const disconnect = async () => {
    host.disable();
    host.close();
  };
  return (
    <div className="m-8 p-4 border-2 rounded-lg border-secondary text-white">
      <div className="status-bar">{translateConnectionState(host.state)}</div>
      <div className="host-card__info">
        <div className="host-card__general_info">
          <p>name: {host.name}</p>
          <p>address: {host.address}</p>
          <p>type: {host.type}</p>
        </div>
        <div className="host-card__statics_info">
          <p>protocol: {host.protocol}</p>
          <p>score: {host.score}</p>
          <p>tta: {host.tta}ms</p>
        </div>
        <div className="host-card__actions">
          <ActionItem
            caption="delete"
            onClick={() => {
              dispatch(
                showConfirmationModal(
                  "are you sure to delete this host?",
                  (result) => {
                    if (!result) return;
                    host.delete();
                    dispatch(removeHost(host));
                  }
                )
              );
            }}
            icon="/Images/delete.svg"
          />
          {canDisconnect && (
            <ActionItem
              onClick={disconnect}
              caption="disconnect"
              icon="/Images/disconnect.svg"
            />
          )}
          {canConnect && (
            <ActionItem
              onClick={connect}
              caption="connect"
              icon="/Images/connect.svg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RelayHostCard;
