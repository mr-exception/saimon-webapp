import React from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { showConfirmationModal } from "redux/actions/modals";
import { IAdvertiserHostCardProps } from "./def";
import { removeHost } from "redux/actions/hosts";
import { selectHostConnectionStates } from "redux/types/selectors";
import { ConnectionStatus } from "core/Connection/def";
import ActionItem from "../ActionItem/ActionItem";

const translateConnectionState = (state?: ConnectionStatus): JSX.Element => {
  if (!state) {
    return <span>no connection</span>;
  }
  switch (state) {
    case "CONNECTING":
      return <span style={{ color: "blue" }}>connecting</span>;
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

const AdvertiserHostCard: React.FC<IAdvertiserHostCardProps> = ({
  host,
}: IAdvertiserHostCardProps) => {
  const connections = useSelector(selectHostConnectionStates);

  const connectionState = connections.find(
    (connection) => connection.connection_id === host.id
  );
  const dispatch = useDispatch();

  return (
    <div className="m-8 p-4 border-2 rounded-lg border-secondary">
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
          <p>protocol: {host.protocol}</p>
          <p>score: {host.score}</p>
          <p>advertise period: {host.getAdvertisePeriod()}</p>
        </div>
        <div className="host-card__actions">
          <ActionItem
            caption="delete"
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
            icon="/img/delete.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvertiserHostCard;
