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
      // Geolocation is not available in the browser
      alert("Geolocation is not supported in this browser.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
          <div className="location">
            <div className="field">
              <label htmlFor="latitude">Latitude:</label>
              <input type="text" id="latitude" />
            </div>
            <div className="field">
              <label htmlFor="longitude">Longitude:</label>
              <input type="text" id="longitude" />
            </div>

            <a className="btn">Find</a>
          </div>
          <p className="or">OR</p>
          <div className="realTime">
            <a className="btn" onClick={handleRealTimeGeolocation}>Use Real Time Geolocation</a>
          </div>

          <div className="map">
            <Map latitude={latitude} longitude={longitude} useRealTimeGeolocation={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
