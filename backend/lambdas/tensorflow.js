const { default: axios } = require("axios");
const endpoint = "https://d39f-35-231-62-233.ngrok.io";
const Responses = {
  async getPhraseValue(phrase) {
    return (await axios.post(`${endpoint}/predict?data=${phrase}`)).data.data;
  },
  async getAllPhraseValues(phrases) {
    return (
      await axios.post(`${endpoint}/predictAll?data=${JSON.stringify(phrases)}`)
    ).data.data;
  },
};

module.exports = Responses;
