import "./Expenses.css";
import Card from "../../UI/Card/Card";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import { useEffect, useState } from "react";
import ExpensesList from "../ExpensesList/ExpensesList";
import ExpensesSum from "../ExpensesSum/ExpensesSum";
import { Expense } from "../../../types/Expense";

function Expenses(props: any) {
  const [selectedYear, setYear] = useState("");
  const [expensesSum, setExpensesSum] = useState(0);
  const [isInit, setIsInit] = useState(true);
  const [sumByAction, setSumByAction] = useState(props.action.toString());
  let fExpenses: any;

  if (selectedYear.toString() !== "") {
    fExpenses = props.expenses.filter((expense: any) => {
      return new Date(expense.date).getFullYear().toString() === selectedYear;
    });
  } else {
    fExpenses = props.expenses;
  }

  function yearFilterHandler(yearSelected: any) {
    setYear(yearSelected);
    setIsInit(false);
  }

  function deleteExpenseHandler(id:number){
    props.onDeleteExpense(id);
    setIsInit(false);
    setSumByAction("onDelete");
  }

  useEffect(() => {
    // init
    if(fExpenses.length > 0 && expensesSum === 0){
      fExpenses.forEach((element: Expense) => {
        setExpensesSum((prevState) =>{
          return element.amount + prevState
        });
      });
      setIsInit(true);
    }
    debugger;
    // update
    if(fExpenses.length > 0 && expensesSum !== 0 && isInit=== false && sumByAction === "onAdd"){
      fExpenses.forEach((element: Expense) => {
        setExpensesSum((prevState) =>{
          return element.amount + prevState
        });
        setSumByAction("");
      });
    }
    if(fExpenses.length > 0 && expensesSum !== 0 && isInit=== false && sumByAction === "onDelete"){
      fExpenses.forEach((element: Expense) => {
        setExpensesSum((prevState) =>{
          return element.amount - prevState
        });
        setSumByAction("");
      });
    }
    if(fExpenses.length === 0){
      setExpensesSum(0)
    }
  }, [fExpenses, sumByAction, props.action]);

  return (
    <div>
      <ExpensesFilter
        selected={selectedYear}
        onYearSelected={yearFilterHandler}
      />
      <Card className="expenses">
        <ExpensesList items={fExpenses} onDeleteExpense={deleteExpenseHandler}/>
      </Card>
      <ExpensesSum sum={expensesSum}/> 
    </div>
  );
}

export default Expenses;
