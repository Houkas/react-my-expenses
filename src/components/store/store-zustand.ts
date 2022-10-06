import create from "zustand"
import { Expense } from "../../types/Expense";

interface ExpenseState {
    expenses: Expense[] | undefined,
    expensesSum: number,
    setExpenses: (expenses: Expense[] | undefined) => void,
    addExpense: (expenses: Expense) => void,
    removeExpense:(id: number) => void,
    setExpensesSum: (sum: number) => void,
  }

const useStore = create<ExpenseState>((set) => ({
    expenses: undefined,
    expensesSum: 0,
    setExpenses: (expenses: Expense[] | undefined) => set(
        () => ({ expenses: expenses })
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