import { useEffect, useState } from "react";
import { fetchExpenses } from "../../../services/expenseService";
import { Expense } from "../../../types/Expense";
import { useAuth } from "../../Auth/Auth";
import Expenses from "../Expenses/Expenses";
import Notification from "../../UI/Notification/Notification";
import useStoreNotif from "../../store/store-notification";

function ExpenseHome(props: any) {
  const isNotificationDisplayed = useStoreNotif((state)=> state.isDisplayed)
  return (
    <>
      <div className="py-20 px-5">
        {isNotificationDisplayed === true && <Notification></Notification>}
        {props.expenses !== undefined && <Expenses />}
      </div>
    </>
  );
}

export default ExpenseHome;
