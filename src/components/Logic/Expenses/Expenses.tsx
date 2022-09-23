import "./Expenses.css";
import Card from "../../UI/Card/Card";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import { useState } from "react";
import ExpensesList from "../ExpensesList/ExpensesList";
import ExpensesChart from "../ExpensesChart/ExpensesChart";

function Expenses(props: any) {
  const [selectedYear, setYear] = useState("");

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
  }

  return (
    <div>
      <ExpensesFilter
        selected={selectedYear}
        onYearSelected={yearFilterHandler}
      />
      <Card className="expenses">
        <ExpensesList items={fExpenses} />
      </Card>
    </div>
  );
}

export default Expenses;
