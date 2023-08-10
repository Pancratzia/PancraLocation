import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import "./Add.scss";
import DrawableMap from "../DrawableMap/DrawableMap";

type Props = {
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onPolygonAdded: () => void;
};

function Add(props: Props) {
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);

  const handlePolygonDrawn = (newCoordinates: [number, number][]) => {
    setCoordinates(newCoordinates);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const color = formData.get("color") as string;
  
      const formattedCoordinates = coordinates.map(([latitude, longitude]) => ({
        latitude,
        longitude,
      }));
  
      const response = await axios.post("http://localhost:3000/api/polygons", {
        name,
        color,
        coordinates: formattedCoordinates,
      });
  
      if (response.status === 200) {
        alert(response.data.message);
        props.setOpen(false);
        props.onPolygonAdded();
      }
    } catch (error) {
      alert(error);
    }
  };
  

  return (
    <div className="addModal">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add Your New Polygon</h1>

        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id")
            .map((column) => (
              <div key={column.field} className="item">
                <label htmlFor={column.field}>{column.headerName}</label>
                <input type={column.type} name={column.field} />
              </div>
            ))}

          <DrawableMap onPolygonDrawn={handlePolygonDrawn} />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
