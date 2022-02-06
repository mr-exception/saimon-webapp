import React from "react";
import { toast } from "react-toastify";
import { IHost, subscriptionFee } from "Structs/Host";
import Button from "Ui-Kit/Button/Button";
import { weiToPweiFixed } from "Utils/currency";
import { MdSecurity } from "react-icons/md";
import { FaLink } from "react-icons/fa";

interface IProps {
  host: IHost;
}

const HostCard: React.FC<IProps> = ({ host }: IProps) => {
  return (
    <div className="col-xs-12 col-lg-6 border-2 border-solid rounded-md border-base py-2 px-4">
      <div className="row">
        <div className="col-xs-6 py-1">Name: {host.name}</div>
        <div className="col-xs-6 py-1">Subscription fee: {subscriptionFee(host)}</div>
        <div className="col-xs-6 py-1 flex">
          Url: {host.url}
          <FaLink
            style={{ marginLeft: 10, marginTop: 6 }}
            className="cursor-pointer"
            size={12}
            onClick={() => {
              window.open(host.url, "blank");
            }}
          />
        </div>
        <div className="col-xs-6 py-1">Response time: {host.rt}ms</div>
        <div className="col-xs-6 py-1">Commission fee: {weiToPweiFixed(host.commission_fee)}</div>
        <div className="col-xs-6 py-1 text-right">
          <Button
            size="sm"
            onClick={() => {
              toast.info("you secret token: " + host.secret, {
                onClick: () => {
                  console.log("clicked on toast");
                },
              });
            }}
          >
            <MdSecurity />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HostCard;
