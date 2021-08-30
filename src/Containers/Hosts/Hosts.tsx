import React, { useState } from "react";
import Styles from "./styles.module.css";
import { IInitialState } from "Redux/types/states";
import { useDispatch, useSelector } from "react-redux";
import { showAddHostModal } from "Redux/actions/modals";
import RelayHost from "Classes/Host/RelayHost";
import RelayHostCard from "./Components/HostCard/RelayHostCard";
import AdvertiserHost from "Classes/Host/AdvertiserHost";
import AdvertiserHostCard from "./Components/HostCard/AdvertiserHostCard";
import StorageHost from "Classes/Host/StorageHost";
import StorageHostCard from "./Components/HostCard/StorageHostCard";
import Add from "Images/Add";
const Hosts = () => {
  const [search_term, set_search_term] = useState("");

  const hosts = useSelector((state: IInitialState) => state.hosts);
  const dispatch = useDispatch();
  return (
    <div className={Styles.hosts}>
      <div className={Styles.search}>
        <input
          value={search_term}
          onChange={(e) => set_search_term(e.target.value)}
          className={Styles.searchInput}
          placeholder="search in hosts..."
        />
        <button
          className={Styles.searchAdd}
          onClick={() => {
            dispatch(showAddHostModal());
          }}
        >
          <Add />
        </button>
      </div>
      {hosts
        .filter((host) => {
          if (host.address.includes(search_term)) return host;
          if (host.name.includes(search_term)) return host;
          return null;
        })
        .map((host, key) => {
          switch (host.type) {
            case "RELAY":
              return <RelayHostCard key={key} host={host as RelayHost} />;
            case "ADVERTISER":
              return (
                <AdvertiserHostCard key={key} host={host as AdvertiserHost} />
              );
            case "STORAGE":
              return <StorageHostCard key={key} host={host as StorageHost} />;
          }
          return null;
        })}
    </div>
  );
};

export default Hosts;
