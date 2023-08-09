
import { GridColDef } from "@mui/x-data-grid";
import Table from "../../components/Table/Table";
import "./Config.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Add from "../../components/Add/Add";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, type: "number" },
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


function Config() {

  const [open, setOpen] = useState(false);
  const [polygons, setPolygons] = useState([]);


  useEffect(() => {
    fetchPolygons();
  }, []);

  const fetchPolygons = () => {
    axios.get('./api/polygons')
      .then(response => {
        setPolygons(response.data);
      })
      .catch(error => {
        console.error("Error fetching polygons:", error);
      });
  };

  const handlePolygonAdded = () => {
    fetchPolygons();
  };

  const handlePolygonDeleted = () => {
    fetchPolygons();
  };

  

  return (
    <div className="config">
      <div className="container">
        
        <h1>Your Polygons</h1>

        <div className="add">
          <span onClick={() => setOpen(true)} className="btn">Add New Polygon</span>
        </div>

        <Table columns={columns} rows={polygons} onPolygonDeleted={handlePolygonDeleted} />
        {open && <Add setOpen={setOpen} columns={columns} onPolygonAdded={handlePolygonAdded} />}

      </div>
    </div>
  );
}

export default Config;
