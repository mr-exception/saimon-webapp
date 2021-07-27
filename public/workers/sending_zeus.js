const packet_length = 2000;

this.addEventListener("message", function (event) {
  const { content, address, host_ids } = event.data;
  // chunk content into smaller packets
  const length = content.length;
  const packet_count = Math.ceil(length / packet_length);
  const packet_contents = [];
  for (let i = 0; i < packet_count; i++) {
    packet_contents.push(content.substr(i * packet_length, packet_length));
  }
  // each host must send how many packets
  const host_debt = packet_count / host_ids.length;
  for (let i = 0; i < host_ids.length; i++) {
    const host_id = host_ids[i];
    for (let j = i * host_debt; j < (i + 1) * host_debt; j++) {
      this.postMessage({ content: packet_contents[j], address, host_id });
    }
  }
});
