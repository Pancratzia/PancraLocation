import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "./Map.scss";
import { useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

type Props = {
  latitude: string;
  longitude: string;
};

function Map(props: Props) {

  const [position, setPosition] = useState({ lat: 10.073572859883452, lng: -69.32142913341524 });

  return (
    <div className="map">
      <MapContainer  center={position} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Catedral de Barquisimeto. <br /> Lara
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
