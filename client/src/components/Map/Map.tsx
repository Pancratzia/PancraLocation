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
  useRealTimeGeolocation?: boolean;
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

  useEffect(() => {
    if (props.useRealTimeGeolocation) {
      const leafletMap = useMap();
      leafletMap.flyTo(position, 15);
    }
  }, [props.useRealTimeGeolocation, position]);

  return (
    <div className="map">
      <MapContainer  center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Catedral de Barquisimeto. <br /> Lara
          </Popup>
        </Marker>

        <ChangeView center={position} zoom={13} />
      </MapContainer>
    </div>
  );
}

function ChangeView({ center, zoom }: { center: Coordinates; zoom: number }) {
  const map = useMap();
  map.flyTo(center, zoom);
  return null;
}

export default Map;
