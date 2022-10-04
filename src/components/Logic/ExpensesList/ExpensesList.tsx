import React from "react";
import { deleteExpense } from "../../../services/expenseService";
import { Expense } from "../../../types/Expense";

import ExpenseItem from "../ExpenseItem/ExpenseItem";
import "./ExpensesList.css";

function ExpensesList(props: any) {
  function deleteExpenseHandler(id: number) {
    props.onDeleteExpense(id);
  }

  if (props.items.length === 0) {
    return (
      <h2 className="expenses-list__fallback">Aucune dépenses trouvées</h2>
    );
  } else {
    return (
      <ul className="expenses-list">
        {props.items.map((expense: Expense) => (
          <ExpenseItem
            key={expense.id}
            category_id={expense.category_id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            id={expense.id}
            onDeleteExpense={deleteExpenseHandler}
          />
        ))}
      </ul>
    );
  }
}

export default ExpensesList;
