import { heartBeat } from "API/ACK";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { IHeartBeat, IHost } from "Structs/Host";
import Button from "Ui-Kit/Button/Button";
import TextInput from "Ui-Kit/Inputs/TextInput/TextInput";
import HeartBeatInfo from "./Components/HeartBeatInfo";

interface IProps {
  onCancel: () => void;
  onFinish: (value: IHost) => void;
}
const AddHostModal: React.FC<IProps> = ({ onCancel, onFinish }: IProps) => {
  const [address, setAddress] = useState<string>();
  const [heartBeatResult, setHeartBeatResult] = useState<IHeartBeat>();
  const [responseTime, setResponseTime] = useState(0);

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  async function fetch() {
    setFetching(true);
    setHeartBeatResult(undefined);
    setError(undefined);
    const rt = Date.now();
    try {
      const result = await heartBeat(address || "");
      setHeartBeatResult(result);
      setResponseTime(Date.now() - rt);
    } catch (err) {
      setError((err as AxiosError).message);
    } finally {
      setFetching(false);
    }
  }
  async function submitHost() {
    if (!heartBeatResult || !address) return;
    const host: IHost = {
      url: address,
      name: heartBeatResult.name,
      commission_fee: heartBeatResult.commission_fee,
      subscription_fee: heartBeatResult.subscription_fee,
      paid_subscription: heartBeatResult.paid_subscription,
      rt: responseTime,
    };
    console.log(host);
  }
  return (
    <div className="row">
      <div className="col-xs-12 font-bold text-lg">Add new host</div>
      <div className="col-xs-6">
        <TextInput label="Host address" value={address} onChange={setAddress} />
      </div>
      <div className="col-xs-6">
        <Button variant="primary" onClick={fetch} size="sm" style={{ marginTop: 32, minWidth: 80 }} loading={fetching}>
          Fetch
        </Button>
      </div>
      <div className="col-xs-12" style={{ minHeight: 140 }}>
        <div className="row">
          {heartBeatResult && <HeartBeatInfo data={heartBeatResult} responseTime={responseTime} />}
          {!!error && (
            <div className="col-xs-12">
              failed to get ack info: <span className="italic">{error}</span>
            </div>
          )}
        </div>
      </div>
      <div className="col-xs-12 text-right">
        <Button onClick={submitHost} variant="primary" size="sm" style={{ marginRight: 10, minWidth: 80 }} disabled={!heartBeatResult}>
          Save
        </Button>
        <Button onClick={onCancel} variant="warning" size="sm" style={{ minWidth: 80 }}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddHostModal;
