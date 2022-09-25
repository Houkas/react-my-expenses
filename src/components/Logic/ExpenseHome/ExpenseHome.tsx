import { useEffect, useState } from "react";
import { atom, selector, useRecoilState } from "recoil";
import { fetchExpenses } from "../../../services/expenseService";
import { Expense } from "../../../types/Expense";
import { useAuth } from "../../Auth/Auth";
import Expenses from "../Expenses/Expenses";

function ExpenseHome(props:any){

    function deleteExpenseHandler(id:number){
      props.onDeleteExpense(id);
    }

    return (
      <div className="py-20 px-5">
        {props.expenses !== undefined && <Expenses expenses={props.expenses} onDeleteExpense={deleteExpenseHandler}/>}
      </div>
    );
}

export default ExpenseHome;