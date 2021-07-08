import React, { useState } from "react";
import "./styles.css";
import Modal from "ui-kit/Modal/Modal";
import { IInitialState } from "redux/types/states";
import { useDispatch, useSelector } from "react-redux";
import { clsoeAddHostModal } from "redux/actions/modals";
import Button from "ui-kit/Button/Button";
import { getHeartBeat, IServiceInfo } from "Apis/HeartBeat";
import Host from "Classes/Host/Host";
import RelayHost from "Classes/Host/RelayHost";
import AdvertiserHost from "Classes/Host/AdvertiserHost";
import { selectAppKey } from "redux/types/selectors";
import { addHosts } from "redux/actions/hosts";
import StorageHost from "Classes/Host/StorageHost";

interface IHostRecord {
  address: string;
  status: "EMPTY" | "CHECKING" | "FAILED" | "PASSED";
  service?: IServiceInfo;
}

const AddHostModal = () => {
  const show = useSelector(
    (state: IInitialState) => state.modals.add_host.show
  );
  const app_key = useSelector(selectAppKey);
  const dispatch = useDispatch();

  const storeRecords = () => {
    const hosts: Host[] = [];
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      if (!record.service) {
        continue;
      }
      let host: Host | undefined = undefined;
      if (record.service.type === "RELAY") {
        host = new RelayHost(
          {
            id: 0,
            name: record.service.name,
            address: record.address,
            type: record.service.type,
            protocol: record.service.protocol,
            advertise_period: parseInt(record.service.ad_price),
            score: 0,
            disabled: false,
          },
          app_key
        );
        (host as RelayHost).connect();
      }
      if (record.service.type === "ADVERTISER") {
        host = new AdvertiserHost(
          {
            id: 0,
            name: record.service.name,
            address: record.address,
            type: record.service.type,
            protocol: record.service.protocol,
            advertise_period: parseInt(record.service.ad_price),
            score: 0,
            disabled: false,
          },
          app_key
        );
      }
      if (record.service.type === "STORAGE") {
        host = new StorageHost(
          {
            id: 0,
            name: record.service.name,
            address: record.address,
            type: record.service.type,
            protocol: record.service.protocol,
            advertise_period: parseInt(record.service.ad_price),
            score: 0,
            disabled: false,
          },
          app_key
        );
      }
      if (!!host) {
        host.store();
        hosts.push(host);
      }
    }
    dispatch(addHosts(hosts));
    dispatch(clsoeAddHostModal());
  };

  const renderStatus = (record: IHostRecord) => {
    switch (record.status) {
      case "EMPTY":
        return (
          <div
            style={{ flex: 2 }}
            className="flex justify-left items-center pl-4"
          ></div>
        );
      case "PASSED":
        return (
          <div
            style={{ flex: 2 }}
            className="flex justify-left items-center pl-4"
          >
            host is available ({record.service?.name})
          </div>
        );
      case "FAILED":
        return (
          <div
            style={{ flex: 2 }}
            className="flex justify-left items-center pl-4"
          >
            failed to connect
          </div>
        );
      case "CHECKING":
        return (
          <div
            style={{ flex: 2 }}
            className="flex justify-left items-center pl-4"
          >
            fetching host informations
          </div>
        );
    }
  };

  const checkHeartBeat = async (index: number) => {
    try {
      const response = await getHeartBeat(records[index].address);
      set_records(
        records.map((record, i) => {
          if (i === index) {
            record.status = "PASSED";
            record.service = response;
          }
          return record;
        })
      );
    } catch (error) {
      console.log(error);
      set_records(
        records.map((record, i) => {
          if (i === index) {
            record.status = "FAILED";
          }
          return record;
        })
      );
    }
  };

  const [records, set_records] = useState<IHostRecord[]>([
    {
      address: "",
      status: "EMPTY",
    },
  ]);
  return (
    <Modal
      show={show}
      close={() => {
        dispatch(clsoeAddHostModal());
      }}
    >
      <div className="flex w-full p-2">enter host addresses here:</div>
      {records.map((record, index) => (
        <div key={index} className="flex w-full p-2">
          <input
            style={{ flex: 1 }}
            placeholder="https://relay.salimon.ir"
            value={record.address}
            onChange={(e) => {
              set_records(
                records.map((record, i) => {
                  if (i === index) {
                    record.address = e.target.value;
                    record.status = "EMPTY";
                  }
                  return record;
                })
              );
            }}
            onBlur={() => {
              set_records(
                records.map((record, i) => {
                  if (i === index) {
                    record.status = "CHECKING";
                    checkHeartBeat(i);
                  }
                  return record;
                })
              );
            }}
            className="border-2 rounded-md p-1 text-black"
          />
          {renderStatus(record)}
        </div>
      ))}

      <div className="flex w-full flex-row justify-center p-4">
        <Button
          onClick={storeRecords}
          caption="submit hosts"
          size="sm"
          variant="primary"
        />
        <Button
          onClick={() => {
            set_records([...records, { address: "", status: "EMPTY" }]);
          }}
          caption="add new record"
          className="ml-1"
          size="sm"
          variant="secondary"
        />
      </div>
    </Modal>
  );
};

export default AddHostModal;
