import { MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "./Map.scss";
import { useEffect, useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

type Props = {
  latitude: string;
  longitude: string;
};

function Map(props: Props) {

  const [position, setPosition] = useState<Coordinates>({
    lat: parseFloat(props.latitude) || 0,
    lng: parseFloat(props.longitude) || 0,
  });

  useEffect(() => {
    setPosition({
      lat: parseFloat(props.latitude) || 0,
      lng: parseFloat(props.longitude) || 0,
    });
  }, [props.latitude, props.longitude]);

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

        <ChangeView center={position} zoom={10} />
      </MapContainer>
    </div>
  );
}

function ChangeView({ center, zoom }: { center: Coordinates; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default Map;
