import React from "react";
import TaskList from "./components/TaskList";
import TasksProvider from "./components/TasksProvider";
import SearchBox from "./components/SearchBox";
import FilterProvider from "./components/FilterProvider";
import AddTask from "./components/AddTask";
import "./css/app.css";

function App() {
  return (
    <>
      <FilterProvider>
        <TasksProvider>
          <SearchBox />
          <h1>TASK's APP</h1>
          <AddTask />
          <TaskList />
        </TasksProvider>
      </FilterProvider>
    </>
  );
}
export default App;
