import axios from "axios";
import Host from "./Host";
export default class AdvertisorHost extends Host {
  public async isLive(): Promise<boolean> {
    try {
      await axios.get("/api/heart-beat", { baseURL: this.address });
      return true;
    } catch {
      return false;
    }
  }
}
