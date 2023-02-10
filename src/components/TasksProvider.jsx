import React, { useReducer, useContext, useEffect } from "react";
import { FilterContext } from "./FilterProvider";

const LOCAL_STORAGE_KEY = "TASK_APP_TASKS";

export const TaskContext = React.createContext();
export const TaskDispatchContext = React.createContext();

export default function TasksProvider({ children }) {
  const { filteredText, filter } = useContext(FilterContext);
  const [tasks, dispatch] = useReducer(
    taskReducer,
    getLocalStorageData() ?? initialTasks
  );

  useEffect(() => {
    setLocalStorageData(tasks);
  }, [tasks]);

  return (
    <>
      <TaskContext.Provider value={filteredTasks()}>
        <TaskDispatchContext.Provider value={dispatch}>
          {children}
        </TaskDispatchContext.Provider>
      </TaskContext.Provider>
    </>
  );

  function setLocalStorageData(tasks) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }

  function getLocalStorageData() {
    const tasksString = localStorage.getItem(LOCAL_STORAGE_KEY);
    return JSON.parse(tasksString) ?? initialTasks;
  }

  function filteredTasks() {
    if (filteredText == "" && filter == "all") return tasks;

    let filteredTasks = [...tasks];

    if (filteredText !== "") {
      filteredTasks = filteredTasks.filter((task) =>
        task.text.includes(filteredText)
      );
    }

    if (filter == "completed-only") {
      filteredTasks = filteredTasks.filter((task) => task.isCompleted);
    }

    if (filter == "incompleted-only") {
      filteredTasks = filteredTasks.filter((task) => !task.isCompleted);
    }
    return filteredTasks;
  }
}

function taskReducer(tasks, action) {
  switch (action.type) {
    case "add-task": {
      const text = action.text;
      return handleAddTask(tasks, text);
    }
    case "update-task":
      const taskId = action.id;
      const updatedValue = action.updatedValue;
      return handleUpdateTask(tasks, taskId, updatedValue);

    case "delete-task": {
      const taskId = action.id;
      return handleDeleteTask(tasks, taskId);
    }
  }
}

function handleAddTask(tasks, text) {
  const newTask = {
    text,
    id: nextId++,
    isCompleted: false,
  };

  return [...tasks, newTask];
}

function handleUpdateTask(tasks, taskId, updatedValue) {
  const taskIndex = tasks.findIndex((task) => task.id == taskId);
  const newTasks = [...tasks];
  newTasks[taskIndex] = { ...newTasks[taskIndex], ...updatedValue };
  return newTasks;
}

function handleDeleteTask(tasks, taskId) {
  return tasks.filter((task) => task.id != taskId);
}
const initialTasks = [
  { id: 1, text: "Complete The React Course !", isCompleted: false },
  { id: 2, text: "Logical Reasoning Practice !", isCompleted: false },
  { id: 3, text: "Complete CET Syllabus !", isCompleted: false },
];

let nextId = 4;
