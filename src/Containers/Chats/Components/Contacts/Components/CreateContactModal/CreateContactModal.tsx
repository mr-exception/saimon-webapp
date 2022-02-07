import { checkAddressList } from "API/CheckAddressList";
import { AxiosError } from "axios";
import { IndexableType } from "dexie";
import { HostsContext } from "Hosts/HostsContextProvider";
import React, { useContext, useState } from "react";
import { IHost } from "Structs/Host";
import Button from "Ui-Kit/Button/Button";
import TextInput from "Ui-Kit/Inputs/TextInput/TextInput";

interface IProps {
  close: () => void;
}
const CreateContactModal: React.FC<IProps> = ({ close }: IProps) => {
  const { hosts } = useContext(HostsContext);
  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [fetchResult, setFetchResult] =
    useState<{ result: boolean; host: { value: IHost; id: IndexableType }; ts: number }[]>();

  const [errors, setErrors] = useState<string[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);

  const [fetching, setFetching] = useState<boolean>(false);
  async function fetchRoutes() {
    setFetching(true);
    setErrors([]);
    setNotFound(false);
    let currentErrors: string[] = [];
    try {
      const result = (await Promise.all(
        hosts.map(async (host) => {
          const ts = Date.now();
          if (!address) return false;
          try {
            const result = await checkAddressList(host.value.url, { addresses: [address] });
            return { result: !!result[address], host, ts: Date.now() - ts };
          } catch (err) {
            currentErrors.push(`${host.value.url}: ${(err as AxiosError).message}`);
          }
        })
      )) as { result: boolean; host: { value: IHost; id: IndexableType }; ts: number }[];
      setNotFound(!result.reduce<boolean>((cursor, current) => current.result || cursor, false));
      setFetchResult(result);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
      setErrors(currentErrors);
    }
  }
  return (
    <div className="row">
      <div className="col-xs-12 font-bold text-lg">Create Contact</div>
      <div className="col-xs-12">
        <TextInput label="Full name" placeholder="Majid Moshafegh" value={name} onChange={setName} />
      </div>
      <div className="col-xs-12">
        <TextInput
          label="Address"
          placeholder="0x7bd62f48846cd9E370F2AdE8e45bF7Ca9971c1f7"
          value={address}
          onChange={(value) => {
            setAddress(value.toLowerCase());
          }}
        />
      </div>
      <div className="col-xs-12" style={{ minHeight: 50 }}>
        <div className="row">
          {!!fetchResult &&
            fetchResult.map((result) => {
              if (result.result) {
                return (
                  <div className="col-xs-12">
                    is registered in {result.host.value.name} ({result.host.value.url})!
                  </div>
                );
              } else {
                return (
                  <div className="col-xs-12">
                    not registered in {result.host.value.name} ({result.host.value.url})
                  </div>
                );
              }
            })}
          {!!errors &&
            errors.map((err) => (
              <div className="col-xs-12">
                <span className="italic">{err}</span>
              </div>
            ))}
          {!!notFound && (
            <div className="col-xs-12">
              <span className="italic">
                this address is not registered in any host from your registered hosts. you can't send any message to
                this contact with your current host list
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="col-xs-12 text-right">
        <Button
          onClick={fetchRoutes}
          variant="primary"
          size="sm"
          style={{ marginRight: 10, minWidth: 130 }}
          loading={fetching}
        >
          Fetch Routes
        </Button>
        {notFound && (
          <Button
            onClick={fetchRoutes}
            variant="primary"
            size="sm"
            style={{ marginRight: 10, minWidth: 130 }}
            loading={fetching}
          >
            Save anyway
          </Button>
        )}
        {!notFound && (
          <Button
            onClick={fetchRoutes}
            variant="primary"
            size="sm"
            style={{ marginRight: 10, minWidth: 130 }}
            loading={fetching}
          >
            Save
          </Button>
        )}
        <Button onClick={close} variant="warning" size="sm" style={{ minWidth: 80 }}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CreateContactModal;
