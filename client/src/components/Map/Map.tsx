import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./Map.scss";

interface Coordinates {
  lat: number;
  lng: number;
}

interface GeoJSONFeature {
  type: string;
  properties: {
    name: string;
    color: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number][][];
  };
}

type Props = {
  latitude: string;
  longitude: string;
  useRealTimeGeolocation?: boolean;
  onMapClick: (lat: number, lng: number) => void;
};

function Map(props: Props) {
  const [position, setPosition] = useState<Coordinates>({
    lat: parseFloat(props.latitude) || 0,
    lng: parseFloat(props.longitude) || 0,
  });
  const [geoJSONFeatures, setGeoJSONFeatures] = useState<GeoJSONFeature[]>([]);

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
    axios
      .get("http://localhost:3000/api/polygons")
      .then((response) => {
        setGeoJSONFeatures(response.data);
      })
      .catch((error) => {
        console.error("Error fetching polygons:", error);
      });
  }, []);

  return (
    <div className="map">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onMapClick={props.onMapClick} />

        <Marker position={position}>
          <Popup>You're Here</Popup>
        </Marker>

        {geoJSONFeatures.map((feature, index) => (
          <Polygon
            key={index}
            positions={feature.geometry.coordinates[0].map((coord) => [
              coord[1],
              coord[0],
            ])}
            pathOptions={{
              color: feature.properties.color,
              fillRule: "nonzero",
            }}
          >
            <Tooltip>{feature.properties.name}</Tooltip>
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

function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });

  return null;
}

export default Map;
