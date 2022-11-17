import create from "zustand"
import { Expense } from "../../types/Expense";
import { ExpenseCategory } from "../../types/ExpenseCategory";

interface ExpenseState {
    selectedExpense: Expense | undefined,
    selectedExpenseToEdit: Expense | undefined,
    expenses: Expense[] | undefined,
    expensesSum: number,
    expensesFiltered: Expense[] | undefined,
    isExpensesListChanged: boolean,

    yearFilter: string | null,
    monthFilter: string | null,
    dayFilter: string | null,

    expenseCategories: ExpenseCategory[] | undefined,

    setExpenseCategories: (expenseCategories: ExpenseCategory[] | undefined) => void,

    setYearFilter: (year: string) => void,
    setMonthFilter: (month: string) => void,
    setDayFilter: (day: string) => void,

    setSelectedExpense: (expense: Expense | undefined) => void,
    setExpenseToEdit: (expense: Expense | undefined) => void,
    setExpenses: (expenses: Expense[] | undefined) => void,
    setExpensesFiltered: (expenses: Expense[] | undefined) => void,
    addExpense: (expense: Expense) => void,
    removeExpense: (id: number) => void,
    setExpensesSum: (sum: number) => void,
    setIsExpensesListChanged:(value: boolean) => void
}

const useStore = create<ExpenseState>((set) => ({
    selectedExpense: undefined,
    selectedExpenseToEdit: undefined,
    expenses: undefined,
    expensesSum: 0,
    expensesFiltered: undefined,
    isExpensesListChanged: false,

    yearFilter: null,
    monthFilter: null,
    dayFilter: null,

    expenseCategories: undefined,

    setExpenseCategories: (expenseCategoriesDB: ExpenseCategory[] | undefined) => set(
        () => ({ expenseCategories: expenseCategoriesDB })
    ),

    setYearFilter: (year: string) => set(
        () => ({ yearFilter: year })
    ),
    setMonthFilter: (month: string) => set(
        () => ({ monthFilter: month })
    ),
    setDayFilter: (day: string) => set(
        () => ({ dayFilter: day })
    ),

    setSelectedExpense: (expense: Expense | undefined) => set(
        () => ({ selectedExpense: expense })
    ),
    setExpenseToEdit: (expense: Expense | undefined) => set(
        () => ({ selectedExpenseToEdit: expense })
    ),
    setExpenses: (expenses: Expense[] | undefined) => set(
        () => ({ expenses: expenses })
    ),
    setExpensesFiltered: (expensesF: Expense[] | undefined) => set(
        () => ({ expensesFiltered: expensesF })
    ),
    addExpense: (expense: Expense) => set(
        (state: { expenses: Expense[] | undefined }) => ({ expenses: [expense, ...(state.expenses ?? [])] })
    ),
    removeExpense: (id: number) => set(
        (state: { expenses: Expense[] | undefined }) => ({
            expenses: state.expenses?.filter(
                (expense) => {
                    return expense.id !== id;
                })
        })
    ),
    setExpensesSum: (sum: number) => set(
        () => ({ expensesSum: sum })
    ),
    setIsExpensesListChanged: (value: boolean) => set(
        () => ({ isExpensesListChanged: value })
    ),

}));



export default useStore;