import axios from "axios";
import moment from "moment";
import { backendUrl } from "./Constants";
const body = {
  pageToken:
    "EAAG5ntAONcgBANkJKASe66UJeD9fDS7EFr7ziHUSRq09iVzg12JH2aDMsZBA52Qa5m7XJnsXPV7Go6T9P7AKq0ZAHg9G6DxHo7BieoZC0tC1GNtm9n1l3VIYq3UYq5kZCYjFd5gVAtlwFw5tZBbPxWxcK2ZBqfIcxhUne2eQrxj1dAgBPhQA7P4kY9dpmW4vrzeZBfJNcgWLpwL8c3UYXix",
  userToken:
    "EAAG5ntAONcgBAC9kmrLgcZBeQeMIyoYLYdpp8kUESVZBIUYZAuNqpmHKMwA2tqCcgkTXNC0ZBOIOifp5DtjkiL0hXKYh8vCHhVHtIKLMYIlBRd9Vn7fGnvI16D4uOpq2h7YZABai3RAU02aqSISZAF1KZC9Vs8FKNZA8RbeQjhi7YIHUeiZChccsleknA5UTO7jvTTIlAPce2jxo0743foQGb",
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
