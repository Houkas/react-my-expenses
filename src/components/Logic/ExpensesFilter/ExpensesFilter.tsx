import { getDefaultSettings } from "http2";
import React, { useEffect, useState } from "react";
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
  
  const [filterSelected, setFilterSelected] = useState("year");
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    if(isInit === true){
      selectYearHandler(null, isInit);
      setIsInit(false);
    }
  }, [isInit])

  function selectYearHandler(event: any, isInit: boolean) {
    if(isInit === true){
      props.onYearSelected(currentYear.toString())
    } else {
      props.onYearSelected(event.target.value);
    }

  }

  function selectMonthHandler(event: any, isInit: boolean) {
    if(isInit === true){
      props.onMonthSelected(monthSelected.toString())
    } else {
      props.onMonthSelected(event.target.value);
    }

  }

  function selectDayHandler(event: any, isInit: boolean) {
    if(isInit === true){
      props.onDaySelected(daySelected.toString())
    } else {
      props.onDaySelected(event.target.value);
    }
  }

  function selectFilterHandler(event: any) {
    if(event.target.value === "day"){
      setFilterSelected(event.target.value);
      selectDayHandler(null, true);
    }
    if(event.target.value === "month"){
      setFilterSelected(event.target.value);
      selectMonthHandler(null, true);
    }
    if(event.target.value === "year"){
      setFilterSelected(event.target.value);
      selectYearHandler(null, true);
    }
    
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
              onChange={(event) => selectDayHandler(event,false)}
              className="w-[110px] ml-2 p-2 border-lgrey border bg-transparent color-lgrey font-sm rounded-none"
              placeholder="Select date"
              defaultValue={daySelected}
            />
          </>
        )}

        {filterSelected === "month" && (
          <>
            <input
              type="month"
              onChange={(event) => selectMonthHandler(event, false)}
              className="w-[100px] ml-2 p-2 border-lgrey border bg-transparent color-lgrey font-sm rounded-none"
              placeholder="Select date"
              defaultValue={monthSelected}
            />
          </>
        )}

        {filterSelected === "year" && (
          <>
            <select
              value={props.selected}
              onChange={(event) => selectYearHandler(event,false)}
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
