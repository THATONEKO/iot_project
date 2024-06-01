import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';

const MyGoogleMap = ({ searchQuery, setLocationName }) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [currentLocationName, setCurrentLocationName] = useState('');
  const [searchedLocation, setSearchedLocation] = useState(null); // State to store searched location
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      fetchLocationDetails(searchQuery);
    } else {
      getCurrentGeolocation();
    }
  }, [searchQuery]);

  const getCurrentGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          fetchLocationName(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current location:', error);
          setError('Error getting current location.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setError('Geolocation is not supported by this browser.');
    }
  };

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCfZK9eq1sBWYplK3kxdkE7BJ6JkXGsNWs`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch location details');
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setCurrentLocationName(data.results[0].formatted_address);
        setLocationName(data.results[0].formatted_address); // Update the location name in the parent component
      } else {
        setCurrentLocationName('Location name not found');
        setLocationName('Location name not found');
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
      setCurrentLocationName('Error fetching location details');
      setLocationName('Error fetching location details');
    }
  };

  const fetchLocationDetails = async (query) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=AIzaSyCfZK9eq1sBWYplK3kxdkE7BJ6JkXGsNWs`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch location details');
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setSearchedLocation({ lat, lng }); // Set the searched location
        setLocationName(data.results[0].formatted_address); // Update the location name based on search query
      } else {
        setLocationName('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
      setLocationName('Error fetching location details');
    }
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <div>
        <h3>Current Location:</h3>
        <p>{currentLocationName}</p>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyCfZK9eq1sBWYplK3kxdkE7BJ6JkXGsNWs">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={searchedLocation || currentLocation} // Center on searched location if it exists
        >
          <Marker position={currentLocation} label="Current Location" /> {/* Marker for current location */}
          {searchedLocation && <Marker position={searchedLocation} label="Searched Location" />} {/* Marker for searched location */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MyGoogleMap;

