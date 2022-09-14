import React, { useState } from 'react';
import './NewExpense.css'
import './ExpenseForm';
import ExpenseForm from './ExpenseForm';

function NewExpense(props:any) {

    function saveExpenseDataHandler(enteredExpenseData:any){
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        }
        props.onAddExpense(expenseData);
        hideExpenseForm();
    }

    let [isFormVisible, setIsFormVisible] = useState(false);
    function displayExpenseForm(){
        setIsFormVisible(true)
    }

    function hideExpenseForm(){
        setIsFormVisible(false);
    }

    return(
        <div className='new-expense'>
            {isFormVisible === false && <button onClick={displayExpenseForm}>Ajouter une dépense</button>}
            {isFormVisible === true && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onHideExpenseForm={hideExpenseForm}/>}
        </div>
    );
}

export default NewExpense;