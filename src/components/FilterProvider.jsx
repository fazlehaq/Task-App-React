import React, { useReducer, useState } from "react";

export const FilterContext = React.createContext();

export default function FilterProvider({ children }) {
  const [filteredText, setFilteredText] = useState("");
  const [filter, setFilter] = useState("all");

  const filterContextValue = {
    filteredText,
    setFilteredText,
    filter,
    setFilter,
  };

  return (
    <>
      <FilterContext.Provider value={filterContextValue}>
        {children}
      </FilterContext.Provider>
    </>
  );
}
