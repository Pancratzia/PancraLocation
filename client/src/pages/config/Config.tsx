
import { GridColDef } from "@mui/x-data-grid";
import Table from "../../components/Table/Table";
import "./Config.scss";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  {
    field: "polygon",
    headerName: "Polygon"
    
  },
  {
    field: "color",
    headerName: "Color"
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
  return (
    <div className="config">
      <div className="container">
        
        <h1>Your Polygons</h1>

        <button>Add New Polygon</button>

        <Table columns={columns} rows={rows} />

      </div>
    </div>
  );
}

export default Config;
