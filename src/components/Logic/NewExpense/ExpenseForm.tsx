import { User } from "@supabase/supabase-js";
import React, { SetStateAction, useEffect, useState } from "react";
import { addExpense, fetchCategories } from "../../../services/expenseService";
import { supabase } from "../../../services/supabaseClient";
import { Expense } from "../../../types/Expense";
import { ExpenseCategory } from "../../../types/ExpenseCategory";
import { useAuth } from "../../Auth/Auth";
import useStore from "../../store/store-zustand";
import "./ExpenseForm.css";

function ExpenseForm(props: any) {

  const addExpenseStore = useStore((state) => state.addExpense)

  // Get current user and signOut function from context
  const { user } = useAuth();
  const [categories, setCategories] = useState<ExpenseCategory[] | undefined>(
    undefined
  );

  useEffect(() =>{
    fetchCategories(user?.id).then((categoriesFromDb) => {
      if(categoriesFromDb!.length > 0){
        setCategories(categoriesFromDb);
        setEnteredCategoryId(categoriesFromDb![0].id);
      }
    })
  }, []);

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredCategoryId, setEnteredCategoryId] = useState<number | undefined>(undefined);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredType, setEnteredType] = useState("courante");

  const titleChangeHandler = (event: any) => {
    setEnteredTitle(event.target.value);
  };
  const categoryChangeHandler = (event: any) => {
    const catFound = categories?.find(category => 
      category.name === event.target.value
    );

    setEnteredCategoryId(catFound?.id);
  };
  const amountChangeHandler = (event: any) => {
    setEnteredAmount(event.target.value);
  };
  const dateChangeHandler = (event: any) => {
    setEnteredDate(event.target.value);
  };
  const typeChangeHandler = (event: any) => {
    setEnteredType(event.target.value);
  };

  function submitHandler(event: any) {
    event.preventDefault();

    const expenseData = new Expense(
      enteredTitle,
      enteredCategoryId!,
      new Date(enteredDate).toLocaleDateString("en-US"),
      Number(enteredAmount),
      enteredType
    );

    // utilisation d'un state management nécessaire :
    // actuellement flow data = ExpenseForm -> Navbar -> Dashboard -> ExpenseHome

    //props.onSaveExpenseData(expenseData);
    addExpenseStore(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredType("");

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
              className="p-2 border-dgreen border bg-transparent color-dgreen font-sm"
            />
          </div>
          {categories != undefined && categories.length > 0 && (
            <div className="p-2">
              <label className="color-dgreen">Catégorie</label>
              <select
                name="types"
                id="type-select"
                className="p-2 border-dgreen border bg-transparent color-dgreen font-sm"
                onChange={categoryChangeHandler}
              >
                {categories?.map((category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex flex-row">
          <div className="p-2">
            <label className="color-dgreen">Type</label>
            <select
              name="types"
              id="type-select"
              className="p-2 border-dgreen border bg-transparent color-dgreen font-sm"
              onChange={typeChangeHandler}
              defaultValue={"courante"}
            >
              <option value="courante">Courante</option>
              <option value="fixe">Fixe</option>
              <option value="occasionnelle">Occasionnelle</option>
            </select>
          </div>
          <div className="p-2 w-1/2">
            <label className="color-dgreen">Montant</label>
            <input
              value={enteredAmount}
              type="number"
              min="0.01"
              step="0.01"
              onChange={amountChangeHandler}
              className="p-2 border-dgreen border bg-transparent color-dgreen font-sm"
            />
            €
          </div>

          <div className="p-2">
            <label className="color-dgreen">Date</label>
            <input
              type="Date"
              value={enteredDate}
              min="2019-01-01"
              onChange={dateChangeHandler}
              className="p-2 border-dgreen border bg-transparent color-dgreen font-sm"
            />
          </div>
        </div>
        <div className="p-2">
          <button
            type="submit"
            className="color-dgreen font bg-color-green font-bold focus:ring-4 focus:ring-blue-300
         px-2 py-2 mr-2 mb-2  focus:outline-none"
            style={{ fontSize: "14px" }}
          >
            Ajouter une dépense
          </button>
        </div>
      </div>
    </form>
  );
}

export default ExpenseForm;
