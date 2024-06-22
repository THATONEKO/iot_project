import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import IconRecentsTab from "./IconRecentsTab";
import IconCustomize from "./IconCustomize";
import IconSavedTab from "./IconSavedTab";
import IconTraveled from "./IconTraveled";

const Tabs = ({ activeTab, setActiveTab }) => {
  const [recentLocations, setRecentLocations] = useState([]);

  useEffect(() => {
    // if (activeTab === "Recent") {
    //   fetchRecentLocations();
    // }
    fetchRecentLocations(activeTab);


  }, [activeTab]);

  const fetchRecentLocations = async (activetabs) => {
    try {
      const response = await axios.get(`http://localhost:5000/${activetabs}/`);  // Replace with your Flask backend URL
      console.log(response.data);
      setRecentLocations(response.data);
    } catch (error) {
      console.error('Error fetching recent locations:', error);
    }
  };



  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul
        className="list-group mg"
        style={{ width: "200px", border: "none", borderRadius: "0%" }}
      >
        <li
          className={`list-group-item ${
            activeTab === "recents" ? "current-tab" : ""
          } custom-list-group`}
          aria-current={activeTab === "recents"}
          onClick={() => handleTabClick("recents")}
        >
          <IconRecentsTab />&nbsp;&nbsp;&nbsp;Recent
        </li>
        <li
          className={`list-group-item ${
            activeTab === "marked" ? "current-tab" : ""
          } custom-list-group`}
          onClick={() => handleTabClick("marked")}
        >
          <IconSavedTab />&nbsp;&nbsp;&nbsp;Marked
        </li>
        <li
          className={`list-group-item ${
            activeTab === "Traveled" ? "current-tab" : ""
          } custom-list-group`}
          onClick={() => handleTabClick("Traveled")}
        >
          <IconTraveled />&nbsp;&nbsp;&nbsp;Traveled
        </li>
        <li
          className={`list-group-item ${
            activeTab === "Customize" ? "current-tab" : ""
          } custom-list-group`}
          onClick={() => handleTabClick("Customize")}
        >
          <IconCustomize />&nbsp;&nbsp;&nbsp;Customize
        </li>
      </ul>
      {activeTab}
      {activeTab === "recents" ? (
        <ul className="list-group list-group-flush">
          {recentLocations.map((location, index) => (
            <li key={index} className="list-group-item custom-list-group2 list-group">
              {location}
            </li>
          ))}
        </ul>
      ):(
        <ul className="list-group list-group-flush">
        {recentLocations.map((location, index) => (
          <li key={index} className="list-group-item custom-list-group2 list-group">
            {location}
          </li>
        ))}
      </ul>
      )
    
    }
    </div>
  );
};

export default Tabs;
