import { useState, useContext, useRef } from "react";
import { TaskDispatchContext } from "./TasksProvider";
import "../css/AddTask.css";

export default function AddTask() {
  const [newTask, setNewTask] = useState("");
  const dispatch = useContext(TaskDispatchContext);
  const inputRef = useRef(null);

  return (
    <div className="AddTask">
      <form onSubmit={handleSubmit}>
        <label>
          <span>New Task</span>
          <input
            ref={inputRef}
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </label>
        <button className="add-btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (newTask.length == 0) {
      alert("Task Cannot Be Empty!");
      return;
    }
    dispatch({ type: "add-task", text: newTask });
    setNewTask("");
    inputRef.focus();
  }
}
