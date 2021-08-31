import Add from "Images/Add";
import Delete from "Images/Delete";
import Disconnect from "Images/Disconnect";
import React from "react";
import { useDispatch } from "react-redux";
import { showAddContactModal } from "Redux/actions/modals";
import Tooltip from "Ui-Kit/Tooltip/Tooltip";
import Styles from "./styles.module.css";
const ConversationActions = () => {
  const dispatch = useDispatch();
  return (
    <div className={Styles.container}>
      <ActionItem
        IconComponent={Disconnect}
        caption="disconnect from network"
        onClick={() => {
          console.log("disconnect");
          // dispatch(showAddContactModal());
        }}
      />
      <ActionItem
        IconComponent={Delete}
        caption="delete conversation"
        onClick={() => {
          console.log("delete");
          // dispatch(showAddContactModal());
        }}
      />
      <ActionItem
        IconComponent={Add}
        caption="add new conversation"
        onClick={() => {
          dispatch(showAddContactModal());
        }}
      />
    </div>
  );
};

const ActionItem: React.FC<IActionItemProps> = ({
  caption,
  IconComponent,
  onClick,
}) => {
  return (
    <div data-tip={caption} className={Styles.item} onClick={onClick}>
      <IconComponent />
      <Tooltip />
    </div>
  );
};

interface IActionItemProps {
  IconComponent: React.FC;
  caption: string;
  onClick: () => void;
}

export default ConversationActions;
