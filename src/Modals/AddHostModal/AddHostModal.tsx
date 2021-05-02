import React, { useRef } from "react";
import "./styles.css";
import Modal from "ui-kit/Modal/Modal";
import JSONReader from "ui-kit/JSONReader/JSONReader";
import { IInitialState } from "redux/types/states";
import { useDispatch, useSelector } from "react-redux";
import { clsoeAddHostModal } from "redux/actions/modals";
import Host, { IHost } from "Classes/Host/Host";
import { addHosts } from "redux/actions/hosts";
const AddHostModal = () => {
  const files_input = useRef<HTMLInputElement>(null);
  const show = useSelector(
    (state: IInitialState) => state.modals.add_host.show
  );
  const storage = useSelector((state: IInitialState) => state.storage);
  const dispatch = useDispatch();
  const createHost = async (files: IUploadedJSON[]) => {
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
    const hosts = results.map((record) => {
      const host = new Host(
        record.name,
        record.address,
        record.score,
        record.type,
        record.protocl,
        record.advertise_period,
        storage
      );
      host.store();
      return host;
    });
    dispatch(addHosts(hosts));
    dispatch(clsoeAddHostModal());
  };
  return (
    <Modal
      show={show}
      close={() => {
        dispatch(clsoeAddHostModal());
      }}
    >
      <div className="add_host_modal__description">
        upload host node config files here
      </div>
      <div className="add_host_modal__uploader">
        <JSONReader onFileRead={createHost} input_ref={files_input} />
        <button
          className="add_host_modal__uploader__btn"
          onClick={() => {
            if (files_input.current) files_input.current.click();
          }}
        >
          upload host configs
        </button>
      </div>
    </Modal>
  );
};

export default AddHostModal;