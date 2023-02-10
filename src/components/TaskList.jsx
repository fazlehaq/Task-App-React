import React, { useContext } from "react";
import Task from "./Task";
import { TaskContext } from "./TasksProvider";

export default function TaskList() {
  const tasks = useContext(TaskContext);
  return (
    <div className="TaskList">
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => {
            return <Task key={task.id} task={task} />;
          })}
        </ul>
      ) : (
        <h2 style={{ marginTop: "4rem", textAlign: "center" }}>
          No Tasks Here ...
        </h2>
      )}
    </div>
  );
}
