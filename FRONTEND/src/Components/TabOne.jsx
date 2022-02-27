import React, { FC, Fragment, useEffect, useState } from "react";
import { SemanticClassificationFormat } from "typescript";
import { getBasicInsta, getGeneralIG, getInstagramReach } from "../Endpoints";

const TabOne= () => {
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
    setInfo(info);
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
      <div>
        <div>Username: {username}</div>
        <div>Number of Posts:{numPosts}</div>
        <img src={imgSrc} width={50} height={50} />
      </div>
      <div style={{marginLeft: "auto", marginRight: "auto",width:"fit-content"}}>
          {impressionData && (
            <table style={{border: "2px solid white", borderCollapse: "collapse", padding: "5px", borderColor: "#FFFFFF", color: "#666666", textAlign: "center", alignSelf: "center"}}>
              <tr style={{border: "2px solid white", padding: "5px"}}>
                <td style={{border: "2px solid white", padding: "5px"}}></td>
                <td style={{border: "2px solid white", padding: "5px"}}>Day</td>
                <td style={{border: "2px solid white", padding: "5px"}}>Week</td>
                <td style={{border: "2px solid white", padding: "5px"}}>Month</td>
              </tr>
              <tr>
                <td style={{border: "2px solid white", padding: "5px"}}>Impressions</td>
                <td style={{border: "2px solid white", padding: "5px"}}>
                  {
                    impressionData.find(
                      (d) => d.name === "reach" && d.period === "week"
                    ).value
                  }
                </td>
                <td style={{border: "2px solid white", padding: "5px"}}>
                  {
                    pageBasics.impression_data.find(
                      (d) =>
                        d.name === "page_impressions" && d.period === "week"
                    ).value
                  }
                </td>
                <td style={{border: "2px solid white", padding: "5px"}}>
                  {
                    pageBasics.impression_data.find(
                      (d) =>
                        d.name === "page_impressions" && d.period === "days_28"
                    ).value
                  }
                </td>
              </tr>
              <tr style={{border: "2px solid white", padding: "5px"}}>
                <td style={{border: "2px solid white", padding: "5px"}}>Unique Impressions</td>
                <td style={{border: "2px solid white", padding: "5px"}}>
                  {
                    pageBasics.impression_data.find(
                      (d) =>
                        d.name === "page_impressions_unique" &&
                        d.period === "day"
                    ).value
                  }
                </td>
                <td style={{border: "2px solid white", padding: "5px"}}>
                  {
                    pageBasics.impression_data.find(
                      (d) =>
                        d.name === "page_impressions_unique" &&
                        d.period === "week"
                    ).value
                  }
                </td>
                <td v>
                  {
                    pageBasics.impression_data.find(
                      (d) =>
                        d.name === "page_impressions_unique" &&
                        d.period === "days_28"
                    ).value
                  }
                </td>
              </tr>
              <tr style={{border: "2px solid white", padding: "5px"}}>
                <td style={{border: "2px solid white", padding: "5px"}}>Paid Impressions</td>
                <td style={{border: "2px solid white", padding: "5px"}}>
                  {
                    pageBasics.impression_data.find(
                      (d) =>
                        d.name === "page_impressions_paid" && d.period === "day"
                    ).value
                  }
                </td>
                <td style={{border: "2px solid white", padding: "5px"}}>
                  {
                    pageBasics.impression_data.find(
                      (d) =>
                        d.name === "page_impressions_paid" &&
                        d.period === "week"
                    ).value
                  }
                </td>
                <td style={{border: "2px solid white", padding: "5px"}}>
                  {
                    pageBasics.impression_data.find(
                      (d) =>
                        d.name === "page_impressions_paid" &&
                        d.period === "days_28"
                    ).value
                  }
                </td>
              </tr>
            </table>
          )};
        </div>
    </Fragment>
    
  );
};
export default TabOne;
