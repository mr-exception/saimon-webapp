import React from "react";
import DeleteIcon from "img/delete.svg";
import DisconnectIcon from "img/disconnect.svg";
import "./styles.css";
const HostCard: React.FC<IHostCardProps> = ({ host }: IHostCardProps) => {
  return (
    <div className="host-card">
      <div className="host-card__general_info">
        <p>name: {host.name}</p>
        <p>address: {host.address}</p>
        <p>port: {host.port}</p>
        <p>type: {host.type}</p>
      </div>
      <div className="host-card__statics_info">
        <p>name: {host.name}</p>
        <p>address: {host.address}</p>
        <p>port: {host.port}</p>
        <p>type: {host.type}</p>
      </div>
      <div className="host-card__actions">
        <div className="host-card__actions__item">
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
