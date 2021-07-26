let packets = [];

function handlePackets(id) {
  // checks if there is any packet with this id in list
  const selected_packets = packets.filter((p) => p.id === id);
  if (packets.length === 0) {
    return false;
  }
  // checks if all packets are retrived
  const packets_actual_count = selected_packets[0].count;
  if (packets_actual_count !== packets.length) {
    return false;
  }
  // returns selected packets
  postMessage({ packets: selected_packets, id });
  // removes packets of this string because message is complete
  packets = packets.filter((p) => p.id !== id);
  return true;
}

this.addEventListener("message", function (event) {
  const packet = event.data;
  packets.push(packet);
  handlePackets(packet.id);
});
