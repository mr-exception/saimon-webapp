import React from "react";
import Styles from "./styles.module.css";
const MenuItem: React.FC<IMenuItemProps> = ({
  IconComponent,
  caption,
  onClick,
  isActive,
}: IMenuItemProps) => {
  return (
    <div
      className={Styles.container + (isActive ? " " + Styles.active : "")}
      onClick={onClick}
    >
      <div className={Styles.icon}>
        <IconComponent />
      </div>
      <div className={Styles.caption}>{caption}</div>
    </div>
  );
};

export default MenuItem;
