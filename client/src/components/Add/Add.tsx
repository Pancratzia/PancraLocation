import { GridColDef } from "@mui/x-data-grid";
import "./Add.scss";

type Props = {
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Add(props: Props) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Add or modify new user
  };

  return (
    <div className="addModal">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add You New Polygon</h1>

        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id")
            .map((column) => (
              <div className="item">
                <label htmlFor={column.field}>{column.headerName}</label>
                <input type={column.type} id={column.field} />
              </div>
            ))}

          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
