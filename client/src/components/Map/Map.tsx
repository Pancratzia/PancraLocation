import { MapContainer, Marker, Polygon, Popup, TileLayer, Tooltip, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "./Map.scss";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";

interface Coordinates {
  lat: number;
  lng: number;
}

interface PolygonData {
  coordinates: LatLngExpression[]; // Use LatLngExpression for polygon coordinates
  title: string;
  color: string;
}

type Props = {
  latitude: string;
  longitude: string;
  useRealTimeGeolocation?: boolean;
};

const polygons: PolygonData[] = [
  {
    coordinates: [
      [10.08225749860928, -69.30652350819214],
      [10.080841640221735, -69.30752680771464],
      [10.078931867892194, -69.30879765377746],
      [10.073136627430387, -69.30949996344309],
      [10.072807349277454, -69.30097191749833],
      [10.080413588786783, -69.29759414243797],
      [10.081467252835154, -69.30137323730771],
      [10.08225749860928, -69.30652350819214]
    ],
    title: "Polygon 1",
    color: "blue",
  },
  {
    coordinates: [
      [10.068547892095253, -69.339039869577],
      [10.065123334172199, -69.33877232303806],
      [10.065650191602785, -69.33285285585278],
      [10.069140600354501, -69.33322073234422],
      [10.068547892095253, -69.339039869577]
    ],
    title: "Polygon 2",
    color: "red",
  },
];

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
            You're Here
          </Popup>
        </Marker>

        {polygons.map((polygon, index) => (
          <Polygon key={index} positions={polygon.coordinates} pathOptions={{ color: polygon.color }}>
            <Tooltip>{polygon.title}</Tooltip>
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
