import React, { SetStateAction, useEffect, useState } from "react";
import {
  addExpense,
  fetchCategories,
  fetchExpenses,
  updateExpense,
} from "../../../services/expenseService";
import { Expense } from "../../../types/Expense";
import { ExpenseCategory } from "../../../types/ExpenseCategory";
import { useAuth } from "../../Auth/Auth";
import useStore from "../../store/store-zustand";
import "./ExpenseForm.css";

function ExpenseForm(props: any) {
  const addExpenseStore = useStore((state) => state.addExpense);
  const selectedExpenseToEdit = useStore(
    (state) => state.selectedExpenseToEdit
  );
  const expenses = useStore((state) => state.expenses);
  const setExpenses = useStore((state) => state.setExpenses);
  const setIsExpensesListChanged = useStore((state) => state.setIsExpensesListChanged);

  const [isExpenseExists, setIsExpenseExisits] = useState(false);

  // Get current user and signOut function from context
  const user = useAuth()?.user;
  const [categories, setCategories] = useState<ExpenseCategory[] | undefined>(
    undefined
  );

  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentDay = String(new Date().getDay() + 1).padStart(2, "0");
  const [daySelected, setDaySelected] = useState(
    [currentYear, currentMonth, currentDay].join("-")
  );

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredCategoryId, setEnteredCategoryId] = useState<
    number | undefined
  >(undefined);
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredType, setEnteredType] = useState("courante");

  useEffect(() => {
    fetchCategories(user?.id).then((categoriesFromDb) => {
      if (categoriesFromDb!.length > 0) {
        setCategories(categoriesFromDb);
        if (!selectedExpenseToEdit || selectedExpenseToEdit === undefined) {
          setEnteredCategoryId(categoriesFromDb![0].id);
        }
      }
    });

    if (selectedExpenseToEdit !== undefined) {
      setEnteredTitle(selectedExpenseToEdit.title);
      setEnteredCategoryId(selectedExpenseToEdit.category_id);
      setEnteredAmount(selectedExpenseToEdit.amount);
      setEnteredDate(selectedExpenseToEdit.date);
      setEnteredType(selectedExpenseToEdit.type);
      setIsExpenseExisits(true);
    }
  }, [selectedExpenseToEdit]);

  const titleChangeHandler = (event: any) => {
    setEnteredTitle(event.target.value);
  };
  const categoryChangeHandler = (event: any) => {
    const catFound = categories?.find(
      (category) => category.id === parseInt(event.target.value)
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

  function updateExpenseById(expenseEdited: Expense): Expense[] | undefined {
    const expensesUpdated = expenses?.map((expense) => {
      if (expense.id === expenseEdited?.id) {
        expense = expenseEdited;
      }
      return expense;
    });
    return expensesUpdated;
  }

  function submitHandler(event: any) {
    /* TO DO 
      gérer les enregistrements de montant de type float -> changement de la colonne en base ?
    */
    event.preventDefault();
    if (props.isExpenseToEdit === true) {
      const expenseData = new Expense(
        selectedExpenseToEdit!.id,
        enteredTitle,
        enteredCategoryId!,
        new Date(enteredDate).toLocaleDateString("en-US"),
        Number(enteredAmount),
        enteredType
      );

      updateExpense(expenseData, user?.id);
      const updatedExpenses = updateExpenseById(expenseData);
      setExpenses(updatedExpenses);

      setEnteredTitle("");
      setEnteredAmount(0);
      setEnteredDate("");
      setEnteredType("");
    } else {
      const expenseData = new Expense(
        null,
        enteredTitle,
        enteredCategoryId!,
        new Date(enteredDate).toLocaleDateString("en-US"),
        Number(enteredAmount),
        enteredType
      );

      //addExpenseStore(expenseData);

      setEnteredTitle("");
      setEnteredAmount(0);
      setEnteredDate("");
      setEnteredType("");

      addExpense(expenseData, user?.id);
      fetchExpenses(user?.id).then((expenses) =>{
        setExpenses(expenses);
      });
      setIsExpensesListChanged(true);
    }
  }

  return (
    <form onSubmit={submitHandler} className="flex justify-center">
      <div className="bg-color-lgrey absolute bottom-[60px] p-2 z-[2]">
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
                value={enteredCategoryId}
                className="p-2 border-dgreen border bg-transparent color-dgreen font-sm"
                onChange={categoryChangeHandler}
              >
                {categories?.map((category) => (
                  <option key={category.id} value={category.id} id={category.name}>
                    {category.name}
                  </option>
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
              value={enteredType}
              className="p-2 border-dgreen border bg-transparent color-dgreen font-sm"
              onChange={typeChangeHandler}
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
          {props.isExpenseToEdit === false && (
            <button
              type="submit"
              className="color-dgreen font bg-color-green font-bold focus:ring-4 focus:ring-blue-300
        px-2 py-2 mr-2 mb-2  focus:outline-none"
              style={{ fontSize: "14px" }}
            >
              Ajouter une dépense
            </button>
          )}
          {props.isExpenseToEdit === true && (
            <button
              type="submit"
              className="color-dgreen font bg-color-green font-bold focus:ring-4 focus:ring-blue-300
        px-2 py-2 mr-2 mb-2  focus:outline-none"
              style={{ fontSize: "14px" }}
            >
              Modifier la dépense
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default ExpenseForm;
