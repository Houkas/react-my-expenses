import { useEffect, useState } from "react";
import { fetchExpenses } from "../../../services/expenseService";
import { useAuth } from "../../Auth/Auth";
import Expenses from "../Expenses/Expenses";
import NewExpense from "../NewExpense/NewExpense";

const DUMMY_EXPENSES = [
    {
      id: 1,
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: 2, title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
    {
      id: 3,
      title: 'Car Insurance',
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: 4,
      title: 'New Desk (Wooden)',
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

function ExpenseHome(){

    // Get current user and signOut function from context
    const { user } = useAuth();
    const [expensesFromDb, setExpensesFromDb] = useState<any[] |undefined>([]);

    useEffect(() =>{
      fetchExpenses(user?.id).then(expenses => {
        setExpensesFromDb(expenses) // your response is an array, extract the first value
      })
      .catch(console.error)
    }, []);

    const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

    function addExpenseHandler(expense:any){
      setExpensesFromDb((prevExpenses) => {
        return [expense, ...(prevExpenses ?? [])];
      });
    }
  
    return (
      <div>
        <NewExpense onAddExpense={addExpenseHandler} />
        {expensesFromDb !== undefined && <Expenses expenses={expensesFromDb}/>}
        
      </div>
    );
}

export default ExpenseHome;