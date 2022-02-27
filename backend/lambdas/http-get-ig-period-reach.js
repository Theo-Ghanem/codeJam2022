const { default: axios } = require("axios");
const Responses = require("./API_Responses");
exports.handler = async (event) => {
    const userToken = JSON.parse(event.body).userToken;
    const instaId = JSON.parse(event.body).instaId;
    let instagram_reach = (await axios.get(`https://graph.facebook.com/v13.0/${instaId}/insights/?metric=reach%2Cimpressions&period=week%2Cdays_28&access_token=${userToken}`)).data
    let impression_data = instagram_reach.data.map(i=>({name:i.name, period:i.period, value: i.values[0].value}))
    let resp = {impression_data}
    return Responses._200(resp);
  };