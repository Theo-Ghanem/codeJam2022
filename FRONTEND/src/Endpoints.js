import axios from "axios";
import { backendUrl } from "./Constants";

export const getSentiment = async (input) => {
  const ret = await axios.post(`${backendUrl}/sentiment`, {
    message: input,
  });
  console.log(ret);
  return ret.data;
};
