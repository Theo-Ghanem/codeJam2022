import axios from "axios";
import moment from "moment";
import { backendUrl } from "./Constants";
const body = {
  pageToken:
    "EAAG5ntAONcgBAFdAInAr2HRK808C8MZChOHHSnZCG9Q8p2UY89z458nDF5N5ILXEl0eqZAewlE5tDBEasZCBZAbXfjLzoDFXK6URL1qgwZB9IqF9A22ZAFqZB9t5OsyZCZAdvxVKFZB8SSFKVEDY8QoyurBoxceoYpibouTRjjCtnL7hVRwZAWgkAtyCwZA021j6b2JZCcvulEMTZCiHVnkT3ypq1BT",
  userToken:
    "EAAG5ntAONcgBAExZCtIXHvYUSuCK6qpv9BKAkXEojACHZCZCGt8uvI3Na853JRZAO5EYI58HgzMZBvyHhYBQE1nZAvfEIrM8hecOsEHMxe2nk4uBeH1pt2Iw9XmEzyfrfy22ZC1D7LK6fe2rBzfr0yRkpmyXqnVaKdh0ptWHZBkksiDg0gXh4jjKln0oaa8qN2ETQtawTbCH8ZCX85EREVQX5",
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
export const getPosts = async () => {
  const ret = await axios.post(`${backendUrl}/all-posts`, body);
  const posts = ret.data
    .map((e) => {
      return {
        ...e,
        time: moment(e.created_time).valueOf(),
        display_time: moment(e.created_time).format("MM/DD"),
      };
    })
    .sort((a, b) => a.time - b.time);
  console.log(ret.data);
  return posts;
};

export const getBasicInsta = async () => { 
  const ret = await axios.post('${backendUrl}/insta-basics',body); 
  const basics = ret.data[0]
    .map((i) => {
      return {
        username: i.username,
        profile_pic : i.profile_picture_url,
        bio : i.biography,
        numb_posts : i.media_count,
      }
    })
  console.log(ret.data);
  const dailyData = ret.data[1]
    .map((x)=> { 
      return { 
        new_followers : x.follower_count,
        daily_clicks : x.website_click,
        daily_profile_views : x.profile_views,
        daily_direction : x.get_directions_clicks,
        daily_email_count : x.email_contacts,
      }
    })
  return {basics, dailyData};

};
