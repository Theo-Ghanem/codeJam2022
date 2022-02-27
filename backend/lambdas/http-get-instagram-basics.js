const { default: axios } = require("axios");
const Responses = require("./API_Responses");
exports.handler = async (event) => {
    const userToken = JSON.parse(event.body).userToken;
    const instaId = JSON.parse(event.body).instaId;
    let generalInfo = (await axios.get(`https://graph.facebook.com/v13.0/${instaId}/?fields=username%2Cprofile_picture_url%2Cbiography%2Cmedia_count&access_token=${userToken}`)).data
    let dailyViewsClicks = (await axios.get(`https://graph.facebook.com/v13.0/${instaId}/insights/?metric=profile_views%2Cfollower_count%2Cwebsite_clicks%2Ctext_message_clicks%2Cget_directions_clicks%2Cemail_contacts&period=day&access_token=${userToken}`)).data
    let parsedClickInfo = dailyViewsClicks.data.map(i=>({title:i.title,value:i.values[0].value}))
    let resp = {generalInfo, parsedClickInfo}
    return Responses._200(resp);
  };