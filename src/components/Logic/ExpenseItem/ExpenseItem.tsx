import { useEffect, useRef, useState } from "react";
import {
  deleteExpense,
  fetchCategories,
} from "../../../services/expenseService";
import { ExpenseCategory } from "../../../types/ExpenseCategory";
import { useAuth } from "../../Auth/Auth";
import useStore from "../../store/store-zustand";
import ExpenseDate from "../ExpenseDate/ExpenseDate";
import "./ExpenseItem.css";

function ExpenseItem(props: any) {
  const removeExpensesStore = useStore((state) => state.removeExpense);

  const { user } = useAuth();
  const [categories, setCategories] = useState<ExpenseCategory[] | undefined>(
    undefined
  );

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
      (categories?.length === 0 && isInit === true) ||
      (categories === undefined && isInit === true)
    )
      fetchCategories(user?.id).then((categories) => {
        setCategories(categories);
        setIsInit(false);
      });

    if (
      (categories?.length !== 0 && categories !== undefined) ||
      categories !== undefined
    ) {
      const colorCategory = categories?.find(
        (category) => category.id === expenseCatId
      );
      if (colorCategory != undefined) {
        setColorCategory(colorCategory.color);
      }
    }
  }, [categories, props]);

  function editHandler() {
    setTitle("test");
  }

  function deleteHandler() {
    deleteExpense(props.id);
    removeExpensesStore(props.id);
  }

  return (
    <li className="mb-5">
      <div
        className="flex flex-row justify-between mb-2 items-center border-l-[5px] pl-2"
        style={{ borderColor: expenseColorCategory }}
      >
        <div className="w-[30%]">
          <ExpenseDate date={props.date} />
        </div>

        <div className="whitespace-nowrap overflow-hidden text-ellipsis m-1 w-[40%]">
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

        <div className="flex flex-row w-[10%] justify-center items-center">
          {/* <button className="bg-color-dgreen m-1 w-[25px] h-[25px] flex flex-row justify-center items-center" onClick={editHandler}>
            <img src="./edit_green.svg" />
          </button>*/}

          <button
            className="bg-color-dgreen m-1 w-[25px] h-[25px] flex flex-row justify-center items-center"
            onClick={deleteHandler}
          >
            <img src="./delete_red.svg" />
          </button>
        </div>
      </div>
      <hr className="w-full separator" />
    </li>
  );
}

export default ExpenseItem;
