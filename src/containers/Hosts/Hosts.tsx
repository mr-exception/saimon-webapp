import React, { useState } from "react";
import HostCard from "./Components/HostCard/HostCard";
import "./styles.css";
const Hosts = () => {
  const [search_term, set_search_term] = useState("");
  const hosts: IHost[] = [
    {
      address: "http://relay.salimon.ir",
      port: 5051,
      type: "RELAY",
      protocl: "LIVE",
      score: 50,
      advertise_period: 50000,
      name: "salimon",
    },
    {
      address: "http://relay.arail.ir",
      port: 5051,
      type: "RELAY",
      protocl: "LIVE",
      score: 50,
      advertise_period: 50000,
      name: "arail",
    },
    {
      address: "http://relay.digipal.ir",
      port: 5051,
      type: "RELAY",
      protocl: "LIVE",
      score: 50,
      advertise_period: 50000,
      name: "digipal",
    },
    {
      address: "http://relay.ansii.ir",
      port: 5051,
      type: "RELAY",
      protocl: "LIVE",
      score: 50,
      advertise_period: 50000,
      name: "ansii",
    },
  ];
  return (
    <div className="hosts">
      <div className="search">
        <input
          value={search_term}
          onChange={(e) => set_search_term(e.target.value)}
          className="search__input"
          placeholder="search in hosts..."
        />
      </div>
      {hosts
        .filter((host) => {
          if (host.address.includes(search_term)) return host;
          if (host.name.includes(search_term)) return host;
          return null;
        })
        .map((host) => (
          <HostCard host={host} />
        ))}
    </div>
  );
};

export default Hosts;
