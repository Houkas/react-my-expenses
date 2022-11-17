import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthProvider } from "../../Auth/Auth";
import ExpenseForm from "../../Logic/NewExpense/ExpenseForm";
import useStore from "../../store/store-zustand";

import { AnimatePresence } from "framer-motion";

function Navbar() {
  const setExpensesStore = useStore((state) => state.setExpenses);
  const setSelectedExpense = useStore((state) => state.setSelectedExpense);
  const setExpenseToEdit = useStore((state) => state.setExpenseToEdit);
  const location = useLocation();
  const selectedExpenseToEdit = useStore(
    (state) => state.selectedExpenseToEdit
  );
  let [isFormVisible, setIsFormVisible] = useState(false);
  function displayExpenseForm() {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible === true) {
      setExpenseToEdit(undefined);
    } else {
      setSelectedExpense(undefined);
    }
  }

  function hideExpenseForm() {
    setIsFormVisible(false);
  }

  useEffect(() => {
    if (selectedExpenseToEdit !== undefined) {
      displayExpenseForm();
    }
  }, [selectedExpenseToEdit]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isFormVisible === true && (
          <AuthProvider>
            <ExpenseForm
              onHideExpenseForm={hideExpenseForm}
              isExpenseToEdit={
                selectedExpenseToEdit !== undefined ? true : false
              }
            />
          </AuthProvider>
        )}
      </AnimatePresence>
      <div className="navbar bg-color-dgreen fixed bottom-0 border-t border-lgrey w-screen min-h-[60px] z-[2]">
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col items-center pt-1 w-1/2">
            {location.pathname !== "/" && (
              <>
                <NavLink to="/">
                  <button className="btn btn-square btn-ghost flex flex-col items-center">
                    <img src={"./Plus.svg"} />
                    <span className="color-green text-xs">Mes dépenses</span>
                  </button>
                </NavLink>
              </>
            )}
            {location.pathname === "/" && (
              <button
                className="btn btn-square btn-ghost flex flex-col items-center"
                onClick={displayExpenseForm}
              >
                {isFormVisible === false && (
                  <>
                    <img src={"./Plus.svg"} />
                    <span className="color-green text-xs">
                      Ajouter une dépense
                    </span>
                  </>
                )}
                {isFormVisible === true && (
                  <>
                    <img
                      src={"./green-close.svg"}
                      className="w-[30px] h-[30px]"
                    />
                    <span className="color-green text-xs">Annuler</span>
                  </>
                )}
              </button>
            )}
          </div>
          <div className="flex flex-col items-center pt-1 w-1/2">
            {location.pathname !== "/statistiques" && (
              <>
                <NavLink to="statistiques">
                  <button className="btn btn-square btn-ghost flex flex-col items-center">
                    <img src={"./Sort.svg"} />
                    <span className="color-green text-xs">Statistiques</span>
                  </button>
                </NavLink>
              </>
            )}
            {location.pathname === "/statistiques" && (
              <>
                <button
                  className="btn btn-square btn-ghost flex flex-col items-center opacity-50"
                  disabled
                >
                  <img src={"./Sort.svg"} />
                  <span className="color-green text-xs">Statistiques</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
