import React, { FC, Fragment, PureComponent, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { getEvents, getPosts } from "../Endpoints";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const TabTwo: FC<{}> = () => {
  const [pageName, setPageName] = useState("ECSESS Page");
  const [events, setEvents] = useState(data);
  const [posts, setPosts] = useState([{ time: 0, display_time: 0 }]);
  const loadEvents = async () => {
    setEvents(await getEvents());
  };
  const loadPosts = async () => {
    setPosts(await getPosts());
  };
  useEffect(() => {
    loadEvents();
    loadPosts();
  }, []);

  return (
    <div style={{ overflow: "auto", height: "300px" }}>
      <h3>Facebook</h3>
      <div>
        <LineChart
          width={300}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
      <div>
        <LineChart
          width={300}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
      <div style={{ width: "300px", height: "200px", paddingTop: "50px" }}>
        <div style={{ textAlign: "center", fontWeight: "600" }}>
          Most Recent Post
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={300}
            height={200}
            data={posts}
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              label={{ value: "Impressions", angle: -90, position: "left" }}
            />
            <Tooltip
              labelFormatter={(t) =>
                posts.find((d: any) => d.time === t)?.display_time
              }
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default TabTwo;
