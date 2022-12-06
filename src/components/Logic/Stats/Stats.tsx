import { useEffect, useState } from "react";
import Header from "../../UI/Header/Header";
import Menu from "../../UI/Menu/Menu";
import Navbar from "../../UI/Navbar/Navbar";
import ExpenseHome from "../ExpenseHome/ExpenseHome";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import useStore from "../../store/store-zustand";
import {
  fetchCategories,
  fetchExpenses,
  fetchSalary,
} from "../../../services/expenseService";
import { useAuth } from "../../Auth/Auth";
import useStoreSalary from "../../store/store-salary";
import { Expense } from "../../../types/Expense";
import { ExpenseCategory } from "../../../types/ExpenseCategory";

ChartJS.register(ArcElement, Tooltip, Legend);
interface valueNumberExpensesPerCategory {
  id: number;
  color: string;
  numberExpenses: number | undefined;
}
interface numberExpensesPerCategory {
  key: string;
  value: valueNumberExpensesPerCategory;
}
[];

function Stats() {
  const { user } = useAuth();

  const [isMenuVisivle, setIsMenuVisible] = useState(false);

  const [expensesPerCategory, setExpensesPerCategory] = useState<
    numberExpensesPerCategory[]
  >([]);

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
    if (expensesStore === undefined || expensesStore === null) {
      (async () => {
        const categories = await fetchCategories(user?.id);
        setExpenseCategories(categories);
        const expenses = await fetchExpenses(user?.id);
        setExpensesStore(expenses);
        let obj: numberExpensesPerCategory[] = [];

        categories?.forEach((category) => {
          obj.push({
            key: category.name,
            value: {
              id: category.id,
              color: category.color,
              numberExpenses: expenses?.filter(
                (expense) => expense.category_id === category.id
              ).length,
            },
          });
        });

        setExpensesPerCategory(obj);
      })();
    }
  }, [expensesStore, expenseCategories]);

  const data = {
    labels: expensesPerCategory?.map((cat) => cat.key),
    datasets: [
      {
        label: "Dépenses par catégories",
        data: expensesPerCategory?.map((cat) => cat.value.numberExpenses),
        backgroundColor: expensesPerCategory?.map((cat) => cat.value.color),
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <Header onOpeningMenu={handleOnOpeningMenu} />
      <div className="pt-20 px-5 flex flex-col justify-center items-center">
        <h1>Statistiques</h1>
        {!expensesStore && !expenseCategories && (
          <p>Vous ne pouvez pas accéder aux statistiques. Remplissez des dépenses et des catégories pour y avoir accès.</p>
        )}
        {expensesStore && expenseCategories && expensesPerCategory && (
          <div className="w-1/3">
            <h2 className="text-center">Nombre de dépenses par catégorie (sur toutes vos dépenses)</h2>
            <Pie data={data} />
          </div>
        )}
      </div>
      {isMenuVisivle === true && <Menu />}
      <Navbar />
    </>
  );
}
export default Stats;
