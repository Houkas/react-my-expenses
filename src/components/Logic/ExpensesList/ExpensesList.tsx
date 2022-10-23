import React, { useEffect, useState } from "react";
import { deleteExpense } from "../../../services/expenseService";
import { Expense } from "../../../types/Expense";
import useStore from "../../store/store-zustand";

import ExpenseItem from "../ExpenseItem/ExpenseItem";
import "./ExpensesList.css";

function ExpensesList() {
  const expensesStore = useStore((state) => state.expenses);

  if (expensesStore === undefined || expensesStore?.length === 0) {
    return (
      <h2 className="expenses-list__fallback">Aucune dépenses trouvées</h2>
    );
  } else {
    return (
      <ul className="expenses-list">
        {expensesStore?.map((expense: Expense) => (
          <ExpenseItem
            key={expense.id}
            category_id={expense.category_id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            id={expense.id}
            type={expense.type}
          />
        ))}
      </ul>
    );
  }
}

export default ExpensesList;
