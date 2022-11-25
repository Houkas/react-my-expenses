import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteExpense } from "../../../services/expenseService";
import useStoreNotif from "../../store/store-notification";
import useStore from "../../store/store-zustand";
import ExpenseForm from "../NewExpense/ExpenseForm";

export default function ActionsOnExpense() {
  const removeExpensesStore = useStore((state) => state.removeExpense);
  const selectedExpense = useStore((state) => state.selectedExpense);
  const setSelectedExpense = useStore((state) => state.setSelectedExpense);

  const selectedExpenseToEdit = useStore(
    (state) => state.selectedExpenseToEdit
  );
  const setSelectedExpenseToEdit = useStore((state) => state.setExpenseToEdit);

  const setIsExpensesListChanged = useStore(
    (state) => state.setIsExpensesListChanged
  );
  const setNotification = useStoreNotif((state) => state.setNotification);

  let [isFormVisible, setIsFormVisible] = useState(false);

  function hideExpenseForm() {
    setIsFormVisible(false);
  }

  function editHandler() {
    setSelectedExpenseToEdit(selectedExpense);
  }

  function deleteHandler() {
    if (selectedExpense !== null || selectedExpense !== undefined) {
      deleteExpense(selectedExpense!.id!);
      removeExpensesStore(selectedExpense!.id!);
      setIsExpensesListChanged(true);
      setNotification(
        true,
        "error",
        "🗑️ Dépense : '" + selectedExpense?.title + "' supprimée avec succès."
      );
      setSelectedExpense(undefined);
    }
  }

  function hideActionsHandler(): void {
    setSelectedExpense(undefined);
  }

  const dropIn = {
    hidden: {
      y: "30vh",
      opacity: 0,
    },
    visible: {
      y: "60px",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 30,
        stiffness: 400,
      },
    },
    exit: {
      y: "50vh",
      opacity: 0,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 30,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed bottom-[60px]"
    >
      <AnimatePresence mode="wait">
        {isFormVisible === true && (
          <ExpenseForm
            onHideExpenseForm={hideExpenseForm}
            isExpenseToEdit={selectedExpenseToEdit !== undefined ? true : false}
          />
        )}
      </AnimatePresence>
      <div className="navbar bg-color-lgrey fixed bottom-[60px] border-t border-dgreen w-screen min-h-[60px] z-[10] flex flex-row justify-evenly items-center">
        <div className="flex flex-col justify-center items-center">
          <button
            className="bg-color-dgreen m-1 min-w-[25px] h-[25px] flex flex-row justify-center items-center"
            onClick={editHandler}
          >
            <img src="./edit_green.svg" />
          </button>
          <span className="color-dgreen text-[14px] font-medium">Modifier</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <button
            className="bg-color-dgreen m-1 min-w-[25px] h-[25px] flex flex-row justify-center items-center"
            onClick={deleteHandler}
          >
            <img src="./delete_red.svg" />
          </button>
          <span className="color-dgreen text-[14px] font-medium">
            Supprimer
          </span>
        </div>
        <div className="absolute right-0 top-0 cursor-pointer" onClick={() => hideActionsHandler()}>
          <img src={"./close_dark.svg"} alt="" width="35px" />
        </div>
      </div>
    </motion.div>
  );
}


