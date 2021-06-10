import React from "react";
import DeleteIcon from "img/delete.svg";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { showConfirmationModal } from "redux/actions/modals";
import { IAdvertiserHostCardProps } from "./def";
import { removeHost } from "redux/actions/hosts";
import { selectHostConnectionStates } from "redux/types/selectors";
import { ConnectionStatus } from "core/Connection/def";

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

  // const checkHeartBeat = useCallback(async () => {
  //   const result = await host.isLive();
  //   if (result) {
  //     dispatch(storeConnectionState(host.id, "CONNECTED"));
  //     await host.updateClient(app_key, {
  //       first_name: "alireza",
  //       last_name: "darbandi",
  //     });
  //   } else {
  //     dispatch(storeConnectionState(host.id, "NETWORK_ERROR"));
  //   }
  // }, [host, dispatch, app_key]);

  // useEffect(() => {
  //   checkHeartBeat();
  // }, [checkHeartBeat]);
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
        </div>
      </div>
    </div>
  );
};

export default AdvertiserHostCard;
