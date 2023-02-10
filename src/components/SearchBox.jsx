import { useContext } from "react";
import { FilterContext } from "./FilterProvider";
import "../css/SearchBox.css";

export default function SearchBox() {
  const { setFilteredText, setFilter } = useContext(FilterContext);
  return (
    <>
      <div className="SearchBox">
        <label>
          Search For Tasks
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setFilteredText(e.target.value)}
          />
        </label>
        <label>
          Apply Filter
          <select name="filter" onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Show All</option>
            <option value="completed-only">Completed Only</option>
            <option value="incompleted-only">Incompleted Only</option>
          </select>
        </label>
      </div>
    </>
  );
}
