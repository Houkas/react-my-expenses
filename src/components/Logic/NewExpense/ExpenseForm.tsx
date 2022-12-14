import { useEffect, useState } from "react";
import {
  addExpense,
  fetchCategories,
  fetchExpenses,
  updateExpense,
} from "../../../services/expenseService";
import { Expense } from "../../../types/Expense";
import { ExpenseCategory } from "../../../types/ExpenseCategory";
import { useAuth } from "../../Auth/Auth";
import useStoreNotif from "../../store/store-notification";
import useStore from "../../store/store-zustand";
import "./ExpenseForm.css";
import {motion} from 'framer-motion';

function ExpenseForm(props: any) {

  const setNotification = useStoreNotif((state) => state.setNotification);

  const selectedExpenseToEdit = useStore(
    (state) => state.selectedExpenseToEdit
  );

  const expenses = useStore((state) => state.expenses);
  const setExpenses = useStore((state) => state.setExpenses);
  const setIsExpensesListChanged = useStore(
    (state) => state.setIsExpensesListChanged
  );

  const [isExpenseExists, setIsExpenseExisits] = useState(false);

  // Get current user and signOut function from context
  const user = useAuth()?.user;
  const [categories, setCategories] = useState<ExpenseCategory[] | undefined>(
    undefined
  );

  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentDay = String(new Date().getDate());
  const [daySelected, setDaySelected] = useState(
    [currentYear, currentMonth, currentDay].join("-")
  );

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredCategoryId, setEnteredCategoryId] = useState<
    number | undefined
  >(undefined);
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [enteredDate, setEnteredDate] = useState(daySelected);
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
      const selectedExpenseToEditYear = new Date(
        selectedExpenseToEdit.date
      ).getFullYear();
      const selectedExpenseToEditMonth = String(
        new Date(selectedExpenseToEdit.date).getMonth() + 1
      ).padStart(2, "0");
      const selectedExpenseToEditDay = String(
        new Date(selectedExpenseToEdit.date).getDate()
      );
      const editExpenseDate = [
        selectedExpenseToEditYear,
        selectedExpenseToEditMonth,
        selectedExpenseToEditDay,
      ].join("-");

      setEnteredTitle(selectedExpenseToEdit.title);
      setEnteredCategoryId(selectedExpenseToEdit.category_id);
      setEnteredAmount(selectedExpenseToEdit.amount);
      setEnteredDate(editExpenseDate);
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
      setEnteredDate(daySelected);
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
      setEnteredDate(daySelected);
      setEnteredType("");

      addExpense(expenseData, user?.id).then(() => {
        fetchExpenses(user?.id).then((expenses) => {
          setExpenses(expenses);
        });
        setNotification(
          true,
          "success",
          "??? D??pense : '" + expenseData.title + "' ajout??e avec succ??s."
        );
      });
      setIsExpensesListChanged(true);
    }
  }
  const media = window.matchMedia('(max-width: 480px)');
  let dropIn;
  if (media.matches === true) {
    dropIn = {
      hidden:{
        y: '30vh',
        opacity: 0
      },
      visible: {
        y: '0.5vh',
        opacity: 1,
        transition: {
          duration: .1,
          type:'spring',
          damping:30,
          stiffness:400
        }
      },
      exit : {
        y: '50vh',
        opacity: 0,
        transition: {
          duration: .1,
          type:'spring',
          damping:30,
          stiffness:200
        }
      }
    }
  } else {
    dropIn = {
      hidden:{
        y: '30vh',
        opacity: 0
      },
      visible: {
        y: '0.5vh',
        opacity: 1,
        transition: {
          duration: .1,
          type:'spring',
          damping:30,
          stiffness:400
        }
      },
      exit : {
        y: '50vh',
        opacity: 0,
        transition: {
          duration: .1,
          type:'spring',
          damping:30,
          stiffness:200
        }
      }
    }
  }

  return (
    <motion.form 
      onSubmit={submitHandler}
      className="flex justify-center fixed bottom-[60px] form-expense"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
     >
      <div className="bg-color-lgrey  p-2 z-[2] border border-[#1C221C]">
      <h2 className="p-2 color-dgreen">Ajouter une d??pense : </h2>
        <div className="flex flex-row flex-start">
          <div className="p-2 w-full">
            <label className="color-dgreen">Titre</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
              className="p-2 border-dgreen border bg-transparent color-dgreen font-sm h-[38px]"
            />
          </div>

          <div className="p-2 w-full">
            <label className="color-dgreen">Cat??gorie</label>
            {categories != undefined && categories.length > 0 && (
              <select
                name="types"
                id="type-select"
                value={enteredCategoryId}
                className="p-2 border-dgreen border bg-transparent color-dgreen font-sm w-full h-[38px]"
                onChange={categoryChangeHandler}
              >
                {categories?.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    id={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="p-2">
            <label className="color-dgreen">Type</label>
            <select
              name="types"
              id="type-select"
              value={enteredType}
              className="p-2 border-dgreen border bg-transparent color-dgreen font-sm h-[38px]"
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
              className="p-2 border-dgreen border bg-transparent color-dgreen font-sm h-[38px]"
            />
            ???
          </div>

          <div className="p-2">
            <label className="color-dgreen">Date</label>
            <input
              type="Date"
              value={enteredDate}
              min="2019-01-01"
              onChange={dateChangeHandler}
              className="p-2 border-dgreen border bg-transparent color-dgreen font-sm h-[38px]"
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
              Ajouter une d??pense
            </button>
          )}
          {props.isExpenseToEdit === true && (
            <button
              type="submit"
              className="color-dgreen font bg-color-green font-bold focus:ring-4 focus:ring-blue-300
        px-2 py-2 mr-2 mb-2  focus:outline-none"
              style={{ fontSize: "14px" }}
            >
              Modifier la d??pense
            </button>
          )}
        </div>
      </div>
    </motion.form>
  );
}

export default ExpenseForm;
