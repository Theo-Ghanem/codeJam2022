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
} from "recharts";
import { getEvents } from "../Endpoints";
const data = [
  {
    name: "Page A",
    going: 4000,
    interested: 2400,
    "no reply": 2400,
    time: 2400,
  },
  {
    name: "Page B",
    going: 3000,
    interested: 1398,
    "no reply": 3000,
    time: 2210,
  },
  {
    name: "Page C",
    going: 2000,
    interested: 9800,
    "no reply": 8300,
    time: 2290,
  },
  {
    name: "Page D",
    going: 3000,
    interested: 1398,
    "no reply": 3000,
    time: 2000,
  },
  {
    name: "Page E",
    going: 2000,
    interested: 9800,
    "no reply": 8300,
    time: 2181,
  },
];
const recent_post_data = {
  likes: 500,
  comments: 20,
  shares: 40,
  impressions: 600,
  impression_data: [
    {
      name: "",
      time: "",
      impressions: "",
    },
  ],
};

const TabTwo: FC<{}> = () => {
  const [pageName, setPageName] = useState("ECSESS Page");
  const [events, setEvents] = useState(data);
  const loadEvents = async () => {
    setEvents(await getEvents());
  };
  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div style={{ overflow: "auto", height: "300px" }}>
      <h3>{pageName}</h3>

      <div style={{ width: "400px", height: "300px" }}>
        <div style={{ textAlign: "center", fontWeight: "600" }}>Events</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={300}
            height={200}
            data={events}
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" type="number" domain={["auto", "auto"]} />
            <YAxis
              label={{ value: "My Y Axis", angle: -90, position: "left" }}
            />
            <Tooltip
              labelFormatter={(t) => events.find((d) => d.time == t)?.name}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="going"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="interested"
              stroke="#386037"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="no reply"
              stroke="#573950"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: "300px", height: "200px", paddingTop: "50px" }}>
        <div style={{ textAlign: "center", fontWeight: "600" }}>
          Most Recent Post
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={300}
            height={200}
            data={events}
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              label={{ value: "My Y Axis", angle: -90, position: "left" }}
            />
            <Tooltip
              labelFormatter={(t) => data.find((d) => d.time === t)?.name}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="going"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="interested"
              stroke="#386037"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="no reply"
              stroke="#573950"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default TabTwo;
