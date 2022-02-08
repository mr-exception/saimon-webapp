import axios from "axios";

interface ICheckAddressList {
  addresses: string[];
}
export async function checkAddressList(
  baseURL: string,
  params: ICheckAddressList
): Promise<{ [key: string]: { public_key: string } }> {
  return axios
    .get<{ [key: string]: { public_key: string } }>("/api/addresses/check-list", { baseURL, params })
    .then((response) => response.data);
}
