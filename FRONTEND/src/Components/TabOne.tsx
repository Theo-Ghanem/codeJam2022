import React, { FC, Fragment, useEffect, useState } from "react";
import { getBasicInsta } from "../Endpoints";

const TabOne: FC<{}> = () => {
    const [username, setUsername] = useState("");
    const [info, setInfo] = useState({});
    // const [events, setEvents] = useState(data);
    // const [posts, setPosts] = useState([{ time: 0, display_time: 0 }]);
    const loadBasics = async () => {
      const  {basics, dailyData} = await getBasicInsta()
      console.log(basics,dailyData)
    };
    const loadPosts = async () => {
    //   setPosts(await getPosts());
    };
    useEffect(() => {
      loadBasics();
    //   loadEvents();
    //   loadPosts();
    }, []);
  
  return (
    <Fragment>
      <h3>Instagram</h3>
      <p>
        Here are your instagram stats
      </p>
      <li> "hello"</li>
      <li> "here is some info"</li>
    </Fragment>
    
  );
};
export default TabOne;
