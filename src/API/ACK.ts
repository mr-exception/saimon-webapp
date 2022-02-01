import { INode } from "Structs/Node";
import axios from "axios";

/**
 * returns basic information about node by it's url
 * @param url
 * @returns
 */
export async function heartBeat(url: string): Promise<INode> {
  return axios.get<INode>(url).then((response) => response.data);
}
