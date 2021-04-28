import React, { useRef, useState } from "react";
import HostCard from "./Components/HostCard/HostCard";
import "./styles.css";
import AddIcon from "img/add.svg";
import Modal from "ui-kit/Modal/Modal";
import JSONReader from "ui-kit/JSONReader/JSONReader";
const Hosts = () => {
  const [search_term, set_search_term] = useState("");
  const [show_add_host_modal, set_show_add_host_modal] = useState(false);
  const files_input = useRef<HTMLInputElement>(null);

  const [hosts, set_hosts] = useState<IHost[]>([]);
  const addHosts = (files: IUploadedJSON[]) => {
    const results: IHost[] = [];
    (files as IUploadedHostList[]).forEach((file) => {
      const values = file.value;
      values.forEach((value) => {
        results.push({
          name: value.name,
          address: value.address,
          type: value.type,
          protocl: value.protocol,
          advertise_period: value.ad_period || 0,
          score: 0,
        });
      });
    });
    set_hosts([...hosts, ...results]);
    set_show_add_host_modal(false);
  };
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
            set_show_add_host_modal(true);
          }}
        >
          <img alt="add" className="search__add__icon" src={AddIcon} />
        </button>
        <Modal
          show={show_add_host_modal}
          close={() => {
            set_show_add_host_modal(false);
          }}
        >
          <div className="add_modal__description">
            upload host node config files here
          </div>
          <div className="add_modal__uploader">
            <JSONReader onFileRead={addHosts} input_ref={files_input} />
            <button
              className="add_modal__uploader__btn"
              onClick={() => {
                if (files_input.current) files_input.current.click();
              }}
            >
              upload host configs
            </button>
          </div>
        </Modal>
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
