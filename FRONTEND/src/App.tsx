import React, { useState } from "react";
import "./styles.css";
import Tabs from "./Components/Tabs";
// Tabs Components
import TabOne from "./Components/TabOne";
import TabTwo from "./Components/TabTwo";
import TabThree from "./Components/TabThree";
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
    label: "Twitter",
    index: 3,
    Component: TabThree,
  },
];

export default function App() {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
  const [input, setInput] = useState("");
  const [returned, setReturned] = useState("");
  const submit = async () => {
    const ret = await getSentiment(input);
    console.log(ret);
    setReturned(ret);
    setInput("");
  };
  return (
    <div className="App">
      <h1>See your social statistics!</h1>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      ></input>
      <button onClick={submit}>Send</button>
      <h1>{JSON.stringify(returned)}</h1>
      <h2>Select a platform to view information:</h2>
      <br />
      <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
    </div>
  );
}
