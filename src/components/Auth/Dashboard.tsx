import { User } from "@supabase/supabase-js";
import React, { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchExpenses } from "../../services/expenseService";
import { supabase } from "../../services/supabaseClient";
import { Expense } from "../../types/Expense";
import ExpenseHome from "../Logic/ExpenseHome/ExpenseHome";

import Header from "../UI/Header/Header";
import Menu from "../UI/Menu/Menu";
import Navbar from "../UI/Navbar/Navbar";
import { useAuth } from "./Auth";

export interface ExpensesContext {
  expenses: Expense[] | undefined,
  setCurrentExpenses: (currentExpenses: Expense[] | undefined) => void;
}

export const ExpensesDefaultValue = {
  expenses: [],
  setCurrentExpenses: () => {}
}

export const ExpensesContext = createContext<ExpensesContext>(ExpensesDefaultValue);

export function Dashboard() {
  // Get current user and signOut function from context
  const { user } = useAuth();
  const [expensesFromDb, setExpensesFromDb] = useState<Expense[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const expenses = await fetchExpenses(user?.id);
      setExpensesFromDb(expenses);
    })()
  }, []);

  function addExpenseHandler(expense: Expense) {
    setExpensesFromDb((prevExpenses) => {
      return [expense, ...(prevExpenses ?? [])];
    });
  }

  function deleteExpenseHandler(id: number) {
    setExpensesFromDb(
      expensesFromDb?.filter((expense) => {
        return expense.id !== id;
      })
    );
  }

  const [isMenuVisivle, setIsMenuVisible] = useState(false);

  function handleOnOpeningMenu(isOpened: any) {
    if (isOpened) {
      setIsMenuVisible((isOpened) => !isOpened);
    }
  }

  return (
    <div>
      <Header onOpeningMenu={handleOnOpeningMenu} />
      {isMenuVisivle === true && <Menu />}
      <ExpensesContext.Provider value={{expensesFromDb, deleteExpenseHandler}}>
        <ExpenseHome
          expenses={expensesFromDb}
          onDeleteExpense={deleteExpenseHandler}
        />
      </ExpensesContext.Provider>

      <Navbar onSaveExpenseData={addExpenseHandler} />
    </div>
  );
}
