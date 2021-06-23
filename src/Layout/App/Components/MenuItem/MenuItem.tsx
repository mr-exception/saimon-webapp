import React from "react";
import "./styles.css";
const MenuItem: React.FC<IMenuItemProps> = ({
  icon,
  caption,
  onClick,
}: IMenuItemProps) => {
  return (
    <div className="menu-item" onClick={onClick}>
      <img src={icon} alt={caption} className="menu-item__icon" />
      <div className="menu-item__caption">{caption}</div>
    </div>
  );
};

export default MenuItem;
