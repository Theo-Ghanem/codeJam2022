import React, { FC, Fragment, PureComponent, useEffect, useState } from "react";
import moment from "moment";
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
import { getEvents, getPageBasics, getPosts } from "../Endpoints";
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

const TabTwo = () => {
  const [pageName, setPageName] = useState("ECSESS Page");
  const [events, setEvents] = useState(data);
  const [posts, setPosts] = useState([{ time: 0, display_time: 0 }]);
  const [pageBasics, setPageBasics] = useState(null);
  const loadEvents = async () => {
    let data = await getEvents();
    data.forEach(element => {
      if (element.name.length > 20){
        element.name = element.name.substring(0, 20) + "..."
      }
    });
    setEvents(data)
  };
  const loadPosts = async () => {
    setPosts(await getPosts());
  };
  const loadPageBasics = async () => {
    setPageBasics(await getPageBasics());
  };
  useEffect(() => {
    loadEvents();
    loadPosts();
    loadPageBasics();
  }, []);

  return (
    <div style={{ overflow: "auto", height: "300px"}}>
      {pageBasics && <h3>{pageBasics.name}</h3>}
      {pageBasics && <h4>{`${pageBasics.fan_count} Total Likes`}</h4>}

      <div style={{ width: "400px", height: "200px" }}>
        <div style={{ textAlign: "center", fontWeight: "600" }}>
          Post Impressions Over Time
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={400}
            height={200}
            data={posts}
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="display_time" />
            <YAxis
              label={{ value: "    Impressions", position:'inside_left', angle: -90, position: "left" }}
            />
            <Tooltip
              labelFormatter={(t) =>
                posts.find((d) => d.display_time === t)?.display_time
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
        <div>
          <div style={{ textAlign: "center", fontWeight: "600", paddingTop: "14px" }}>
            Event Responses
          </div>
          <div>
            <LineChart
              width={400}
              height={200}
              data={events}
              margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tickFormatter = {(unixTime) => moment(unixTime).format('Do MMM')} type="number" domain={["auto", "auto"]} />
              <YAxis
                label={{ value: "    # of People", angle: -90, position: "left" }}
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
          </div>

          <div style={{ textAlign: "center", fontWeight: "600", paddingTop: "14px", paddingBottom: "10px"}}>
           Impressions Data
          </div>
          <div style={{marginLeft: "auto", marginRight: "auto",width:"fit-content"}}>
          {pageBasics && (
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
                    pageBasics.impression_data.find(
                      (d) => d.name === "page_impressions" && d.period === "day"
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
          )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TabTwo;
