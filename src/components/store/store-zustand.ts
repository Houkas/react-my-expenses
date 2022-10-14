import create from "zustand"
import { Expense } from "../../types/Expense";

interface ExpenseState {
    expenses: Expense[] | undefined,
    expensesSum: number,
    expensesFiltered: Expense[] | undefined,
    yearFilter: string | null,
    monthFilter: string | null,
    dayFilter: string | null,
    setYearFilter: (year: string) => void,
    setMonthFilter: (month: string) => void,
    setDayFilter: (day: string) => void,
    setExpenses: (expenses: Expense[] | undefined) => void,
    setExpensesFiltered: (expenses: Expense[] | undefined) => void,
    addExpense: (expenses: Expense) => void,
    removeExpense:(id: number) => void,
    setExpensesSum: (sum: number) => void,
}

const useStore = create<ExpenseState>((set) => ({
    expenses: undefined,
    expensesSum: 0,
    expensesFiltered: undefined,
    yearFilter: null,
    monthFilter: null,
    dayFilter: null,
    setYearFilter: (year: string) => set(
        () => ({yearFilter: year})
    ),
    setMonthFilter: (month: string) => set(
        () => ({monthFilter: month})
    ),
    setDayFilter: (day: string) => set(
        () => ({dayFilter: day})
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