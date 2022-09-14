import React from "react";

import ExpenseItem from "../ExpenseItem/ExpenseItem";
import './ExpensesList.css';

function ExpensesList(props:any){

    if(props.items.length === 0){
        return (
            <h2 className="expenses-list__fallback">Aucune dépenses trouvées</h2>
        );

    }

    return(
        <ul className="expenses-list">
            {
                props.items.map((expense:any) => (

                    <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} date={expense.date}  />           
        
                )) 
            }
        </ul>
    );
}

export default ExpensesList;