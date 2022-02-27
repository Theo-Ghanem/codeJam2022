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
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              width: "150px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "fit-content",
              }}
            >
              <img
                src={imgSrc}
                width={50}
                height={50}
                style={{
                  borderRadius: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderStyle: "solid",
                  borderColor: "#333",
                  borderWidth: "1px",
                  boxShadow: "0px 0px 10px #555",
                }}
              />
            </div>
            <div style={{ textAlign: "center", fontWeight: "bolder" }}>
              {username}
            </div>
            <div
              style={{ textAlign: "center", fontSize: "0.9em", color: "#333" }}
            >
              {numPosts} posts
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default TabOne;
