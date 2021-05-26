import axios, { AxiosError } from "axios";
import Key from "core/Key/Key";
import Host from "./Host";
export default class AdvertisorHost extends Host {
  public async isLive(): Promise<boolean> {
    try {
      await axios.get("/heart-beat", { baseURL: this.address });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  public async fetchClient(address: string): Promise<IFetchClientResponse> {
    try {
      const response = await axios.get<IFetchClientResponse>("/fetch", {
        params: { address },
        baseURL: this.address,
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 404) {
        throw new Error("ClientNotFound");
      } else {
        throw error;
      }
    }
  }
  public async updateClient(
    key: Key,
    profile: { first_name: string; last_name: string; avatar?: File }
  ): Promise<void> {
    const token_response = await axios.post<{ token: string }>(
      "/get-update-token",
      { public_key: key.getPublicKey() },
      {
        baseURL: this.address,
      }
    );
    const token_cipher = token_response.data.token;
    const token = key.decryptPrivate(token_cipher);
    console.log(token.toString());
    // const response = axios.post(
    //   "/api/update",
    //   { ...profile, public_key: public_key.getPublicKey() },
    //   { baseURL: this.address }
    // );
    // console.log(response);
  }
}
export interface IFetchClientResponse {
  client: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
  addresses: string[];
}
