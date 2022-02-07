import axios from "axios";

interface ICheckAddressList {
  addresses: string[];
}
export async function checkAddressList(
  baseURL: string,
  params: ICheckAddressList
): Promise<{ [key: string]: boolean }> {
  return axios
    .get<{ [key: string]: boolean }>("/api/addresses/check-list", { baseURL, params })
    .then((response) => response.data);
}
