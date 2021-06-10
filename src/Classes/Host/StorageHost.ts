import axios from "axios";
import Host from "./Host";
export default class StorageHost extends Host {
  public async isLive(): Promise<boolean> {
    try {
      await axios.get("/heart-beat", { baseURL: this.address });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
