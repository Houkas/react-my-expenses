import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchExpenses } from "../../services/expenseService";
import { supabase } from "../../services/supabaseClient";
import { Expense } from "../../types/Expense";
import ExpenseHome from "../Logic/ExpenseHome/ExpenseHome";

import Header from "../UI/Header/Header";
import Menu from "../UI/Menu/Menu";
import Navbar from "../UI/Navbar/Navbar";

import { useAuth } from "./Auth";

export function Dashboard() {

  // Get current user and signOut function from context
  const { user } = useAuth();
  const [expensesFromDb, setExpensesFromDb] = useState<any[] | undefined>([]);

  useEffect(() =>{
    fetchExpenses(user?.id).then(expenses => {
      setExpensesFromDb(expenses)
      // your response is an array, extract the first value
    })
    .catch(console.error)
  }, []);

  function addExpenseHandler(expense:Expense){
    setExpensesFromDb((prevExpenses) => {
      return [expense, ...(prevExpenses ?? [])];
    });
  }

  function deleteExpenseHandler(id:number){
    setExpensesFromDb(expensesFromDb?.filter((expense) => {
      return expense.id !== id
    }));
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
      <ExpenseHome expenses={expensesFromDb} onDeleteExpense={deleteExpenseHandler}/>
      <Navbar onSaveExpenseData={addExpenseHandler}/>
    </div>
  );
}
