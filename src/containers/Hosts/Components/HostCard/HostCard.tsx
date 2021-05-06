import React, { useState } from "react";
import DeleteIcon from "img/delete.svg";
import DisconnectIcon from "img/disconnect.svg";
import ConnectIcon from "img/connect.svg";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { showConfirmationModal } from "redux/actions/modals";
import { IHostCardProps } from "./def";
import { removeHost } from "redux/actions/hosts";
import {
  selectClient,
  selectHostConnectionStates,
} from "redux/types/selectors";
import { IInitialState } from "redux/types/states";
import { ConnectionStatus } from "core/Connection/def";

const translateConnectionState = (state?: ConnectionStatus): JSX.Element => {
  if (!state) {
    return <span>no connection</span>;
  }
  switch (state) {
    case "CONNECTED":
      return <span style={{ color: "green" }}>connected</span>;
    case "DISCONNECTED":
      return <span style={{ color: "red" }}>disconnected</span>;
    case "NETWORK_ERROR":
      return <span style={{ color: "orange" }}>network error</span>;
    default:
      return <span>not connected</span>;
  }
};

const HostCard: React.FC<IHostCardProps> = ({ host }: IHostCardProps) => {
  const [connection_id, set_connection_id] = useState("no_id");
  let connections = useSelector((state: IInitialState) =>
    selectHostConnectionStates(state)
  );

  const connectionState = connections.find(
    (connection) => connection.connection_id === connection_id
  );

  const client = useSelector(selectClient);
  const dispatch = useDispatch();

  const canConnect = (): boolean => {
    if (connectionState) {
      return connectionState.state !== "CONNECTED";
    } else {
      return true;
    }
  };
  const canDisConnect = (): boolean => {
    if (connectionState) {
      return connectionState.state === "CONNECTED";
    } else {
      return false;
    }
  };
  const connect = async () => {
    const connection = await client.connect(host.address, 2000);
    set_connection_id(connection.getId());
  };

  const disconnect = async () => {
    client.disconnectByConnectionId(connection_id);
  };
  return (
    <div className="host-card">
      <div className="status-bar">
        {translateConnectionState(connectionState?.state)}
      </div>
      <div className="host-card__info">
        <div className="host-card__general_info">
          <p>name: {host.name}</p>
          <p>address: {host.address}</p>
          <p>type: {host.type}</p>
        </div>
        <div className="host-card__statics_info">
          <p>protocl: {host.protocl}</p>
          <p>score: {host.score}</p>
          <p>advertise period: {host.getAdvertisePeriod()}</p>
        </div>
        <div className="host-card__actions">
          <div
            className="host-card__actions__item"
            onClick={() => {
              dispatch(
                showConfirmationModal(
                  "are you sure to delete this host?",
                  (result) => {
                    console.log(result);
                    if (!result) return;
                    host.delete();
                    dispatch(removeHost(host));
                  }
                )
              );
            }}
          >
            <img
              src={DeleteIcon}
              className="host-card__actions__icon"
              alt="delete"
            />
            <div className="host-card__actions__caption">delete</div>
          </div>
          {canDisConnect() ? (
            <div className="host-card__actions__item" onClick={disconnect}>
              <img
                src={DisconnectIcon}
                className="host-card__actions__icon"
                alt="delete"
              />
              <div className="host-card__actions__caption">disconnect</div>
            </div>
          ) : null}
          {canConnect() ? (
            <div className="host-card__actions__item" onClick={connect}>
              <img
                src={ConnectIcon}
                className="host-card__actions__icon"
                alt="delete"
              />
              <div className="host-card__actions__caption">connect</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HostCard;
