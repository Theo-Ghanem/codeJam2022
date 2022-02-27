import React, { useState } from "react";
import "./styles.css";
import Tabs from "./Components/Tabs";
// Tabs Components
import TabOne from "./Components/TabOne";
import TabTwo from "./Components/TabTwo";
import TabThree from "./Components/TabThree";
import TabFour from "./Components/TabFour";
import axios from "axios";
import { backendUrl } from "./Constants";
import { getSentiment } from "./Endpoints";
type TabsType = {
  label: string;
  index: number;
  
  Component: React.FC<{}>;
}[];

// Tabs Array
const tabs: TabsType = [
  {
    label: "Instagram",
    index: 1,
    Component: TabOne,
  },
  {
    label: "Facebook",
    index: 2,
    Component: TabTwo,
  },
  {
    label: "Feedback",
    index: 3,
    Component: TabThree,
  },
  {
    label: "Login",
    index: 4,
    Component: TabFour,
  },
];

export default function App() {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

  return (
    <div className="App">
      <h1 style={{ color: "#fff" }}>See your social statistics!</h1>
      <h2>Select a platform to view information:</h2>
      <br />
      <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
    </div>
  );
}
