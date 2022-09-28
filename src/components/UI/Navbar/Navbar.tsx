import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ExpenseForm from "../../Logic/NewExpense/ExpenseForm";

function Navbar(props: any) {
  const location = useLocation();

  function saveExpenseDataHandler(enteredExpenseData: any) {
    props.onSaveExpenseData(enteredExpenseData);
  }

  let [isFormVisible, setIsFormVisible] = useState(false);
  function displayExpenseForm() {
    setIsFormVisible(!isFormVisible);
  }

  function hideExpenseForm() {
    setIsFormVisible(false);
  }

  return (
    <>
      {isFormVisible === true && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onHideExpenseForm={hideExpenseForm}
        />
      )}
      <div className="navbar bg-color-dgreen fixed bottom-0 border-t border-lgrey w-screen min-h-[60px]">
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col items-center pt-1 w-1/2">
          {location.pathname !== "/" && (
              <>
                <NavLink to="/">
                  <button className="btn btn-square btn-ghost flex flex-col items-center">
                    <img src={"./plus.svg"} />
                    <span className="color-green text-xs">Statistiques</span>
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
                  <img src={"./plus.svg"} />
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
                    <img src={"./sort.svg"} />
                    <span className="color-green text-xs">Statistiques</span>
                  </button>
                </NavLink>
              </>
            )}
            {location.pathname === "/statistiques" && (
              <>
                  <button className="btn btn-square btn-ghost flex flex-col items-center opacity-50" disabled>
                    <img src={"./sort.svg"} />
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
