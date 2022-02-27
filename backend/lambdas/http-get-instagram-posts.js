const { default: axios } = require("axios");
const Responses = require("./API_Responses");
const Tensorflow = require("./tensorflow")
exports.handler = async (event) => {
    const userToken = JSON.parse(event.body).userToken;
    const instaId = JSON.parse(event.body).instaId;
    let allPosts = (await axios.get(`https://graph.facebook.com/v13.0/${instaId}/media?access_token=EAAG5ntAONcgBAPN0e8mgFvktZA5VBz1cNMQDqwzZAnSaSXXeeNwFW0UyKRbFpwFEayMd8NCLcEldibpajpdqnaUZCq4cmBGNZAU1XbCBU4OojmqKRlcZBqnD2Np7Mo0k3wS7vVwRsVCn13wOAPnhZAWahGlcf4iuDZBMcUZAhrhWZC5jXqVHNr3SD4z4hqJkFV7fH0ZAfj5tlOHgZDZD&access_token=${userToken}`)).data
    let postIds = allPosts.data.map(i=>({id:i.id}))

    let posts = await Promise.all(postIds.map(async(i)=>{
        return axios.get(`https://graph.facebook.com/v13.0/${i.id}/comments?access_token=${userToken}`)
    }))
    let comments = posts.filter(k=> k.data.data.length != 0).map(j=>(j.data.data[0].text))
    const values = await Tensorflow.getAllPhraseValues(comments)
    let sum = 0
    values.forEach(value => { sum += value-0.7
    });
    let average = sum / values.length * 100

    let resp = {average}
    return Responses._200(resp);
  };