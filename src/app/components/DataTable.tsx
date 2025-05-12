/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { AppContext } from "../tasks/page";
import { useContext, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { ChipComponent } from "./Chip";
import { HydratedDocument } from "mongoose";
import { ITask } from "../models/Task";
import { EditButton } from "./Button";

export const DataTableComponent = () => {
  const { userName, tasks, setTasks, setProps } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    return tasks;
  };

  useEffect(() => {
    fetchTasks().then((tasks) => {
      setTimeout(() => {
        setTasks(tasks);
        setLoading(false);
      }, 2000);
    });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
    },
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
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      align: "center",
      flex: 0.1,
      renderCell: () => <EditButton />,
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={(tasks as unknown as Array<HydratedDocument<ITask>>).map(
          (task) => {
            return {
              ...task,
              id: task._id,
            };
          },
        )}
        rowSelection
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20]}
        sx={{ border: 15, padding: 4 }}
        showToolbar
        loading={loading}
        slotProps={{
          toolbar: { title: `${userName}'s Tasks` },
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        onRowSelectionModelChange={(row) => {
          const selectedRowData = tasks.filter(
            (task: HydratedDocument<ITask>) => row.ids.has(task._id.toString()),
          );
          if (selectedRowData && selectedRowData.length > 0) {
            const { _id, name, description, deadline, tags, completed } =
              selectedRowData[0];
            setProps({ _id, name, description, deadline, tags, completed });
          }
        }}
      />
    </Paper>
  );
};
