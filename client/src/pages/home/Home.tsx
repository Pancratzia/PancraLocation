import Map from "../../components/Map/Map";
import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <h1>PancraLocation</h1>
        <p>
          Enter your coordinates or enable real-time geolocation to determine
          your position on the map:
        </p>

        <hr />

        <div className="locations">
          <div className="location">
            <label htmlFor="latitude">Latitude:</label>
            <input type="text" id="latitude" />
            <label htmlFor="longitude">Longitude:</label>
            <input type="text" id="longitude" />
            <button>Find</button>
          </div>
          <div className="realTime">
            <button>Use Real Time Geolocation</button>
          </div>

          <div className="map">
              <Map />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
