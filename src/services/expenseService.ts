import { supabase } from "./supabaseClient"
import type { Expense } from '../types/Expense'
import { useState } from "react";
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

export async function fetchExpenses(userId: string | undefined) {
  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("*");
  if (error){
    console.log("error", error);
  } else{
    return expenses;
  }
}

export async function deleteExpense(id:number){
  try {

    await supabase.from("expenses").delete().eq("id", id);

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
  const { data: expenses, error } = await supabase
    .from("categories")
    .select("*");
  if (error){
    console.log("error", error);
  } else{
    return expenses;
  }
}

export async function deleteCategory(id:number){
  try {

    await supabase.from("categories").delete().eq("id", id);

  } catch (error) {
    console.log("error", error);
  }
}
