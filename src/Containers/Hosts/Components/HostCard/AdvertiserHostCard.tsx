import React from "react";
import Styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { showConfirmationModal } from "Redux/actions/modals";
import { IAdvertiserHostCardProps } from "./def";
import { removeHost } from "Redux/actions/hosts";
import ActionItem from "../ActionItem/ActionItem";
import Delete from "Images/Delete";
import HostCard from "./HostCard";

const AdvertiserHostCard: React.FC<IAdvertiserHostCardProps> = ({
  host,
}: IAdvertiserHostCardProps) => {
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
                  console.log(result);
                  if (!result) return;
                  host.delete();
                  dispatch(removeHost(host));
                }
              )
            );
          }}
          IconComponent={Delete}
        />
      </div>
    </HostCard>
  );
};

export default AdvertiserHostCard;
