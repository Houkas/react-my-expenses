import "./Expenses.css";
import Card from "../../UI/Card/Card";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import { useContext, useEffect, useState } from "react";
import ExpensesList from "../ExpensesList/ExpensesList";
import ExpensesSum from "../ExpensesSum/ExpensesSum";
import { Expense } from "../../../types/Expense";
import { ExpensesContext, deleteExpenseHandler } from "../../Auth/Dashboard";
function Expenses(props: any) {

  const [selectedYear, setYear] = useState("");
  const [expensesSum, setExpensesSum] = useState(0);
  const [isInit, setIsInit] = useState(true);
  let fExpenses: any;
  const expensesContext = useContext(ExpensesContext);

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

    console.log(expensesContext);
    debugger;
    props.onDeleteExpense(id);
    setIsInit(false);
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
    // update
    if(fExpenses.length > 0 && expensesSum !== 0 && isInit=== false){
      fExpenses.forEach((element: Expense) => {
        setExpensesSum((prevState) =>{
          return element.amount + prevState
        });
      });
    }
    /*if(fExpenses.length > 0 && expensesSum !== 0 && isInit=== false){
      fExpenses.forEach((element: Expense) => {
        setExpensesSum((prevState) =>{
          return element.amount - prevState
        });
      });
    }*/
    if(fExpenses.length === 0){
      setExpensesSum(0)
    }
  }, [fExpenses]);

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
