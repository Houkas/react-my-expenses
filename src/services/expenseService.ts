import { supabase } from "./supabaseClient"
import type { Expense } from '../types/Expense'

import { ExpenseCategory } from "../types/ExpenseCategory";



export async function addExpense(expense: Expense, userId: string | undefined) {

  const { data } = await supabase
    .from('expenses')
    .insert([
      {
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
        user_id: userId,
        category_id: expense.category_id,
        type: expense.type
      },
    ]).single();

  return data;
}

export async function updateExpense(expense: Expense | undefined,  userId: string | undefined) {
  const { data } = await supabase
    .from('expenses')
    .update({
      title: expense?.title,
      amount: expense?.amount,
      date: expense?.date,
      category_id: expense?.category_id,
      type: expense?.type
    })
    .eq('id', expense?.id)

  return data;
}

export async function fetchExpenses(userId: string | undefined): Promise<Expense[] | undefined> {
  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("*")
    .order('date', {ascending: true});
  if (error){
    console.log("error", error);
  } else{
    return expenses;
  }
}

export async function deleteExpense(id:number){
  try {
    if(id !== null) {
      await supabase.from("expenses").delete().eq("id", id);
    } else{
      console.log("Id de la dépense non définie");
    }
    

  } catch (error) {
    console.log("error", error);
  }
}

export async function addExpenseCategory(expenseCategory: ExpenseCategory, userId: string | undefined) {

  const { data } = await supabase
    .from('categories')
    .insert([
      {
        name: expenseCategory.name,
        color: expenseCategory.color,
        user_id: userId
      },
    ]).single();

  return data;
}

export async function fetchCategories(userId: string | undefined): Promise<ExpenseCategory[] | undefined> {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  if (error){
    console.log("error", error);
  } else{
    return categories;
  }
}

export async function deleteCategory(id:number){
  try {

    await supabase.from("categories").delete().eq("id", id);

  } catch (error) {
    console.log("error", error);
  }
}


export async function fetchProfile(userId: string | undefined): Promise<any> {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq('id', userId);
  if (error){
    console.log("error", error);
  } else{
    return profile[0];
  }
}


export async function fetchSalary(userId: string | undefined): Promise<number | undefined> {
  const { data: salary, error } = await supabase
    .from("profiles")
    .select("salary")
    .eq('id', userId);
  if (error){
    console.log("error", error);
  } else{
    return salary[0].salary;
  }
}

export async function addSalary(salary: number, userId: string | undefined) {
  const { data } = await supabase
    .from('profiles')
    .insert([
      {
        id: userId,
        salary: salary
      },
    ]).single();

  return data;
}

export async function updateSalary(salary: number | null,  userId: string | undefined) {
  debugger;
  const { data } = await supabase
    .from('profiles')
    .update({
      salary: salary
    })
    .eq('id', userId)

  return data;
}