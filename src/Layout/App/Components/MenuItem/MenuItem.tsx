import React from "react";
import Styles from "./styles.module.css";
const MenuItem: React.FC<IMenuItemProps> = ({
  IconComponent,
  caption,
  onClick,
}: IMenuItemProps) => {
  return (
    <div className={Styles.container} onClick={onClick}>
      <div className={Styles.icon}>
        <IconComponent />
      </div>
      {/* <img src={icon} alt={caption} className="menu-item__icon" /> */}
      <div className={Styles.caption}>{caption}</div>
    </div>
  );
};

export default MenuItem;
