/**
 * @author mr-exception
 *
 * this layes handles all packets delivering. by submitting a packet with destination
 * address in this queue, this queue will handle it to be delivered. if packet delivery
 * fails. tries it again till the packet is delivered. this queue isn't in charge for
 * which rely host is connected to which client. but it needs this information for packet
 * deliveries
 */
import { IPacketDeliverRequest } from "Classes/Queue/def";
import configs from "confg";
import store from "redux/store";
let interval: NodeJS.Timeout;

const handlePacketDeliveryRequest = async (data: IPacketDeliverRequest) => {
  // TODO: handle packes here
};

export const start = () => {
  const queue = store.getState().packet_queue;
  interval = setInterval(async () => {
    const job = queue.pull();
    if (!job) {
      return;
    }
    handlePacketDeliveryRequest(job);
  }, configs.layer_intervals.message);
};

export const finish = () => {
  clearInterval(interval);
};
