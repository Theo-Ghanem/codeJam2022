import React, { FC, Fragment, useEffect, useState } from "react";
import { getBasicInsta, getGeneralIG } from "../Endpoints";

const TabOne: FC<{}> = () => {
  const [username, setUsername] = useState("");
  const [numPosts, setNumPosts] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const [info, setInfo] = useState({});

  // const [events, setEvents] = useState(data);
  // const [posts, setPosts] = useState([{ time: 0, display_time: 0 }]);
  const loadBasics = async () => {
    const { basics, dailyData } = await getBasicInsta();
    console.log(basics, dailyData);
  };
  const loadGeneralIG = async () => {
    const { username, photo, biography, media_count, id } =
      await getGeneralIG();
    setUsername(username);
    setNumPosts(media_count);
    setImgSrc(photo);
  };
  const loadPosts = async () => {
    //   setPosts(await getPosts());
  };
  useEffect(() => {
    loadBasics();
    loadGeneralIG();
    //   loadEvents();
    //   loadPosts();
  }, []);

  return (
    <Fragment>
      <h3>Instagram</h3>
      <p>Here are your instagram stats</p>
      <div>
        <div>Username: {username}</div>
        <div>Number of Posts:{numPosts}</div>
        <img src={imgSrc} width={50} height={50} />
      </div>
    </Fragment>
  );
};
export default TabOne;
