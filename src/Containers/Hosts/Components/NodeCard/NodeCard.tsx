import React from "react";
import { INode } from "Structs/Node";
import Styles from "./styles.module.css";

interface IProps {
  node: INode;
}

const NodeCard: React.FC<IProps> = ({ node }: IProps) => {
  return (
    <div className={Styles.container + " col-md-12"}>
      <div className="row">{node.name}</div>
    </div>
  );
};

export default NodeCard;
