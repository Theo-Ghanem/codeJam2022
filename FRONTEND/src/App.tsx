import React, { useState } from "react";
import "./styles.css";
import Tabs from "./Components/Tabs";
// Tabs Components
import TabOne from "./Components/TabOne";
import TabTwo from "./Components/TabTwo";
import axios from "axios";
import { backendUrl } from "./Constants";
import { getSentiment } from "./Endpoints";
import FacebookLogin from "react-facebook-login";
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
];

export default function App() {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

  return (
    <div className="App">
      <h1>See your social statistics!</h1>
      <h2>Select a platform to view information:</h2>
      <br />
      <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
    </div>
  );
}
