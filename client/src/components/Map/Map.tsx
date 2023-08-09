import { MapContainer, Marker, Polygon, Popup, TileLayer, Tooltip, useMap} from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import "./Map.scss";

interface Coordinates {
  lat: number;
  lng: number;
}

interface PolygonData {
  id: number;
  name: string;
  color: string;
  coordinates: { latitude: number; longitude: number }[];
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
  const [polygons, setPolygons] = useState<PolygonData[]>([]);

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

  useEffect(() => {
    axios.get('http://localhost:3000/api/polygons')
      .then(response => {
        setPolygons(response.data);
      })
      .catch(error => {
        console.error("Error fetching polygons:", error);
      });
  }, []);

  return (

    <div className="map">
      <MapContainer  center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            You're Here
          </Popup>
        </Marker>

        {polygons.map((polygon, index) => (
          <Polygon
            key={polygon.id}
            positions={polygon.coordinates.map(coord => [coord.latitude, coord.longitude])}
            pathOptions={{ color: polygon.color }}
          >
            <Tooltip>{polygon.name}</Tooltip>
          </Polygon>
        ))}

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
