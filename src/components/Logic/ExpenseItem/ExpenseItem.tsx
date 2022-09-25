import { useState } from "react";
import { deleteExpense } from "../../../services/expenseService";
import ExpenseDate from "../ExpenseDate/ExpenseDate";
import "./ExpenseItem.css";

function ExpenseItem(props: any) {
  const [expenseTitle, seTitle] = useState(props.title);
  const expenseAmount: number = props.amount;

  function editHandler() {
    seTitle("test");
  };

  function deleteHandler() {
    props.onDeleteExpense(props.id);
  };

  return (
    <li className="mb-5">
      <div className="flex flex-row justify-between mb-2 items-center">
        <ExpenseDate date={props.date} />
        <div className="whitespace-nowrap overflow-hidden text-ellipsis m-1">
          <h2 className="color-dgreen">{expenseTitle}</h2>
        </div>
        <div className="color-dgreen">{expenseAmount} €</div>

        <div className="flex flex-col">
          <button className="bg-color-dgreen m-1 w-[25px] h-[25px] flex flex-row justify-center items-center" onClick={editHandler}>
            <img src="./edit_green.svg" />
          </button>
          <button className="bg-color-dgreen m-1 w-[25px] h-[25px] flex flex-row justify-center items-center" onClick={deleteHandler}>
            <img src="./delete_red.svg" />
          </button>
        </div>
        
      </div>
      <hr className="w-full separator" />
    </li>
  );
}

export default ExpenseItem;
