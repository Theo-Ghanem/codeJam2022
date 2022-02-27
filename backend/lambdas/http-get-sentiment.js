const { default: axios } = require("axios");
const Responses = require("./API_Responses");
const Tensorflow = require("./tensorflow");
exports.handler = async (event) => {
  const message = JSON.parse(event.body).message;
  const resp = await Tensorflow.getPhraseValue(message);
  const token = "ahslbhljanskajdhslfjka";
  let something = (
    await axios.get(`https://..../?fields=fan_count&access_token=${token}`)
  ).data;
  return Responses._200(resp);
};
