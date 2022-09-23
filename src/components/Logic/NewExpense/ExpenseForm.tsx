import { User } from "@supabase/supabase-js";
import React, { SetStateAction, useEffect, useState } from "react";
import { addExpense } from "../../../services/expenseService";
import { supabase } from "../../../services/supabaseClient";
import { Expense } from "../../../types/Expense";
import { useAuth } from "../../Auth/Auth";
import "./ExpenseForm.css";
function ExpenseForm(props: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event: any) => {
    setEnteredTitle(event.target.value);
  };
  const categoryChangeHandler = (event: any) => {
    setEnteredCategory(event.target.value);
  };
  const amountChangeHandler = (event: any) => {
    setEnteredAmount(event.target.value);
  };
  const dateChangeHandler = (event: any) => {
    setEnteredDate(event.target.value);
  };

  function submitHandler(event: any) {
    event.preventDefault();

    const expenseData = new Expense(
      enteredTitle,
      enteredCategory,
      new Date(enteredDate).toLocaleDateString("en-US"),
      Number(enteredAmount)
    );

    // utilisation d'un state management nécessaire :
    // actuellement flow data = ExpenseForm -> Navbar -> Dashboard -> ExpenseHome
    props.onSaveExpenseData(expenseData);

    setEnteredTitle("");
    setEnteredCategory("");
    setEnteredAmount("");
    setEnteredDate("");

    addExpense(expenseData, user?.id);
  }

  return (
    <form onSubmit={submitHandler} className="flex justify-center">
      <div className="bg-color-lgrey absolute bottom-[60px] p-2">
        <div className="flex flex-row">
          <div className="p-2">
            <label className="color-dgreen">Titre</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
              className="p-2 border-dgreen border bg-transparent color-dgreen"
            />
          </div>
          <div className="p-2">
            <label className="color-dgreen">Catégorie</label>
            <input
              type="text"
              value={enteredCategory}
              onChange={categoryChangeHandler}
              className="p-2 border-dgreen border bg-transparent color-dgreen"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="p-2 w-1/2">
            <label className="color-dgreen">Montant</label>
            <input
              value={enteredAmount}
              type="number"
              min="0.01"
              step="0.01"
              onChange={amountChangeHandler}
              className="p-2 border-dgreen border bg-transparent color-dgreen"
            />
            €
          </div>
          <div className="p-2">
            <label className="color-dgreen">Date</label>
            <input
              type="Date"
              value={enteredDate}
              min="2019-01-01"
              max="2022-08-28"
              onChange={dateChangeHandler}
              className="p-2 border-dgreen border bg-transparent color-dgreen"
            />
          </div>
        </div>
        <div className="p-2">
          <button type="submit"
           className="color-dgreen font bg-color-green font-bold focus:ring-4 focus:ring-blue-300
         px-2 py-2 mr-2 mb-2  focus:outline-none" style={{fontSize: '14px'}}>Ajouter une dépense</button>
        </div>
      </div>
    </form>
  );
}

export default ExpenseForm;
