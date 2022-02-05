import { createAxios, IAxiosConfigs } from "./axios-inital";

interface ICreateSecretParam {
  secret: string;
  address: string;
}
export async function createSecret(params: ICreateSecretParam, configs: IAxiosConfigs): Promise<boolean> {
  return createAxios(configs)
    .post("/secrets/create", params, {})
    .then(() => true);
}

interface IUpdateSecretParam {
  current_secret: string;
  new_secret: string;
  address: string;
}
export async function fetchPackets(params: IUpdateSecretParam, configs: IAxiosConfigs): Promise<boolean> {
  return createAxios(configs)
    .post("/secrets/update", params, {})
    .then(() => true);
}
