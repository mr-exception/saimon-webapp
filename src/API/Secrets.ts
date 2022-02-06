import axios from "axios";

interface ICreateSecretParam {
  secret: string;
  address: string;
}
export async function createSecret(baseURL: string, params: ICreateSecretParam): Promise<boolean> {
  return axios.post("/api/secrets/create", params, { baseURL }).then(() => true);
}

interface IUpdateSecretParam {
  current_secret: string;
  new_secret: string;
  address: string;
}
export async function fetchPackets(baseURL: string, params: IUpdateSecretParam): Promise<boolean> {
  return axios.post("/api/secrets/update", params, { baseURL }).then(() => true);
}
