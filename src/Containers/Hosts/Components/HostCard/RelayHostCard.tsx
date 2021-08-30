import React, { useCallback } from "react";
import Styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { showConfirmationModal } from "Redux/actions/modals";
import { IRelayHostCardProps } from "./def";
import { removeHost } from "Redux/actions/hosts";
import ActionItem from "../ActionItem/ActionItem";
import HostCard from "./HostCard";
import Delete from "Images/Delete";
import Disconnect from "Images/Disconnect";
import Connect from "Images/Connect";

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
    <HostCard host={host}>
      <div className={Styles.generalInfo}>
        <p>name: {host.name}</p>
        <p>address: {host.address}</p>
        <p>type: {host.type}</p>
      </div>
      <div className={Styles.staticInfo}>
        <p>protocol: {host.protocol}</p>
        <p>score: {host.score}</p>
        <p>tta: {host.tta}ms</p>
      </div>
      <div className={Styles.actions}>
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
          IconComponent={Delete}
        />
        {canDisconnect && (
          <ActionItem
            onClick={disconnect}
            caption="disconnect"
            IconComponent={Disconnect}
          />
        )}
        {canConnect && (
          <ActionItem
            onClick={connect}
            caption="connect"
            IconComponent={Connect}
          />
        )}
      </div>
    </HostCard>
  );
};

export default RelayHostCard;
