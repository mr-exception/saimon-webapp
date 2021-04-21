import { createContext } from "react";
import Client from "../Client/Client";
import Key from "../Key/Key";
import { IContext } from "./def";

export default createContext<IContext>({
  client: new Client(Key.generateFreshKey()),
});
