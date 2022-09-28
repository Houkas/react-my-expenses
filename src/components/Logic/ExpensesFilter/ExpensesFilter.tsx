import { getDefaultSettings } from "http2";
import React, { useState } from "react";
import "./ExpensesFilter.css";
function ExpensesFilter(props: any) {
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const [monthSelected, setMonthSelected] = useState(
    [currentYear, currentMonth].join("-")
  );
  const [filterSelected, setFilterSelected] = useState("");

  function selectYearHandler(event: any) {
    props.onYearSelected(event.target.value);
  }
  function selectFilterHandler(event: any) {
    //props.onYearSelected(event.target.value);
    setFilterSelected(event.target.value);
    console.log(event.target.value)
    debugger;
  }

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control flex flex-col">
        <label>Filter by</label>
        <select value={filterSelected} onChange={selectFilterHandler}>
          <option value="day">Jour</option>
          <option value="month">Mois</option>
          <option value="year">Année</option>
        </select>

        {filterSelected === "day" && (
          <>
            <label>// jour</label>
            <div className="relative">
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
              />
            </div>
          </>
        )}

        {filterSelected === "month" && (
          <>
            <label>// mois</label>
            <div className="relative">
              <input
                type="year"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
                defaultValue={monthSelected}
              />
            </div>
          </>
        )}

        {filterSelected === "year" && (
          <>
            <label>// année</label>
            <select value={props.selected} onChange={selectYearHandler}>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </>
        )}

      </div>
    </div>
  );
}

export default ExpensesFilter;
