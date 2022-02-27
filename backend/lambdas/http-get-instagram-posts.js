const { default: axios } = require("axios");
const Responses = require("./API_Responses");
exports.handler = async (event) => {
    const userToken = JSON.parse(event.body).userToken;
    const instaId = JSON.parse(event.body).instaId;
    let allPosts = (await axios.get(`https://graph.facebook.com/v13.0/${instaId}/media?access_token=EAAG5ntAONcgBAPN0e8mgFvktZA5VBz1cNMQDqwzZAnSaSXXeeNwFW0UyKRbFpwFEayMd8NCLcEldibpajpdqnaUZCq4cmBGNZAU1XbCBU4OojmqKRlcZBqnD2Np7Mo0k3wS7vVwRsVCn13wOAPnhZAWahGlcf4iuDZBMcUZAhrhWZC5jXqVHNr3SD4z4hqJkFV7fH0ZAfj5tlOHgZDZD&access_token=${userToken}`)).data
    let postIds = allPosts.data.map(i=>({id:i.id}))

    let posts = await Promise.all(postIds.map(async(i)=>{
        return axios.get(`https://graph.facebook.com/v13.0/${i.id}/comments?access_token=${pageToken}`)
    }))
    //let page_impressions = objs.map(o=>o.data.data[0].values[0].value)
   
    let comments = posts.data.filter(k=> k.comments != undefined).map(j=>({comment: j.comments.data[0].message}))
    let resp = {comments}
    return Responses._200(resp);
  };