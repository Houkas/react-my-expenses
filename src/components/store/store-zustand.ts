import create from "zustand"
import { Expense } from "../../types/Expense";
import { ExpenseCategory } from "../../types/ExpenseCategory";

interface ExpenseState {

    selectedExpenseToEdit: Expense | undefined,
    expenses: Expense[] | undefined,
    expensesSum: number,
    expensesFiltered: Expense[] | undefined,

    yearFilter: string | null,
    monthFilter: string | null,
    dayFilter: string | null,

    expenseCategories: ExpenseCategory[] | undefined,

    setExpenseCategories: (expenseCategories: ExpenseCategory[] | undefined) => void,

    setYearFilter: (year: string) => void,
    setMonthFilter: (month: string) => void,
    setDayFilter: (day: string) => void,

    setExpenseToEdit: (expense: Expense | undefined) => void,
    setExpenses: (expenses: Expense[] | undefined) => void,
    setExpensesFiltered: (expenses: Expense[] | undefined) => void,
    addExpense: (expense: Expense) => void,
    removeExpense: (id: number) => void,
    setExpensesSum: (sum: number) => void,
}

const useStore = create<ExpenseState>((set) => ({
    selectedExpenseToEdit: undefined,
    expenses: undefined,
    expensesSum: 0,
    expensesFiltered: undefined,

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

}));



export default useStore;