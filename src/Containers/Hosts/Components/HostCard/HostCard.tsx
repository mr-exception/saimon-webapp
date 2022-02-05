import React from "react";
import { IHost } from "Structs/Host";
import Styles from "./styles.module.css";

interface IProps {
  node: IHost;
}

const HostCard: React.FC<IProps> = ({ node }: IProps) => {
  return (
    <div className={Styles.container + " col-md-12"}>
      <div className="row">{node.name}</div>
    </div>
  );
};

export default HostCard;
