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
    { field: "name", headerName: "Name", width: 300 },
    { field: "description", headerName: "Description", flex: 1, minWidth: 800 },
    {
      field: "deadline",
      headerName: "Deadline",
      type: "date",
      flex: 0.3,
      valueGetter: (value, row) =>
        row.deadline ? new Date(row.deadline) : null,
    },
    {
      field: "tags",
      headerName: "Tags",
      sortable: false,
      flex: 0.5,
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
      align: "right",
      flex: 0.1,
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
          pageSizeOptions={[5, 10, 20]}
          sx={{ border: 15, padding: 4 }}
          showToolbar
          slotProps={{ toolbar: { title: `${userName}'s Tasks` } }}
        />
      )}
    </Paper>
  );
};
