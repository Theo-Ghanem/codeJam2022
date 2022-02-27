const { default: axios } = require("axios");
const endpoint = "https://b8f8-34-83-84-157.ngrok.io";
const Responses = {
  async getPhraseValue(phrase) {
    return (await axios.post(`${endpoint}/predict?data=${encodeURI(phrase)}`))
      .data.data;
  },
  async getAllPhraseValues(phrases) {
    return (
      await axios.post(
        `${endpoint}/predictAll?data=${encodeURI(JSON.stringify(phrases))}`
      )
    ).data.data;
  },
};

module.exports = Responses;
