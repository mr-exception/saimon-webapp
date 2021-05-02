import React from "react";
import DeleteIcon from "img/delete.svg";
import DisconnectIcon from "img/disconnect.svg";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { showConfirmationModal } from "redux/actions/modals";
import { IInitialState } from "redux/types/states";
import { IHostCardProps } from "./def";
import { removeHost } from "redux/actions/hosts";
const HostCard: React.FC<IHostCardProps> = ({ host }: IHostCardProps) => {
  const storage = useSelector((state: IInitialState) => state.storage);
  const dispatch = useDispatch();
  return (
    <div className="host-card">
      <div className="host-card__general_info">
        <p>name: {host.name}</p>
        <p>address: {host.address}</p>
        <p>type: {host.type}</p>
      </div>
      <div className="host-card__statics_info">
        <p>protocl: {host.protocl}</p>
        <p>score: {host.score}</p>
        <p>advertise period: {host.advertise_period}B</p>
      </div>
      <div className="host-card__actions">
        <div
          className="host-card__actions__item"
          onClick={() => {
            dispatch(
              showConfirmationModal(
                "are you sure to delete this host?",
                (result) => {
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
        <div className="host-card__actions__item">
          <img
            src={DisconnectIcon}
            className="host-card__actions__icon"
            alt="delete"
          />
          <div className="host-card__actions__caption">disconnect</div>
        </div>
      </div>
    </div>
  );
};

export default HostCard;
