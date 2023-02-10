import { useContext, useState } from "react";
import { TaskDispatchContext } from "./TasksProvider";
import "../css/Task.css";

export default function Task({ task }) {
  const { text, isCompleted, id } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(text);
  const dispatch = useContext(TaskDispatchContext);
  return (
    <>
      <li
        style={{
          color: isCompleted ? "gray" : "black",
        }}
        className="Task"
      >
        <label>
          <input
            type="checkbox"
            id={`${id}-checkbox`}
            checked={isCompleted}
            onChange={toggleIsComplete}
          />
          {!isEditing ? (
            <span> {text} </span>
          ) : (
            <input
              type={text}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          )}
        </label>
        <div className="buttons">
          {isEditing ? (
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
          )}
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </li>
    </>
  );

  function handleDelete(e) {
    dispatch({ type: "delete-task", id: id });
  }

  function handleEdit(e) {
    setIsEditing((prev) => !prev);
  }

  function handleSave() {
    if (input.length == 0) {
      alert("Task Cannot Be Empty!");
      return;
    }
    setIsEditing((prev) => !prev);
    dispatch({
      type: "update-task",
      id: id,
      updatedValue: { text: input },
    });
  }

  function toggleIsComplete() {
    dispatch({
      type: "update-task",
      id,
      updatedValue: { isCompleted: !isCompleted },
    });
  }
}
