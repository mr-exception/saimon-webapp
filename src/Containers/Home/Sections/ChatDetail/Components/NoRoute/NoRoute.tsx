import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContact } from "Redux/actions/contacts";
import { selectConnectedRelayHosts } from "Redux/types/selectors";
import Button from "Ui-Kit/Button/Button";
import { INoRouteProps } from "./def";
import Styles from "./styles.module.css";
const NoRoute: React.FC<INoRouteProps> = ({ contact }: INoRouteProps) => {
  const dispatch = useDispatch();
  const relay_hosts = useSelector(selectConnectedRelayHosts);
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
      <div className={Styles.message}>
        <div className={Styles.content}>
          <p>
            it seems we don't have any registered route to this client through
            the network. it's because you've added this contact to your list by
            just entering the address or all registered routes are cleared from
            your storage somehow. you can search for routes now to solve this
            issue!
          </p>
        </div>

        <div className={Styles.actions}>
          <Button
            minWidth={120}
            variant="primary"
            size="sm"
            caption={checking ? "..." : "check routes"}
            onClick={checkRoutes}
          />
          <Button
            minWidth={120}
            variant="danger"
            size="sm"
            caption="remove contact"
            onClick={() => {
              console.log("remove!");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoRoute;
