import React from "react";
import { IActionItemProps } from "./def";
import Styles from "./styles.module.css";
const ActionItem: React.FC<IActionItemProps> = ({
  onClick,
  IconComponent,
  caption,
}: IActionItemProps) => {
  return (
    <button className={Styles.container} onClick={onClick}>
      <div className={Styles.icon}>
        <IconComponent />
      </div>
      <div className="mt-2">{caption}</div>
    </button>
  );
};

export default ActionItem;
