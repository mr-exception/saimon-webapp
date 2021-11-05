import React from "react";
import Styles from "./styles.module.css";
import { IHostCardProps } from "./def";
import { ConnectionStatus } from "Classes/Connection/def";

const translateConnectionState = (state?: ConnectionStatus): JSX.Element => {
  if (!state) {
    return <span>no connection</span>;
  }
  switch (state) {
    case "CONNECTING":
      return <span>connecting</span>;
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

const HostCard: React.FC<IHostCardProps> = ({
  children,
  host,
}: IHostCardProps) => {
  return (
    <div className={Styles.container + " col-md-12"}>
      <div className="row">
        <div className="col-md-12">{translateConnectionState(host.state)}</div>
      </div>
      <div className="row">{children}</div>
    </div>
  );
};

export default HostCard;