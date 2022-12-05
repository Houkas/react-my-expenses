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

ChartJS.register(ArcElement, Tooltip, Legend);

function Stats() {
  const { user } = useAuth();
  const [isMenuVisivle, setIsMenuVisible] = useState(false);
  const expensesStore = useStore((state) => state.expenses);
  const setExpensesStore = useStore((state) => state.setExpenses);
  
  function handleOnOpeningMenu(isOpened: any) {
    if (isOpened) {
      setIsMenuVisible((isOpened) => !isOpened);
    }
  }

  const setSalary = useStoreSalary((state) => state.setSalary);

  useEffect(() => {
    console.log(expensesStore);
    if(expensesStore === undefined || expensesStore === null){
      (async () => {
        const expenses = await fetchExpenses(user?.id);
        setExpensesStore(expenses);
        console.log(expenses)
      })();
    }
  }, []);

  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
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
