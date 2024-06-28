import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyGoogleMap from "./components/MyGoogleMap";
import Tabs from "./components/Tabs";
import IconSaveButton from "./components/IconSaveButton";
import axios from "axios";
import trafficSpeedIcon from "./assets/speedometerIcon.png";

function App() {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [locationName, setLocationName] = useState("");
  const [activeTab, setActiveTab] = useState("recents");
  const [isTabColumnVisible, setIsTabColumnVisible] = useState(false);
  // Added variables
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect to toggle tab column visibility based on window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial visibility based on window width
    if (window.innerWidth >= 992) {
      setIsTabColumnVisible(true);
    }

    // Add event listener to update window width state on resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleTabColumn = () => {
    setIsTabColumnVisible(!isTabColumnVisible);
  };

  const handleCurrentLocationChange = (e) => {
    const value = e.target.value;
    setCurrentLocation(value);
    setLocationName(`${value} to ${destination}`);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    if (currentLocation) {
      setLocationName(`${currentLocation} to ${value}`);
    } else {
      setLocationName(value);
    }
  };

  const handleSaveLocation = async () => {
    try {
      const response = await axios.post("http://localhost:5000/recents/", {
        location: locationName,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("There was an error saving the location!", error);
    }
  };

  return (
    <div className="bg full-height parent-card">
      <div className="border first-child">
        {(isTabColumnVisible || window.innerWidth >= 992) && (
          <div className="col-lg-2 child-drop-down">
            <div className="row justify-content-center">
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
        )}
      </div>
      <div className="second-child">
        <div className="container upper-row" id="col_container">
          <div className="row" id="parent_col">
            <div className="col col_1 pr-0" id="hide_show">
              <div className="input-group mb-3" id="input_parent">
                <button
                  className="btn btn-primary d-lg-none"
                  onClick={toggleTabColumn}
                >
                  {isTabColumnVisible ? "Hide Tabs" : "Show Tabs"}
                </button>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Current Location"
                  aria-label="Current Location"
                  value={currentLocation}
                  onChange={handleCurrentLocationChange}
                  id="location_id"
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Destination"
                  aria-label="Destination"
                  value={destination}
                  onChange={handleDestinationChange}
                  id="destination_id"
                />
                &nbsp;
                {/* <button
                  style={{ border: "none", borderRadius: "100%" }}
                  onClick={handleSaveLocation}
                >
                  <IconSaveButton />
                </button> */}
              </div>
            </div>
            <div className="col col_2" id="special_c">
              <button
                style={{
                  border: "none",
                  borderRadius: "100%",
                  background: "white",
                }}
                onClick={handleSaveLocation}
              >
                <IconSaveButton />
              </button>
              <h4
                style={{
                  width: "90%",
                  marginLeft: "7px",
                  marginTop: "4px",
                  overflow: "hidden",
                  paddingLeft: "20px",
                }}
              >
                {locationName}
              </h4>
            </div>
          </div>
        </div>

        <div className="row lower-row">
          <div className="col-lg-8 pt-5">
            <div className="container-sm ">
              <MyGoogleMap
                currentLocation={currentLocation}
                destination={destination}
                setLocationName={setLocationName}
              />
              <div className="pt-5">
                <div
                  className="card w-100"
                  style={{ width: "980px", border: "none" }}
                >
                  <ul
                    className="list-group"
                    style={{ backgroundColor: "#D9D9D9" }}
                  >
                    <li className="list-group-item justify-content-center suggest-tab">
                      Main North Rd&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <img
                        src={trafficSpeedIcon}
                        alt="Traffic Speed Icon"
                        style={{ width: "20px", height: "20px" }}
                      />
                      &nbsp;&nbsp;&nbsp;45 km/h
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8.2 km away
                      &nbsp;&nbsp;&nbsp;(19 min)
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 11:39 AM
                    </li>
                    <li className="list-group-item suggest-tab">
                      Naleli-Sekamaneng Rd &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <img
                        src={trafficSpeedIcon}
                        alt="Traffic Speed Icon"
                        style={{ width: "20px", height: "20px" }}
                      />
                      &nbsp;&nbsp;&nbsp;32 km/h
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10.6 km away
                      &nbsp;&nbsp;&nbsp;(26 min)
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12:05 AM
                    </li>
                    <li className="list-group-item suggest-tab">
                      Moshoeshoe Rd &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <img
                        src={trafficSpeedIcon}
                        alt="Traffic Speed Icon"
                        style={{ width: "20px", height: "20px" }}
                      />
                      &nbsp;&nbsp;&nbsp;28 km/h
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 7.3 km away (32 min)
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12:11 AM
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
