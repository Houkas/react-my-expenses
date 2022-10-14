import "./Expenses.css";
import Card from "../../UI/Card/Card";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import { useContext, useEffect, useState } from "react";
import ExpensesList from "../ExpensesList/ExpensesList";
import ExpensesSum from "../ExpensesSum/ExpensesSum";
import { Expense } from "../../../types/Expense";

import useStore from "../../store/store-zustand";

function Expenses() {

  const expensesStore = useStore((state) => state.expenses);
  const expensesFilteredStore = useStore((state) => state.expensesFiltered);
  const setExpensesSumStore = useStore((state) => state.setExpensesSum);
  const setExpensesFilteredStore = useStore((state) => state.setExpensesFiltered);
  const expensesSumStore = useStore((state) => state.expensesSum);

  const [selectedYear, setYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setMonth] = useState(String(new Date().getMonth() + 1).padStart(2, "0"));
  const [selectedDay, setDay] = useState(String(new Date().getDay() + 1).padStart(2, "0"));
  const [isInit, setIsInit] = useState(true);

  function yearFilterHandler(yearSelected: string) {
    setYear(yearSelected);
    setIsInit(false);
  }

  function monthFilterHandler(monthSelected: string) {
    setMonth(monthSelected);
    setIsInit(false);
  }

  function dayFilterHandler(daySelected: string) {
    setDay(daySelected);
    setIsInit(false);
  }

  useEffect(() => {
    // init
    if (expensesStore!.length > 0 && expensesSumStore === 0 && isInit === true) {
      let sum = 0;
      expensesStore!.forEach((element: Expense) => {
        sum = sum + element.amount
      });
      setExpensesFilteredStore(expensesStore);
      setExpensesSumStore(sum)
      setIsInit(false);
    }
    // update
    //by year
    if (expensesFilteredStore !== undefined && isInit === false) {
      (async () => {
        let fExpenses;
        fExpenses = expensesStore!.filter((expense: Expense) => {
          const expenseDate = (new Date(expense.date).getFullYear()).toString();
          return expenseDate === selectedYear;
        });
        setExpensesFilteredStore(fExpenses);
        let sum = 0;
        fExpenses!.forEach((element: Expense) => {
          sum = sum + element.amount
        });
        setExpensesSumStore(sum);
        if ((fExpenses !== undefined
          && fExpenses!.length === 0)
          || fExpenses?.length === 0) {
          setExpensesSumStore(0);
        }
      })()
     
    }

    
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <div>
      <ExpensesFilter
        selected={selectedYear}
        onYearSelected={yearFilterHandler}
        onMonthSelected={monthFilterHandler}
        onDaySelected={dayFilterHandler}
      />
      <Card className="expenses">
        <ExpensesList items={expensesFilteredStore} />
      </Card>
      <ExpensesSum sum={expensesSumStore} />
    </div>
  );
}

export default Expenses;
