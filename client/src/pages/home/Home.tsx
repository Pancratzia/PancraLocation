import Map from "../../components/Map/Map";
import "./Home.scss";

import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setLatitude(res.data.latitude);
    setLongitude(res.data.longitude);
  };

  const handleRealTimeGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      alert("Geolocation is not supported in this browser.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    setLatitude(lat.toString());
    setLongitude(lng.toString());
  };

  return (
    <div className="home">
      <div className="container">
        <h1>
          Pancra<span>Location</span>
        </h1>
        <p>
          Enter your coordinates or enable real-time geolocation to determine
          your position on the map:
        </p>

        <hr />

        <div className="locations">
        <p className="instruction">
              Enter your location manually
            </p>
          <div className="location">
            <div className="field">
              <label htmlFor="latitude">Latitude:</label>
              <input
                type="text"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="longitude">Longitude:</label>
              <input
                type="text"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
          </div>

          <p className="instruction">OR</p>

          <div className="realTime">
            <a className="btn" onClick={handleRealTimeGeolocation}>
              Use Real Time Geolocation
            </a>
          </div>

          <div className="map">
          {latitude !== "" && longitude !== "" && (
          <Map
            latitude={latitude}
            longitude={longitude}
            useRealTimeGeolocation={false}
            onMapClick={handleMapClick}
          />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
