import { useEffect, useState } from "react";
import { addSalary, fetchSalary, updateSalary } from "../../../services/expenseService";
import { useAuth } from "../../Auth/Auth";
import useStoreNotif from "../../store/store-notification";
import useStoreSalary from "../../store/store-salary";

export default function NewSalary() {

  const [enteredSalary, setEnteredSalary] = useState(0);
  const { user } = useAuth();
  const setNotification = useStoreNotif((state) => state.setNotification);
  const setSalary = useStoreSalary((state) => state.setSalary);
  const salary = useStoreSalary((state) => state.salary);

  useEffect(() => {
    //init
    fetchSalary(user?.id).then((salary) => {
      setSalary(salary!);
      setEnteredSalary(salary!);
    });
    //update
    /*
    if (categoriesUpdated == true) {
      async () => {
        await fetchCategories(user?.id).then((categories) => {
          setCategories(categories);
          setcategoriesUpdated(false);
        });
      };
    }
    */
  }, [salary]);

  function salaryHandler(event: any) {
    setEnteredSalary(event.target.value);
  }
  function submitHandler(event: any) {
    event.preventDefault();
    if(!salary){
      addSalary(enteredSalary, user?.id);
      setSalary(enteredSalary);
    } else {
      updateSalary(enteredSalary, user?.id);
      setSalary(enteredSalary);
    }
    setNotification(true, 'success', 'Salaire enregistré avec succés.');
  }

  return (
    <form onSubmit={submitHandler}>
      <h2 className="underline underline-offset-8">Ajouter son salaire :</h2>
      <div className="flex flex-row justify-center items-center">
        <input
          type="number"
          min={0}
          value={enteredSalary}
          onChange={salaryHandler}
          className={"mt-2 h-[45px] rounded-none"}
        />
        <button
          onClick={() => submitHandler}
          className="h-[45px] mt-2 color-dgreen font bg-color-green font-bold focus:ring-4 focus:ring-blue-300
            px-2 py-2 focus:outline-none"
          style={{ fontSize: "14px" }}
        >
          Sauvegarder
        </button>
      </div>
    </form>
  );
}
