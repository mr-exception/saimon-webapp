import React, { useRef } from "react";
import "./styles.css";
import Modal from "ui-kit/Modal/Modal";
import JSONReader from "ui-kit/JSONReader/JSONReader";
import { IHost, IInitialState } from "redux/types/states";
import { useDispatch, useSelector } from "react-redux";
import { addHost } from "redux/actions/hosts";
import { clsoeAddHostModal } from "redux/actions/modals";
const AddHostModal = () => {
  const files_input = useRef<HTMLInputElement>(null);
  const show = useSelector(
    (state: IInitialState) => state.modals.add_host.show
  );
  const dispatch = useDispatch();
  const createHost = (files: IUploadedJSON[]) => {
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
    results.forEach((host) => {
      dispatch(addHost(host));
    });
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
