import React from "react";
import { useDispatch } from "react-redux";
import { showAddContactModal } from "Redux/actions/modals";
import Tooltip from "Ui-Kit/Tooltip/Tooltip";
import Styles from "./styles.module.css";
const ConversationActions = () => {
  const dispatch = useDispatch();
  return (
    <div className="row">
      <div className="col-md-12 flex flex-row justify-center my-2">
        <ActionItem
          icon="/img/disconnect.svg"
          caption="disconnect from network"
          onClick={() => {
            console.log("disconnect");
            // dispatch(showAddContactModal());
          }}
        />
        <ActionItem
          icon="/img/delete.svg"
          caption="delete conversation"
          onClick={() => {
            console.log("delete");
            // dispatch(showAddContactModal());
          }}
        />
        <ActionItem
          icon="/img/add.svg"
          caption="add new conversation"
          onClick={() => {
            dispatch(showAddContactModal());
          }}
        />
      </div>
    </div>
  );
};

interface IActionItemProps {
  icon: string;
  caption: string;
  onClick: () => void;
}
const ActionItem: React.FC<IActionItemProps> = ({ caption, icon, onClick }) => {
  return (
    <div data-tip={caption} className={Styles.action} onClick={onClick}>
      <img src={icon} className={Styles.actionIcon} alt="icon" />
      <Tooltip />
    </div>
  );
};

export default ConversationActions;
