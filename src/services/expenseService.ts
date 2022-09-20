import { supabase } from "./supabaseClient"
import type { Expense } from '../types/Expense'

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
  return data;
}

export async function fetchExpenses(userId: string | undefined) {
  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("*")
  if (error) console.log("error", error);
  else return expenses;
}

export async function deleteTodos(id:number){
  try {
    await supabase.from("todos").delete().eq("id", id);
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
