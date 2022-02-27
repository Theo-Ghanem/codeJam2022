import React, { FC, Fragment, useEffect, useState } from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import { getSentiment } from "../Endpoints";

const TabThree: FC<{}> = () => {
  const [igPercent, setIgPercent] = useState(0);
  const [fbPercent, setFbPercent] = useState(0);
  const [topIgPost, setTopIgPost] = useState("");
  const [topFbPost, setTopFbPost] = useState("");
  const loadSentiment = async () => {
    const sent = await getSentiment();
    setIgPercent(sent.ig);
    setFbPercent(sent.fb);
    setTopIgPost(sent.topIg.post);
    setTopFbPost(sent.topFb.post);
  };
  useEffect(() => {
    loadSentiment();
  }, []);
  return (
    <Fragment>
      <h3>Sentiment Analysis Feedback</h3>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            Instagram
          </div>
          <div style={{ textAlign: "center" }}>{`${Math.round(
            igPercent
          )}% Positive`}</div>
          <PieChart width={200} height={150}>
            <Pie
              data={[
                {
                  name: "Positive IG Comments",
                  value: Math.round(igPercent),
                  fill: "#57c0e8",
                },
                {
                  name: "Negative IG Comments",
                  value: 100 - Math.round(igPercent),
                  fill: "#fff",
                },
              ]}
              isAnimationActive={true}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Tooltip />
          </PieChart>
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            Best Instagram Comment:
          </div>
          <div style={{ textAlign: "center" }}>{topIgPost}</div>
        </div>
        <div style={{ width: "50%" }}>
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            Facebook
          </div>
          <div style={{ textAlign: "center" }}>{`${Math.round(
            fbPercent
          )}% Positive`}</div>
          <PieChart width={200} height={150}>
            <Pie
              data={[
                {
                  name: "Positive FB Comments",
                  value: Math.round(fbPercent),
                  fill: "#57c0e8",
                },
                {
                  name: "Negative FB Comments",
                  value: 100 - Math.round(fbPercent),
                  fill: "#fff",
                },
              ]}
              isAnimationActive={true}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Tooltip />
          </PieChart>
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            Best Facebook Comment:
          </div>
          <div style={{ textAlign: "center" }}>{topFbPost}</div>
        </div>
      </div>
    </Fragment>
  );
};
export default TabThree;
