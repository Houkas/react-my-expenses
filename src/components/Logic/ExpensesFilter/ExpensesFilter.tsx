import { getDefaultSettings } from "http2";
import React, { useState } from "react";
import "./ExpensesFilter.css";
function ExpensesFilter(props: any) {
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentDay = String(new Date().getDay() + 1).padStart(2, "0");
  const [daySelected, setDaySelected] = useState(
    [currentYear, currentMonth, currentDay].join("-")
  );
  const [monthSelected, setMonthSelected] = useState(
    [currentYear, currentMonth].join("-")
  );
  const [filterSelected, setFilterSelected] = useState("day");

  function selectYearHandler(event: any) {
    props.onYearSelected(event.target.value);
  }
  function selectFilterHandler(event: any) {
    setFilterSelected(event.target.value);
  }

  return (
    <div className="my-2">
      <div className="flex flex-row w-full items-center justify-end">
        <label className="color-lgrey mr-2">Filtrer par</label>
        <select
          value={filterSelected}
          onChange={selectFilterHandler}
          className={
            "p-2 border-lgrey border bg-transparent color-lgrey font-sm rounded-none"
          }
        >
          <option value="day">Jour</option>
          <option value="month">Mois</option>
          <option value="year">Année</option>
        </select>

        {filterSelected === "day" && (
          <>
            <input
              type="date"
              className="w-1/3 ml-2 p-2 border-lgrey border bg-transparent color-lgrey font-sm rounded-none"
              placeholder="Select date"
              defaultValue={daySelected}
            />
          </>
        )}

        {filterSelected === "month" && (
          <>
            <input
              type="year"
              className="w-1/3 ml-2 p-2 border-lgrey border bg-transparent color-lgrey font-sm rounded-none"
              placeholder="Select date"
              defaultValue={monthSelected}
            />
          </>
        )}

        {filterSelected === "year" && (
          <>
            <select
              value={props.selected}
              onChange={selectYearHandler}
              className={
                "ml-2 p-2 border-lgrey border bg-transparent color-lgrey font-sm rounded-none"
              }
            >
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
