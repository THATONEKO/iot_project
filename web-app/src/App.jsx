import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MyGoogleMap from './components/MyGoogleMap';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationName, setLocationName] = useState('');

  const handleSearch = () => {
    // Trigger the location search by setting searchQuery state
    setLocationName(searchQuery); // Update location name in UI
  };

  return (
    <div className="bg full-height">
      {/* container */}
      <div className="container upper-row p-5">
        {/* upper row */}
        <div className="row">
          <div className="col">
            <input
              placeholder="Search"
              className="m-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="col">
            <div className="col">
              <h3>{locationName}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* lower row */}
      <div className="row lower-row">
        {/* Tab Column */}
        <div className="col-lg-2">
          <div className="row justify-content-center">
            <ul className="list-group mg" style={{ width: "200px" }}>
              <li className="list-group-item active" aria-current="true">
                An active item
              </li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
              <li className="list-group-item">A fourth item</li>
              <li className="list-group-item">And a fifth one</li>
            </ul>
          </div>
          <div className="row justify-content-center">
            <div className="card" style={{ width: "200px" }}>
              <div className="card-header">
                Featured
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Map column */}
        <div className="col-lg-8 pt-5">
          <div className="container-sm">
            <MyGoogleMap searchQuery={searchQuery} setLocationName={setLocationName} />
            <div className="pt-5">
              <div className="card" style={{ width: "750px", marginLeft: "18.3%" }}>
                <ul className="list-group ">
                  <li className="list-group-item">An item</li>
                  <li className="list-group-item">A second item</li>
                  <li className="list-group-item">A third item</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Empty column */}
        <div className="col-lg-2">
        </div>
      </div>
    </div>
  )
}

export default App;

