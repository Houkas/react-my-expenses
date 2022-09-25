import React from "react";
import { deleteExpense } from "../../../services/expenseService";

import ExpenseItem from "../ExpenseItem/ExpenseItem";
import './ExpensesList.css';

function ExpensesList(props:any){

    function deleteExpenseHandler(id: number){
        props.onDeleteExpense(id);
    }

    if(props.items.length === 0){
        return (
            <h2 className="expenses-list__fallback">Aucune dépenses trouvées</h2>
        );

    } else{
        return(
            <ul className="expenses-list">
                {
                    props.items.map((expense:any) => (
                        <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date} id={expense.id} onDeleteExpense={deleteExpenseHandler}/>           
                    )) 
                }
            </ul>
        );
    }

    
}

export default ExpensesList;