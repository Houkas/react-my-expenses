import { useEffect, useState } from "react";
import Header from "../../UI/Header/Header";
import Menu from "../../UI/Menu/Menu";
import Navbar from "../../UI/Navbar/Navbar";
import ExpenseHome from "../ExpenseHome/ExpenseHome";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useStore from "../../store/store-zustand";
import { fetchCategories, fetchExpenses, fetchSalary } from "../../../services/expenseService";
import { useAuth } from "../../Auth/Auth";
import useStoreSalary from "../../store/store-salary";
import { Expense } from "../../../types/Expense";
import { ExpenseCategory } from "../../../types/ExpenseCategory";

ChartJS.register(ArcElement, Tooltip, Legend);

function Stats() {
  const { user } = useAuth();

  const [isMenuVisivle, setIsMenuVisible] = useState(false);

  // To do : 
  // - compter le nombre de dépense par catégorie
  // - mettre dans un tableau toutes les couleurs des catégories
  // 
  const [numberCategories, setNumberCategories] = useState(0);

  const expensesStore = useStore((state) => state.expenses);
  const setExpensesStore = useStore((state) => state.setExpenses);
  const expenseCategories = useStore((state) => state.expenseCategories);
  const setExpenseCategories = useStore((state) => state.setExpenseCategories);

  function handleOnOpeningMenu(isOpened: any) {
    if (isOpened) {
      setIsMenuVisible((isOpened) => !isOpened);
    }
  }

  useEffect(() => {
    console.log(expensesStore);
    console.log(expenseCategories);
    if(expensesStore === undefined || expensesStore === null){
      (async () => {

        const categories = await fetchCategories(user?.id);
        setExpenseCategories(categories)
        const expenses = await fetchExpenses(user?.id);
        setExpensesStore(expenses);

      })();
    }
  }, [expensesStore, expenseCategories]);

  const data = {
    labels: expenseCategories?.map(cat => cat.name),
    datasets: [{
      label: 'Dépenses par catégories',
      data: [
        300, 40, 100, 10, 5, 25, 3
      ],
      backgroundColor: expenseCategories?.map(cat => cat.color),
      hoverOffset: 4
    }]
  };


  return (
    <>
      <Header onOpeningMenu={handleOnOpeningMenu} />
      <div className="pt-20 px-5 flex flex-col justify-center items-center">
        <p>Page en cours de développement 🚧</p>
        <div className="w-1/3">
          <Pie data={data} />
        </div>

      </div>
      {isMenuVisivle === true && <Menu />}
      <Navbar />
    </>
  );
}
export default Stats;
