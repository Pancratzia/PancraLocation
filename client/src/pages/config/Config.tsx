
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
    // Llamada a la API para obtener los datos de los polígonos
    axios.get('http://localhost:3000/api/polygons')
      .then(response => {
        setPolygons(response.data);
      })
      .catch(error => {
        console.error("Error fetching polygons:", error);
      });
  }, []);

  

  return (
    <div className="config">
      <div className="container">
        
        <h1>Your Polygons</h1>

        <div className="add">
          <span onClick={() => setOpen(true)} className="btn">Add New Polygon</span>
        </div>

        <Table columns={columns} rows={polygons} />
        {open && <Add setOpen={setOpen} columns={columns} />}

      </div>
    </div>
  );
}

export default Config;
