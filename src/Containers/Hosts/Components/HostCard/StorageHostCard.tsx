import React from "react";
import Styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { showConfirmationModal } from "Redux/actions/modals";
import { IStorageHostCardProps } from "./def";
import { removeHost } from "Redux/actions/hosts";
import ActionItem from "../ActionItem/ActionItem";
import HostCard from "./HostCard";

const StorageHostCard: React.FC<IStorageHostCardProps> = ({
  host,
}: IStorageHostCardProps) => {
  const dispatch = useDispatch();
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
          icon="/img/delete.svg"
        />
      </div>
    </HostCard>
  );
};

export default StorageHostCard;
