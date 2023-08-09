import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios"; 
import "./Add.scss";

type Props = {
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onPolygonAdded: () => void;
};

function Add(props: Props) {
  const [coordinates, setCoordinates] = useState([
    { id: 1, latitude: "", longitude: "" },
    { id: 2, latitude: "", longitude: "" },
    { id: 3, latitude: "", longitude: "" },
    { id: 4, latitude: "", longitude: "" },
  ]);

  const handleAddCoordinate = () => {
    setCoordinates((prevCoordinates) => [
      ...prevCoordinates,
      { id: Date.now(), latitude: "", longitude: "" },
    ]);
  };

  const handleRemoveCoordinate = () => {
    if (coordinates.length > 4) {
      setCoordinates((prevCoordinates) => prevCoordinates.slice(0, -1));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const color = formData.get("color") as string;
  
      const coordinatesToSend = coordinates.map((coord) => ({
        latitude: formData.get(`latitude-${coord.id}`) as string,
        longitude: formData.get(`longitude-${coord.id}`) as string,
      }));
      
      const response = await axios.post('http://localhost:3000/api/polygons', {
        name,
        color,
        coordinates: coordinatesToSend,
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

          {coordinates.map((coordinate) => (
            <>
              <div className="item">
                <label htmlFor={`latitude-${coordinate.id}`}>Latitude</label>
                <input
                  type="text"
                  id={`latitude-${coordinate.id}`}
                  value={coordinate.latitude}
                  name={`latitude-${coordinate.id}`}
                  onChange={(e) =>
                    setCoordinates((prevCoordinates) =>
                      prevCoordinates.map((coord) =>
                        coord.id === coordinate.id
                          ? { ...coord, latitude: e.target.value }
                          : coord
                      )
                    )
                  }
                />
              </div>

              <div className="item">
                <label htmlFor={`longitude-${coordinate.id}`}>Longitude</label>
                <input
                  type="text"
                  id={`longitude-${coordinate.id}`}
                  value={coordinate.longitude}
                  name={`longitude-${coordinate.id}`}
                  onChange={(e) =>
                    setCoordinates((prevCoordinates) =>
                      prevCoordinates.map((coord) =>
                        coord.id === coordinate.id
                          ? { ...coord, longitude: e.target.value }
                          : coord
                      )
                    )
                  }
                />
              </div>
            </>
          ))}

          <button
            type="button"
            onClick={
              coordinates.length >= 5 ? handleRemoveCoordinate : undefined
            }
            disabled={coordinates.length < 5}
          >
            -
          </button>

          <button type="button" onClick={handleAddCoordinate}>
            +
          </button>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
