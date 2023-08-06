import Map from "../../components/Map/Map";
import "./Home.scss";

function Home() {
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
            <a className="btn">Use Real Time Geolocation</a>
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
