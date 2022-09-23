import { supabase } from "./supabaseClient"
import type { Expense } from '../types/Expense'
import { useState } from "react";

// const [expensesState, setExpensesState] = useState<Expense[] | null>(null);

export async function addExpense(expense: Expense, userId: string | undefined) {

  const { data } = await supabase
    .from('expenses')
    .insert([
      {
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
        user_id: userId
      },
    ]).single();

  // fetchExpenses(undefined);
  // setExpensesState(data);
  return data;
}

export async function fetchExpenses(userId: string | undefined) {
  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("*");
  if (error){
    console.log("error", error);
  } else{
    // setExpensesState(expenses);
    return expenses;
  }
}

export async function deleteTodos(id:number){
  try {

    const { data } = await supabase.from("todos").delete().eq("id", id);
    // setExpensesState(data);

  } catch (error) {
    console.log("error", error);
  }
}

export const addTodo = async (task:string, user:any) => {
    let { data: todo, error } = await supabase
      .from("todos")
      .insert({ task, user_id: user.id })
      .single();

    return todo;
}

export async function setStateExpenses(expenses:Expense[] | null){
  // setExpensesState(expenses);
}

export async function getStateExpenses(){
  // return expensesState;
}

function updateState() {
  throw new Error("Function not implemented.");
}
