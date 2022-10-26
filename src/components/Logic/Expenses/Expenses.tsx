import "./Expenses.css";
import Card from "../../UI/Card/Card";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import { useContext, useEffect, useState } from "react";
import ExpensesList from "../ExpensesList/ExpensesList";
import ExpensesSum from "../ExpensesSum/ExpensesSum";
import { Expense } from "../../../types/Expense";

import useStore from "../../store/store-zustand";
import { fetchCategories } from "../../../services/expenseService";
import { useAuth } from "../../Auth/Auth";

function Expenses() {

  const { user } = useAuth();

  const expensesStore = useStore((state) => state.expenses);
  const expensesFilteredStore = useStore((state) => state.expensesFiltered);
  const setExpensesSumStore = useStore((state) => state.setExpensesSum);
  const setExpensesFilteredStore = useStore((state) => state.setExpensesFiltered);
  const expensesSumStore = useStore((state) => state.expensesSum);

  const expensesCategories= useStore((state) => state.expenseCategories);
  const setExpensesCategories = useStore((state) => state.setExpenseCategories);

  const [selectedYear, setYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setMonth] = useState(
    [selectedYear, String(new Date().getMonth() + 1).padStart(2, "0")].join('-')
    );
  const [selectedDay, setDay] = useState(String(new Date().getDay() + 1).padStart(2, "0"));
  const [isInit, setIsInit] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');

  function yearFilterHandler(yearSelected: string) {
    setYear(yearSelected);
    setIsInit(false);
    setTypeFilter('year');
  }

  function monthFilterHandler(monthSelected: string) {
    setMonth(monthSelected);
    setIsInit(false);
    setTypeFilter('month');
  }

  function dayFilterHandler(daySelected: string) {
    setDay(daySelected);
    setIsInit(false);
    setTypeFilter('day');
  }

  useEffect(() => {
    // init
    if (
      (expensesCategories?.length === 0 && isInit === true) ||
      (expensesCategories === undefined && isInit === true)
    ){
      fetchCategories(user?.id).then((categories) => {
        setExpensesCategories(categories);
        setIsInit(false);
      });
    }
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
    if (expensesFilteredStore !== undefined && isInit === false && typeFilter === "year") {
      (async () => {
        let fExpenses;
        fExpenses = expensesStore!.filter((expense: Expense) => {
          const expenseDate = (new Date(expense.date).getFullYear()).toString();
          return expenseDate === selectedYear;
        });
        fExpenses.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
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

    //by month
    if (expensesFilteredStore !== undefined && isInit === false && typeFilter === "month") {
      (async () => {
        let fExpenses;
        debugger;
        fExpenses = expensesStore!.filter((expense: Expense) => {
          const expenseMonth = (String(new Date(expense.date).getMonth() + 1).padStart(2, "0"));
          const expenseYear = new Date().getFullYear().toString();
          const expenseYearMonth =  [expenseYear, expenseMonth].join("-")
          return expenseYearMonth === selectedMonth;
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

    //by day
    if (expensesFilteredStore !== undefined && isInit === false && typeFilter === "day") {
      (async () => {
        let fExpenses;
        fExpenses = expensesStore!.filter((expense: Expense) => {
          const expenseDay= (String(new Date(expense.date).getDate()).padStart(2, "0"));
          const expenseMonth= (String(new Date(expense.date).getMonth() + 1).padStart(2, "0"));
          const expenseYear = new Date(expense.date).getFullYear().toString();
          const expenseYearMonthDay =  [expenseYear, expenseMonth, expenseDay].join("-")
          return expenseYearMonthDay === selectedDay;
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

    
  }, [selectedYear, selectedMonth, selectedDay, typeFilter, expensesStore]);

  return (
    <div>
      <ExpensesFilter
        selected={selectedYear}
        onYearSelected={yearFilterHandler}
        onMonthSelected={monthFilterHandler}
        onDaySelected={dayFilterHandler}
      />
      <Card className="expenses">
        <ExpensesList />
      </Card>
      <ExpensesSum sum={expensesSumStore} />
    </div>
  );
}

export default Expenses;
