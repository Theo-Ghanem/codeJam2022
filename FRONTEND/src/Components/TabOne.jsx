import React, { FC, Fragment, useEffect, useState } from "react";
import { SemanticClassificationFormat } from "typescript";
import { getBasicInsta, getGeneralIG, getInstagramReach } from "../Endpoints";

const TabOne = () => {
  const [username, setUsername] = useState("");
  const [numPosts, setNumPosts] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const [clickInfo, setInfo] = useState(null);
  const [impressionData, setData] = useState(null);

  // const [events, setEvents] = useState(data);
  // const [posts, setPosts] = useState([{ time: 0, display_time: 0 }]);
  const loadData = async () => {
    setData(await getInstagramReach());
    console.log(impressionData);
  };
  const loadGeneralIG = async () => {
    const { username, photo, biography, media_count, id, clickArray } =
      await getGeneralIG();
    setUsername(username);
    setNumPosts(media_count);
    setImgSrc(photo);
    setInfo(clickInfo);
  };
  const loadPosts = async () => {
    //   setPosts(await getPosts());
  };
  useEffect(() => {
    loadData();
    loadGeneralIG();
    //   loadEvents();
    //   loadPosts();
  }, []);

  return (
    <Fragment>
      <h3>Instagram</h3>
      <p>Here are your instagram stats</p>
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
      <div
        style={{
          textAlign: "center",
          fontWeight: "600",
          paddingTop: "14px",
          paddingBottom: "10px",
        }}
      >
        Impressions Data
      </div>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "fit-content",
        }}
      >
        {impressionData && (
          <table
            style={{
              border: "2px solid white",
              borderCollapse: "collapse",
              padding: "5px",
              borderColor: "#FFFFFF",
              color: "#666666",
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            <tr style={{ border: "2px solid white", padding: "5px" }}>
              <td style={{ border: "2px solid white", padding: "5px" }}></td>
              <td style={{ border: "2px solid white", padding: "5px" }}>
                Week
              </td>
              <td style={{ border: "2px solid white", padding: "5px" }}>
                Month
              </td>
            </tr>
            <tr>
              <td style={{ border: "2px solid white", padding: "5px" }}>
                Impressions
              </td>
              <td style={{ border: "2px solid white", padding: "5px" }}>
                {
                  impressionData.find(
                    (d) => d.name === "impressions" && d.period === "week"
                  ).value
                }
              </td>
              <td style={{ border: "2px solid white", padding: "5px" }}>
                {
                  impressionData.find(
                    (d) => d.name === "impressions" && d.period === "days_28"
                  ).value
                }
              </td>
            </tr>
            <tr style={{ border: "2px solid white", padding: "5px" }}>
              <td style={{ border: "2px solid white", padding: "5px" }}>
                Reach
              </td>
              <td style={{ border: "2px solid white", padding: "5px" }}>
                {
                  impressionData.find(
                    (d) => d.name === "reach" && d.period === "week"
                  ).value
                }
              </td>
              <td v>
                {
                  impressionData.find(
                    (d) => d.name === "reach" && d.period === "days_28"
                  ).value
                }
              </td>
            </tr>
          </table>
        )}
      </div>
    </Fragment>
  );
};
export default TabOne;
