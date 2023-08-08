
import { GridColDef } from "@mui/x-data-grid";
import Table from "../../components/Table/Table";
import "./Config.scss";
import { useState } from "react";
import Add from "../../components/Add/Add";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, type: "number" },
  {
    field: "polygon",
    headerName: "Polygon",
    type: "string",
    flex: 2,
  },
  {
    field: "color",
    headerName: "Color",
    type: "string",
    flex: 2,
  },
];

const rows = [
  { id: 1, polygon: "One", color: "#111111"},
  { id: 2, polygon: "Two", color: "#222222"},
  { id: 3, polygon: "Three", color: "#333333"},
  { id: 4, polygon: "Four", color: "#444444"},
  { id: 5, polygon: "Five", color: "#555555"},
];

function Config() {

  const [open, setOpen] = useState(false);


  return (
    <div className="config">
      <div className="container">
        
        <h1>Your Polygons</h1>

        <div className="add">
          <span onClick={() => setOpen(true)} className="btn">Add New Polygon</span>
        </div>

        <Table columns={columns} rows={rows} />
        {open && <Add setOpen={setOpen} columns={columns} />}

      </div>
    </div>
  );
}

export default Config;
