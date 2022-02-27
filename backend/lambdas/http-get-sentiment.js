const { default: axios } = require("axios");
const Responses = require("./API_Responses");
const Tensorflow = require("./tensorflow");

const getFBPosts = async (pageToken) => {
  let timeReactionComments = (
    await axios.get(
      `https://graph.facebook.com/v13.0/618578424896289/posts?fields=comments%2Clikes%2Creactions%2Ccreated_time&access_token=${pageToken}`
    )
  ).data;
  console.log(timeReactionComments);
  return timeReactionComments.data
    .filter((k) => k.comments != undefined)
    .map((j) => j.comments.data[0].message);
};
const getIGPosts = async (instaId, userToken) => {
  let allInstaPosts = (
    await axios.get(
      `https://graph.facebook.com/v13.0/${instaId}/media?access_token=EAAG5ntAONcgBAPN0e8mgFvktZA5VBz1cNMQDqwzZAnSaSXXeeNwFW0UyKRbFpwFEayMd8NCLcEldibpajpdqnaUZCq4cmBGNZAU1XbCBU4OojmqKRlcZBqnD2Np7Mo0k3wS7vVwRsVCn13wOAPnhZAWahGlcf4iuDZBMcUZAhrhWZC5jXqVHNr3SD4z4hqJkFV7fH0ZAfj5tlOHgZDZD&access_token=${userToken}`
    )
  ).data.data;
  console.log(allInstaPosts);
  let posts = await Promise.all(
    allInstaPosts.map(async (i) => {
      return axios.get(
        `https://graph.facebook.com/v13.0/${i.id}/comments?access_token=${userToken}`
      );
    })
  );
  return posts
    .filter((k) => k.data.data.length != 0)
    .map((j) => j.data.data[0].text);
};

exports.handler = async (event) => {
  const userToken = JSON.parse(event.body).userToken;
  const instaId = JSON.parse(event.body).instaId;
  const pageToken = JSON.parse(event.body).pageToken;

  const IG = await getIGPosts(instaId, userToken);
  const FB = await getFBPosts(pageToken);
  console.log(IG, FB);
  const IGValues = await Tensorflow.getAllPhraseValues(IG);
  const FBValues = await Tensorflow.getAllPhraseValues(FB);
  console.log(IGValues, FBValues);
  const IGPosts = IG.map((p, i) => ({
    post: p,
    value: parseFloat(IGValues[i]),
  })).sort((a, b) => b.value - a.value);
  const FBPosts = FB.map((p, i) => ({
    post: p,
    value: parseFloat(FBValues[i]),
  })).sort((a, b) => b.value - a.value);

  let igAvg = 0;
  let fbAvg = 0;
  IGPosts.forEach((p) => {
    igAvg += p.value;
  });
  FBPosts.forEach((p) => {
    fbAvg += p.value;
  });

  igAvg = (igAvg / IGPosts.length) * 50 + 50;
  fbAvg = (fbAvg / FBPosts.length) * 50 + 50;

  const resp = {
    ig: igAvg,
    fb: fbAvg,
    topIg: IGPosts[0],
    topFb: FBPosts[0],
  };
  return Responses._200(resp);
};
