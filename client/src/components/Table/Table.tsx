import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import "./Table.scss";

type Props = {
  columns: GridColDef[];
  rows: object[];
  onPolygonDeleted: () => void;
};

const Table = (props: Props) => {
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/polygons/${id}`);
      alert("Polygon and coordinates deleted successfully");
      props.onPolygonDeleted(); 
    } catch (error) {
      console.error("Error deleting polygon:", error);
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="action">

          <div
            className="delete"
            onClick={() => {
              handleDelete(params.row.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-trash"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ff2825"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </div>
        </div>
      );
    },
  };


  const colorColumn: GridColDef = {
    field: "color",
    headerName: "Color",
    flex: 1,
    renderCell: (params) => (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: params.value as string,
        }}
      ></div>
    ),
  };

  const filteredColumns = props.columns.filter((col) => col.field !== "color");

  const modifiedColumns = [...filteredColumns, colorColumn, actionColumn];


  return (
    <div className="table">
      <Box sx={{ height: "auto", width: "100%" }}>
        <DataGrid
          className="dataGrid"
          rows={props.rows}
          columns={modifiedColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector

        />
      </Box>
    </div>
  );
};

export default Table;
