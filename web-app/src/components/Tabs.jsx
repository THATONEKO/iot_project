import React, { useState } from "react";
import "../App.css";

const Tabs = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ul
      className="list-group mg"
      style={{ width: "200px", border: "none", borderRadius: "0%" }}
    >
      <li
        className={`list-group-item ${
          activeTab === "Recent" ? "current-tab" : ""
        } custom-list-group`}
        aria-current={activeTab === "Recent"}
        onClick={() => handleTabClick("Recent")}
      >
        Recent
      </li>
      <li
        className={`list-group-item ${
          activeTab === "Marked" ? "current-tab" : ""
        } custom-list-group`}
        onClick={() => handleTabClick("Marked")}
      >
        Marked
      </li>
      <li
        className={`list-group-item ${
          activeTab === "Traveled" ? "current-tab" : ""
        } custom-list-group`}
        onClick={() => handleTabClick("Traveled")}
      >
        Traveled
      </li>
      <li
        className={`list-group-item ${
          activeTab === "Customize" ? "current-tab" : ""
        } custom-list-group`}
        onClick={() => handleTabClick("Customize")}
      >
        Customize
      </li>
    </ul>
  );
};

export default Tabs;
