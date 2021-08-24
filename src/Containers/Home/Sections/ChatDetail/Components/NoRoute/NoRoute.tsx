import RelayHost from "Classes/Host/RelayHost";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContact } from "Redux/actions/contacts";
import { selectHostConnectionStates, selectHosts } from "Redux/types/selectors";
import Button from "Ui-Kit/Button/Button";
import { INoRouteProps } from "./def";
import Styles from "./styles.module.css";
const NoRoute: React.FC<INoRouteProps> = ({ contact }: INoRouteProps) => {
  const dispatch = useDispatch();
  const relay_connection_states = useSelector(selectHostConnectionStates);
  const relay_hosts = useSelector(selectHosts)
    .filter((host) => host.type === "RELAY")
    .filter((host) => {
      const status = relay_connection_states.find(
        (state) => state.connection_id === host.id
      );
      if (!status) return false;
      return status.state === "CONNECTED";
    }) as RelayHost[];

  const [checking, set_checking] = useState(false);
  const checkRoutes = async () => {
    if (relay_hosts.length === 0) {
      return alert("you don't have any active connection with network");
    }

    set_checking(true);
    for (let i = 0; i < relay_hosts.length; i++) {
      try {
        const host = relay_hosts[i];
        const result = await host.getClientStatusList([contact.getAddress()]);
        const state = result[0].state;
        if (state !== "NOT_FOUND") {
          contact.relay_host_ids.push(host.id);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (contact.relay_host_ids.length === 0) {
      console.error("no route found");
    }
    contact.update();
    dispatch(updateContact(contact));
    set_checking(false);
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        you don't have any active route to this client. must check all possible
        routes first
        <Button
          caption={checking ? "..." : "check routes"}
          onClick={checkRoutes}
        />
      </div>
    </div>
  );
};

export default NoRoute;
