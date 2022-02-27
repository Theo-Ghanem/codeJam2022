import axios from "axios";
import moment from "moment";
import { backendUrl } from "./Constants";
const body = {
  pageToken:
    "EAAG5ntAONcgBAKVcNeVPw55YqiiB93ZAOeprZCciq3yRIUDpQKyunijZBpR6nwaJfzha4k11osaxxAp0ZCFosHkeLA1JBJn8Sh7emsetP5qQAuPx2k9zM8AFKYFaSb8bYHBSTrdqbzE7TOUF6sgaUSSJy1xnlnUZCZA0JnpZBn8sqUFLEJMOGjnBZCcoQW5CiZBn5q7Ak5xh0WfiSZCvBOcy1M",
  userToken:
    "EAAG5ntAONcgBAJopCtyg2aOzvpaXBZA2wG1TUZBWhq7Ku3fZBNxMu1GWEImPeg1CRKM8FFKoR2T7tYtOpQpdnPOv74doj3yI2N3t9VthAN7dOPIEOfdNfUKNV11D4NRFdj1MVKc2rfIQTkVJ4D8R1bsDHZC9l92RZCpWPGtSsZCgGFhTNksA1lysC6XYhZCRyFs06VrfAndwhaXn20ZCC2JTngEKCxPZCEvJNvSjenalhJ4ajxNPZAZCXdo",
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
