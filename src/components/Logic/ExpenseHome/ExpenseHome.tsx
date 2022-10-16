import { useEffect, useState } from "react";
import { fetchExpenses } from "../../../services/expenseService";
import { Expense } from "../../../types/Expense";
import { useAuth } from "../../Auth/Auth";
import Expenses from "../Expenses/Expenses";

function ExpenseHome(props:any){

    return (
      <div className="py-20 px-5">
        {props.expenses !== undefined && <Expenses/>}
      </div>
    );
}

export default ExpenseHome;