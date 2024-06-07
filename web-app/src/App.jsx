import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MyGoogleMap from './components/MyGoogleMap';
import SearchIcon from './components/SearchIcon';
import Tabs from './components/Tabs';
import EnterArrow from './components/EnterArrow';



function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationName, setLocationName] = useState('');

  const handleSearch = () => {
    // Trigger the location search by setting searchQuery state
    setSearchQuery(locationName);
  };
  const [activeTab, setActiveTab] = useState('Recent');

  return (
    <div className="bg full-height">
      {/* container */}
      <div className="container upper-row p-5">
        {/* upper row */}
        <div className="row">
          <div className="col pr-0">
          
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{width: "191px"}}
              />
            
              <button className="btn btn-primary" type="button" id="button-addon2" style={{backgroundColor: "white", border: "none", height: "36px"}} onClick={handleSearch}>
                <EnterArrow/>
              </button>
            </div>
          </div>
          <div className="col">
            <h3>{locationName}</h3>
            {/* <SearchIcon/> */}
          </div>
        </div>
      </div>

      {/* lower row */}
      <div className="row lower-row">
        {/* Tab Column */}
        <div className="col-lg-2" >
          <div className="row justify-content-center">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>
          </div>
          <div className="row justify-content-center" style={{paddingTop: "12px"}}>
            <div className="card display-card" style={{ width: "200px"}}>
  
              <ul className="list-group list-group-flush">
              <li className="list-group-item custom-list-group2"><h5>{activeTab}</h5></li>
                <li className="list-group-item custom-list-group2 list-group">Lakeside</li>
                <li className="list-group-item custom-list-group2">BEDCO</li>
                <li className="list-group-item custom-list-group2">Home</li>
                <li className="list-group-item custom-list-group2">Maseru Mall</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Map column */}
        <div className="col-lg-8 pt-5">
          <div className="container-sm">
            <MyGoogleMap searchQuery={searchQuery} setLocationName={setLocationName} />
            <div className="pt-5">
              <div className="card w-100" style={{ width: "980px", border: "none"}}>
                <ul className="list-group" style={{backgroundColor: "#D9D9D9" }}>
                  <li className="list-group-item justify-content-center suggest-tab">Main North Rd&nbsp;&nbsp;&nbsp; 45 km/h
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8.2 km away &nbsp;&nbsp;&nbsp;(19 min) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 11:39 AM</li>
                  <li className="list-group-item suggest-tab">Naleli-Sekamaneng Rd &nbsp;&nbsp;&nbsp; 32 km/h &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   10.6 km away &nbsp;&nbsp;&nbsp;(26 min) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12:05 AM</li>
                  <li className="list-group-item suggest-tab">Moshoeshoe Rd &nbsp;&nbsp;&nbsp; 28 km/h &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  7.3 km away (32 min) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12:11 AM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Empty column */}
        <div className="col-lg-2"></div>
      </div>
    </div>
  );
}

export default App;

