const { default: axios } = require("axios");
const Responses = require("./API_Responses");
exports.handler = async (event) => {
  const userToken = JSON.parse(event.body).userToken;
  const pageToken = JSON.parse(event.body).pageToken;
  let nameLikes = (
    await axios.get(
      `https://graph.facebook.com/v13.0/618578424896289/?fields=name%2Cfan_count&access_token=${userToken}`
    )
  ).data;
  let page_impressions = (
    await axios.get(
      `https://graph.facebook.com/v13.0/618578424896289/insights/?metric=page_impressions%2Cpage_impressions_unique%2Cpage_impressions_paid&access_token=${pageToken}`
    )
  ).data;
  let impression_data = page_impressions.data.map((i) => ({
    name: i.name,
    period: i.period,
    value: i.values[0].value,
  }));
  let resp = { nameLikes, impression_data };
  return Responses._200(resp);
};
