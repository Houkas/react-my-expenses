import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ExpenseForm from "../../Logic/NewExpense/ExpenseForm";

function Navbar(props: any) {

  function saveExpenseDataHandler(enteredExpenseData: any) {
    
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    hideExpenseForm();
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
      {isFormVisible === true && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onHideExpenseForm={hideExpenseForm}/>}
      <div className="navbar bg-color-dgreen fixed bottom-0 border-t border-lgrey w-screen min-h-[60px]">
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col items-center pt-1">
            <button className="btn btn-square btn-ghost flex flex-col items-center" onClick={displayExpenseForm}>
              {isFormVisible === false &&
               <>
                <img src={"./plus.svg"} /><span className="color-green text-xs">Ajouter une dépense</span>
               </>
              }
              {isFormVisible === true &&
               <>
                <img src={"./green-close.svg"} className="w-[30px] h-[30px]"/><span className="color-green text-xs">Annuler</span>
               </>
              }
              
            </button>
          </div>
          <div className="flex flex-col items-center pt-1">
            <NavLink to="statistiques">
              <button className="btn btn-square btn-ghost flex flex-col items-center">
                <img src={"./sort.svg"} />
                <span className="color-green text-xs">Statistiques</span>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
