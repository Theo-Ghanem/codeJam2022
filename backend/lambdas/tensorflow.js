const { default: axios } = require("axios");
const endpoint = "https://665c-34-83-84-157.ngrok.io";
const Responses = {
  async getPhraseValue(phrase) {
    return (await axios.post(`${endpoint}/predict?data=${encodeURI(phrase)}`))
      .data.data;
  },
  async getAllPhraseValues(phrases) {
    const sending = `${endpoint}/predictAll?data=${encodeURI(
      JSON.stringify(phrases)
    )}`;
    console.log(sending);
    return JSON.parse((await axios.post(sending)).data.data);
  },
};

module.exports = Responses;
