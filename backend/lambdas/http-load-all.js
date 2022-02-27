const { default: axios } = require("axios");
const Responses = require("./API_Responses");
const Tensorflow = require("./tensorflow");
exports.handler = async (event) => {
  const respSingle = await Tensorflow.getPhraseValue("This was amazing");
  const responseMultiple = await Tensorflow.getAllPhraseValues([
    "That was great",
    "Terrible thing",
    "not too bad",
  ]);
  const resp = {
    single: respSingle,
    multiple: responseMultiple,
  };
  return Responses._200(resp);
};
