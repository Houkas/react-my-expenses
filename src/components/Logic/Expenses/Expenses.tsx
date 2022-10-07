import "./Expenses.css";
import Card from "../../UI/Card/Card";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import { useContext, useEffect, useState } from "react";
import ExpensesList from "../ExpensesList/ExpensesList";
import ExpensesSum from "../ExpensesSum/ExpensesSum";
import { Expense } from "../../../types/Expense";

import useStore from "../../store/store-zustand";

function Expenses(props: any) {

  const expensesStore = useStore((state) => state.expenses);
  const setExpensesSumStore = useStore((state) => state.setExpensesSum);
  const expensesSumStore = useStore((state) => state.expensesSum);

  const [selectedYear, setYear] = useState("");
  const [isInit, setIsInit] = useState(true);
  let fExpenses: Expense[] | undefined;

  if (selectedYear.toString() !== "") {
    fExpenses = expensesStore!.filter((expense: any) => {
      return new Date(expense.date).getFullYear().toString() === selectedYear;
    });
  } else {
    fExpenses = expensesStore;
  }

  function yearFilterHandler(yearSelected: any) {
    setYear(yearSelected);
    setIsInit(false);
  }

  useEffect(() => {
    // init
    if(fExpenses!.length > 0 && expensesSumStore === 0){
      let sum = 0;
      fExpenses!.forEach((element: Expense) => {
        sum = sum + element.amount
      });
      setExpensesSumStore(sum)
      setIsInit(false);
    }
    // update
    if(fExpenses!.length > 0 && expensesSumStore !== 0 && isInit=== false){
      let sum = 0;
      fExpenses!.forEach((element: Expense) => {
        sum = sum + element.amount
      });
      setExpensesSumStore(sum);
    }
    if(fExpenses!.length === 0){
      setExpensesSumStore(0);
    }
  }, [fExpenses]);

  return (
    <div>
      <ExpensesFilter
        selected={selectedYear}
        onYearSelected={yearFilterHandler}
      />
      <Card className="expenses">
        <ExpensesList items={fExpenses}/>
      </Card>
      <ExpensesSum sum={expensesSumStore}/> 
    </div>
  );
}

export default Expenses;
