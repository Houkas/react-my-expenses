import { useEffect, useRef, useState } from "react";
import { deleteExpense } from "../../../services/expenseService";
import { Expense } from "../../../types/Expense";
import useStore from "../../store/store-zustand";
import ExpenseDate from "../ExpenseDate/ExpenseDate";
import "./ExpenseItem.css";
import useStoreNotif from "../../store/store-notification";

function ExpenseItem(props: any) {
  const removeExpensesStore = useStore((state) => state.removeExpense);
  const setSelectedExpenseToEdit = useStore((state) => state.setExpenseToEdit);
  const expenseCategories = useStore((state) => state.expenseCategories);
  const setIsExpensesListChanged = useStore(
    (state) => state.setIsExpensesListChanged
  );
  const setNotification = useStoreNotif((state) => state.setNotification);

  const [expenseCatId, setExpenseCatId] = useState(0);
  const [expenseTitle, setTitle] = useState("");
  const [expenseColorCategory, setColorCategory] = useState("");
  const [isInit, setIsInit] = useState(true);
  const expenseAmount: number = props.amount;

  useEffect(() => {
    //init
    setTitle(props.title);
    setExpenseCatId(props.category_id);

    if (
      (expenseCategories?.length !== 0 && expenseCategories !== undefined) ||
      expenseCategories !== undefined
    ) {
      const colorCategory = expenseCategories?.find(
        (category) => category.id === props.category_id
      );
      if (colorCategory != undefined) {
        setColorCategory(colorCategory.color);
      }
    }
  }, [expenseCategories, props]);

  function editHandler() {
    let expense = new Expense(
      props.id,
      expenseTitle,
      expenseCatId,
      props.date,
      expenseAmount,
      props.type
    );
    setSelectedExpenseToEdit(expense);
  }

  function deleteHandler() {
    deleteExpense(props.id);
    removeExpensesStore(props.id);
    setIsExpensesListChanged(true);
    setNotification(
      true,
      "error",
      "🗑️ Dépense : '" + expenseTitle + "' supprimée avec succès."
    );
  }

  return (
    <li className="mb-5">

      <a className="flex flex-row justify-between mb-2 items-center cursor-pointer border border-[#B4C0B2] p-2">
        <div className="w-[30%]">
          <ExpenseDate date={props.date} />
        </div>
        <div
          style={{ backgroundColor: expenseColorCategory }}
          className="w-[8px] h-[8px]"
        ></div>
        <div className="overflow-hidden text-ellipsis m-1 w-[35%] flex flex-row items-center">
          <h2 className="color-dgreen font-medium" style={{ fontSize: "12px" }}>
            {expenseTitle}
          </h2>
        </div>
        <span
          className="color-dgreen font-medium w-[15%]"
          style={{ fontSize: "12px" }}
        >
          {expenseAmount} €
        </span>
      </a>
    </li>
  );
}

export default ExpenseItem;
