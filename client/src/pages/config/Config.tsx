
import { GridColDef } from "@mui/x-data-grid";
import Table from "../../components/Table/Table";
import "./Config.scss";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1},
  {
    field: "polygon",
    headerName: "Polygon",
    flex: 2,
  },
  {
    field: "color",
    headerName: "Color",
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
  return (
    <div className="config">
      <div className="container">
        
        <h1>Your Polygons</h1>

        <div className="add">
          <Link to={"/"} className="btn">Add New Polygon</Link>
        </div>

        <Table columns={columns} rows={rows} />

      </div>
    </div>
  );
}

export default Config;
