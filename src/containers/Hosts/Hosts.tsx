import React, { useState } from "react";
import HostCard from "./Components/HostCard/HostCard";
import "./styles.css";
import AddIcon from "img/add.svg";
import { IInitialState } from "redux/types/states";
import { useDispatch, useSelector } from "react-redux";
import { showAddHostModal } from "redux/actions/modals";
const Hosts = () => {
  const [search_term, set_search_term] = useState("");

  const hosts = useSelector((state: IInitialState) => state.hosts);
  const dispatch = useDispatch();

  return (
    <div className="hosts">
      <div className="search">
        <input
          value={search_term}
          onChange={(e) => set_search_term(e.target.value)}
          className="search__input"
          placeholder="search in hosts..."
        />
        <button
          className="search__add"
          onClick={() => {
            dispatch(showAddHostModal());
          }}
        >
          <img alt="add" className="search__add__icon" src={AddIcon} />
        </button>
      </div>
      {hosts
        .filter((host) => {
          if (host.address.includes(search_term)) return host;
          if (host.name.includes(search_term)) return host;
          return null;
        })
        .map((host, key) => (
          <HostCard key={key} host={host} />
        ))}
    </div>
  );
};

export default Hosts;
