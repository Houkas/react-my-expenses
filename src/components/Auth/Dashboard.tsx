import { useEffect, useState } from "react";
import { fetchExpenses } from "../../services/expenseService";
import { Expense } from "../../types/Expense";
import ExpenseHome from "../Logic/ExpenseHome/ExpenseHome";
import Header from "../UI/Header/Header";
import Menu from "../UI/Menu/Menu";
import Navbar from "../UI/Navbar/Navbar";
import { useAuth } from "./Auth";

import useStore from "../store/store-zustand";
import ActionsOnExpense from "../Logic/actionsOnExpense/actionsOnExpense";
import { AnimatePresence } from "framer-motion";

export function Dashboard() {
  const expensesStore = useStore((state) => state.expenses);
  const setExpensesStore = useStore((state) => state.setExpenses);
  const selectedExpense = useStore((state) => state.selectedExpense);
  const [areActionsVisble, setAreActionsVisible] = useState<boolean>(false);

  // Get current user and signOut function from context
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const expenses = await fetchExpenses(user?.id);
      setExpensesStore(expenses);
    })();

    if (selectedExpense !== undefined) {
      setAreActionsVisible(true);
    } else {
      setAreActionsVisible(false);
    }
  }, [selectedExpense]);

  const [isMenuVisivle, setIsMenuVisible] = useState(false);

  function handleOnOpeningMenu(isOpened: any) {
    if (isOpened) {
      setIsMenuVisible((isOpened) => !isOpened);
    }
  }

  return (
    <div>
      <Header onOpeningMenu={handleOnOpeningMenu} />
      {isMenuVisivle === true && <Menu />}
      <ExpenseHome expenses={expensesStore} />
      <AnimatePresence mode="wait">
        {areActionsVisble === true && <ActionsOnExpense />}
      </AnimatePresence>

      <Navbar />
    </div>
  );
}
