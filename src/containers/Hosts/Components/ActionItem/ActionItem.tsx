import React from "react";
import { IActionItemProps } from "./def";
const ActionItem: React.FC<IActionItemProps> = ({
  onClick,
  icon,
  caption,
}: IActionItemProps) => {
  return (
    <button className="flex flex-col m-2 p-2 items-center" onClick={onClick}>
      <img src={icon} className="w-1/4" alt="delete" />
      <div className="mt-2">{caption}</div>
    </button>
  );
};

export default ActionItem;
