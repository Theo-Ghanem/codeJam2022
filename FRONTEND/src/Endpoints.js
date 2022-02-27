import axios from "axios";
import moment from "moment";
import { backendUrl } from "./Constants";
const body = {
  pageToken:
    "EAAG5ntAONcgBADG2Gz2qMV24VorbAz85ZAJq8Q7ZAcwmTj9qR9hEUNsoGIvV1IgEpZBGkjIedV3GdFsVXdRn5ApZAZCCujXbjhZBJ0AXn6ZAdw0GHhyLaOiOMX2D6DmbcIiSeJD3zl3UzsY4rF5NMP2DeGpn24Ar7fT3OTkcYNtdgmuHivOfaGmzU7Dm355Uvuf5MG7dsFRD9nZAI8ElobcE",
  userToken:
    "EAAG5ntAONcgBAKqQp5kbSAY9s4ZCdgWLmuNTmqp43hoFDGyIQBykpWNR67ljdTKyFyGtHIxgTA0ExMNVGHA0mrJZBC3uZBU6rzAQokM48ZCIse3oQZCV2QvRBU2BOXwYqjOWjbjZAjZBwkShCbF6Yc7HSOKZBQrl3fs4WBHdTBP98ZBxWORyK28hZA0RuS4J7BZA58piH6RdhFqalz5bnmujQvW",
  instaId: "17841401584624008",
};
export const getSentiment = async () => {
  const ret = await axios.post(`${backendUrl}/sentiment`, body);
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
export const getPageBasics = async () => {
  const ret = await axios.post(`${backendUrl}/page-basics`, body);
  console.log(ret);
  const output = {
    ...ret.data.nameLikes,
    impression_data: ret.data.impression_data,
  };
  console.log(output);
  return output;
};

export const getBasicInsta = async () => {
  const ret = await axios.post(`${backendUrl}/insta-basics`, body);
  const basics = ret.data[0].map((i) => {
    return {
      username: i.username,
      profile_pic: i.profile_picture_url,
      bio: i.biography,
      numb_posts: i.media_count,
    };
  });
  console.log(ret.data);
  const dailyData = ret.data[1].map((x) => {
    return {
      new_followers: x.follower_count,
      daily_clicks: x.website_click,
      daily_profile_views: x.profile_views,
      daily_direction: x.get_directions_clicks,
      daily_email_count: x.email_contacts,
    };
  });
  return { basics, dailyData };
};
export const getGeneralIG = async () => {
  const ret = (await axios.post(`${backendUrl}/all-instagram-basics`, body))
    .data;
  return {
    username: ret.generalInfo.username,
    photo: ret.generalInfo.profile_picture_url,
    biography: ret.generalInfo.biography,
    media_count: ret.generalInfo.media_count,
    id: ret.generalInfo.id,
  };
};
