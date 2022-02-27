import axios from "axios";
import moment from "moment";
import { backendUrl } from "./Constants";
const body = {
  pageToken:
    "EAAG5ntAONcgBAOSgSAziDxAZBcDYpH3TT3f1dgnwOIXAZCOlpZC2vGJuCW9azp06mVF04tgiNEVXLc3qShFvm1WX9dqjqfj1TIsvAfETLQAl1zWoBXbRVMqZAh4Ki7EiscylIUpicsiiSUjilyaZC8EaD1KWZCFToYZCJLQ5Osbl63tOEFZCw7BaKZBopReXAzrgZBlj6gjbqFyebZCvbldFyzI",
  userToken:
    "EAAG5ntAONcgBAGDv9Vf8p7xUZAf8qJ0h0F6zGJZBhM8sHDN2HZCfrUoyGfCZCmMfTzX3mCbBQXGQcq6kRIT50RD5YSFhZCOrSau4mVZC8eLcGRjNmVZANoLNU24532dknNUZAje1ZAo2CBLm0ZBpJP6Nsj7rYZCbuiIThqdqa1YIQXlNm6zYNPFu8Kzd5Od4H2yrp0w8YX66K2smVj1cvAF90ts",
};
export const getSentiment = async (input) => {
  const ret = await axios.post(`${backendUrl}/sentiment`, {
    message: input,
  });
  console.log(ret);
  return ret.data;
};
export const getEvents = async () => {
  const ret = await axios.post(`${backendUrl}/all-events`, body);
  const events = ret.data
    .map((e) => {
      return {
        name: e.name,
        going: e.attending_count,
        interested: e.maybe_count,
        "no reply": e.noreply_count,
        time: moment(e.created_time).valueOf(),
        display_time: moment(e.created_time).format("MM/DD"),
      };
    })
    .sort((a, b) => a.time - b.time);
  console.log(ret.data);
  return events;
};
