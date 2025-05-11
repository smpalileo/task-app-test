import { HydratedDocument } from "mongoose";
import { ITask } from "../models/Task";
import { Loader } from "./Loader";
import { AppContext } from "../tasks/page";
import { useContext } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { ChipComponent } from "./Chip";

export const DataTableComponent = ({
  data,
}: {
  data: Array<HydratedDocument<ITask>>;
}) => {
  const { userName, loading } = useContext(AppContext);

  console.log("context: ", userName);
  console.log("loading: ", loading);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 400 },
    { field: "description", headerName: "Description", width: 850 },
    {
      field: "deadline",
      headerName: "Deadline",
      type: "date",
      width: 300,
      valueGetter: (value, row) =>
        row.deadline ? new Date(row.deadline) : null,
    },
    {
      field: "tags",
      headerName: "Tags",
      sortable: false,
      width: 450,
      renderCell: (params: GridRenderCellParams<string[], string[]>) =>
        params.value && params.value.length > 0
          ? params.value.map((tag) => (
              <ChipComponent
                key={`${tag}`}
                label={tag}
              />
            ))
          : null,
    },
    {
      field: "completed",
      headerName: "Status",
      type: "boolean",
      sortable: false,
      width: 50,
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ height: 800, width: "100%" }}>
      {loading ? (
        <Loader />
      ) : (
        <DataGrid
          rows={data.map((task) => {
            return {
              ...task,
              id: task._id,
            };
          })}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      )}
    </Paper>
  );
};
