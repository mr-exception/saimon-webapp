/**
 * @author mr-exception
 *
 * this queue is a part of phone cup layer, this queue notifies all contacts
 * about the connections this client has any information. this queue also sends
 * information about contacts and host connections that other contacts has shared
 * on this layer. these information helps the network to know more about nodes and
 * their trust score in connection with other nodes
 */
import RelayHost from "Classes/Host/RelayHost";
import { IReportMessage, IReportRequest } from "Classes/Queue/def";
import store from "Redux/store";

export const handle = async (job: IReportRequest): Promise<boolean> => {
  const contact = job.contact;
  const hosts = store.getState().hosts;
  const app_key = store.getState().app_key;
  if (!app_key) return false;
  const contacts = store
    .getState()
    .contacts.filter((cnt) => (cnt.id === contact.id ? null : cnt));

  const reports: IReportMessage = {
    hosts: hosts.map((host) => ({
      address: host.address,
      name: host.name,
      score: host.score,
      type: host.type,
      protocol: host.protocol,
      ad_price: host.advertise_period,
    })),
    contacts: contacts.map((contact) => ({
      address: contact.getAddress(),
      first_name: contact.first_name,
      last_name: contact.last_name,
    })),
  };

  console.debug(
    "%c[Report]",
    "color: red",
    ` to ${contact.getAddress().substr(0, 32)}...`
  );

  let relay_hosts = hosts.filter(
    (host) => host.type === "RELAY"
  ) as RelayHost[];
  if (contact.relay_host_ids.length > 0) {
    relay_hosts = relay_hosts.filter((host) =>
      contact.relay_host_ids.includes(host.id) ? host : null
    );
  } else {
    relay_hosts.forEach(async (host) => {
      host.sendReportMessage(reports, contact.key);
    });
  }

  setTimeout(() => {
    // add this job to the queue again
    if (!job.once) {
      const queue = store.getState().report_queue;
      queue.push(job);
    }
  }, 5000);

  return true;
};
