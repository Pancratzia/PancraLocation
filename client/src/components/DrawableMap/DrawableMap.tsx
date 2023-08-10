import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, FeatureGroup, Polygon } from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import './DrawableMap.scss';

type DrawableMapProps = {
  onPolygonDrawn: (coordinates: [number, number][]) => void;
};

function DrawableMap({ onPolygonDrawn }: DrawableMapProps) {
  const [polygon, setPolygon] = useState<[number, number][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handlePolygonCreated = (e: any) => {
    const newPolygon = e.layer.getLatLngs()[0].map((latLng: any) => [latLng.lat, latLng.lng]);
    setPolygon(newPolygon);
    onPolygonDrawn(newPolygon);
    setIsDrawing(false);
  };

  const handleMapClick = (e: any) => {
    if (!isDrawing) {
      setPolygon([]);
      setIsDrawing(true);
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <MapContainer className="drawableMap" center={[0, 0]} zoom={3}>
      <MapEvents />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        <EditControl
          position="topright"
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
            polygon: {
              allowIntersection: false,
              drawError: {
                color: "#e1e100",
                message: "<strong>Error:</strong> Shape edges cannot cross!",
              },
            },
          }}
          onCreated={handlePolygonCreated}
        />
        {isDrawing && polygon.length > 0 && <Polygon positions={polygon} />}
      </FeatureGroup>
    </MapContainer>
  );
}

export default DrawableMap;




