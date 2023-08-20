import { useEffect, useState } from "react";
import axios from "axios";
import Add from "../../components/Add/Add";
import Table from "../../components/Table/Table";
import "./Config.scss";
import Swal from 'sweetalert2';

const columns = [
  { field: "id", headerName: "ID", flex: 1, type: "string", },
  {
    field: "name",
    headerName: "Polygon",
    type: "string",
    flex: 2,
  },
  {
    field: "color",
    headerName: "Color",
    type: "color",
    flex: 2,
  },
];

export interface Polygon {
  type: string;
  properties: {
    name: string;
    color: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  _id: string;
}

function Config() {
  const [open, setOpen] = useState(false);
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    fetchPolygons();
  }, []);

  const fetchPolygons = async () => {
    try {
      const response = await axios.get('/api/polygons');
      const formattedPolygons = response.data.map((polygon: Polygon) => ({
        id: polygon._id,
        name: polygon.properties.name,
        color: polygon.properties.color,
      }));
      setPolygons(formattedPolygons);
    } catch (error) {
      console.error("Error fetching polygons:", error);
    }
  };

  const handlePolygonAdded = () => {
    fetchPolygons();
  };

  const handlePolygonDeleted = () => {
    fetchPolygons();
  };

  const handleAddClick = () => {
    if (polygons.length < 5) {
      setOpen(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Limit Exceeded',
        text: 'You cannot add more than 5 polygons!',
      });
    }
  };

  return (
    <div className="config">
      <div className="container">
        <h1>Your Polygons</h1>
        {polygons.length < 5 && (
        <div className="add">
          <span onClick={handleAddClick} className="btn">
            Add New Polygon
          </span>
        </div>
         )}
        <Table columns={columns} rows={polygons} onPolygonDeleted={handlePolygonDeleted} />
        {open && <Add setOpen={setOpen} columns={columns} onPolygonAdded={handlePolygonAdded} />}
      </div>
    </div>
  );
}

export default Config;

