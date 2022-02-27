const { default: axios } = require("axios");
const Responses = require("./API_Responses");
exports.handler = async (event) => {
  const pageToken = JSON.parse(event.body).pageToken;
  let timeReactionComments = (
    await axios.get(
      `https://graph.facebook.com/v13.0/618578424896289/posts?fields=comments%2Clikes%2Creactions%2Ccreated_time&access_token=${pageToken}`
    )
  ).data;
  let ids = timeReactionComments.data.map((i) => ({
    id: i.id,
    created_time: i.created_time,
  }));
  let comments = timeReactionComments.data
    .filter((k) => k.comments != undefined)
    .map((j) => ({ comment: j.comments.data[0].message }));

  let objs = await Promise.all(
    ids.map(async (i) => {
      return axios.get(
        `https://graph.facebook.com/v13.0/${i.id}/insights/post_impressions?access_token=${pageToken}`
      );
    })
  );
  let page_impressions = objs.map((o) => o.data.data[0].values[0].value);
  let output = [];
  ids.forEach((im, i) => {
    output.push({
      ...im,
      impressions: page_impressions[i],
    });
  });
  let resp = output;
  return Responses._200(resp);
};
