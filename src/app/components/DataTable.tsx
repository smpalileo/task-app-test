import DataTable from "react-data-table-component";
import { HydratedDocument } from "mongoose";
import { ITask } from "../models/Task";
import { Loader } from "./Loader";
import { AppContext } from "../tasks/page";
import { useContext } from "react";

export const DataTableComponent = ({
  data,
}: {
  data: Array<HydratedDocument<ITask>>;
}) => {
  const { userName, loading } = useContext(AppContext);

  console.log("context: ", userName);
  console.log("loading: ", loading);

  return (
    <DataTable
      columns={[
        {
          name: "Name",
          selector: (task) => task.name,
        },
        {
          name: "Description",
          selector: (task) => task.description,
        },
        {
          name: "Status",
          selector: (task) => task.completed,
        },
        {
          name: "Deadline",
          selector: (task) => (task.deadline ? task.deadline.toString() : ""),
        },
        {
          name: "Tags",
          selector: (task) =>
            task.tags && task.tags.length > 0 ? task.tags.join(", ") : "",
        },
      ]}
      data={data}
      pagination
      fixedHeader={true}
      fixedHeaderScrollHeight={"300px"}
      progressPending={loading}
      progressComponent={<Loader />}
    />
  );
};
