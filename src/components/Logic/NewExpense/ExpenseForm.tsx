import { User } from "@supabase/supabase-js";
import React, { SetStateAction, useEffect, useState } from "react";
import { addExpense } from "../../../services/expenseService";
import { supabase } from "../../../services/supabaseClient";
import { Expense } from "../../../types/Expense";
import { useAuth } from "../../Auth/Auth";
import './ExpenseForm.css';
function ExpenseForm(props:any){

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                setUser(currentUser ?? null);
            }
        );
        console.log(user);

        return () => {
            authListener?.unsubscribe();
        };
        
    }, [user]);

    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    const titleChangeHandler = (event: any) => {
        setEnteredTitle(event.target.value);
    }
    const amountChangeHandler = (event: any) => {
        setEnteredAmount(event.target.value);
    }
    const dateChangeHandler = (event: any) => {
        setEnteredDate(event.target.value);
    }

    function submitHandler(event:any){

        event.preventDefault();

        //const expenseData = {
        //    title: enteredTitle,
        //    amount: +enteredAmount,
        //    date: new Date(enteredDate)
        //}

        const expenseData = new Expense(enteredTitle, new Date(enteredDate).toLocaleDateString('en-US'), Number(enteredAmount))
        
        props.onSaveExpenseData(expenseData);

        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');

        addExpense(expenseData, user?.id)
    }

    return(
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type='text'value={enteredTitle} onChange={titleChangeHandler}/>
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input value={enteredAmount} type='number' min="0.01" step='0.01' onChange={amountChangeHandler}/>
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type='Date' value={enteredDate} min="2019-01-01" max="2022-08-28" onChange={dateChangeHandler}/>
                </div>
            </div>
            <div className="new-expense__actions">
                <button onClick={props.onHideExpenseForm}>Annuler</button>
                <button type="submit">Ajouter une dépense</button>
            </div>
        </form>
    );
}

export default ExpenseForm;