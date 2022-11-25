import { useEffect, useState } from "react";
import {
  addSalary,
  fetchProfile,
  fetchSalary,
  updateSalary,
} from "../../../services/expenseService";
import { useAuth } from "../../Auth/Auth";
import useStoreNotif from "../../store/store-notification";
import useStoreSalary from "../../store/store-salary";

export default function NewSalary() {
  const [enteredSalary, setEnteredSalary] = useState<number | null>(null);
  const { user } = useAuth();
  const setNotification = useStoreNotif((state) => state.setNotification);
  const setSalary = useStoreSalary((state) => state.setSalary);
  const salary = useStoreSalary((state) => state.salary);

  useEffect(() => {
    //init
    fetchSalary(user?.id).then((salary) => {
      setEnteredSalary(salary!);
    });
  }, [salary]);

  function salaryHandler(event: any) {
    setEnteredSalary(event.target.value);
  }

  function deleteHandler() {
    debugger;
    updateSalary(null, user?.id).then(() => {
      setEnteredSalary(0);
      setSalary(null);
    });
  }

  async function submitHandler(event: any) {
    event.preventDefault();

    if (!salary) {
      const isUSerHasProfile = await fetchProfile(user?.id);
      if (!isUSerHasProfile){
        addSalary(enteredSalary!, user?.id);
        setSalary(enteredSalary);
      } else {
        updateSalary(enteredSalary, user?.id).then(() => {
          setNotification(true, "success", "✅ Salaire enregistré avec succés.");
        });
        setSalary(enteredSalary);
      }
    } else {
      updateSalary(enteredSalary, user?.id).then(() => {
        setNotification(true, "success", "✅ Salaire enregistré avec succés.");
      });
      setSalary(enteredSalary);
    }
  }

  return (
    <>
    <h2 className="underline underline-offset-8">Ajouter son salaire :</h2>
      <div className="flex flex-row  items-start">
        
        <form
          onSubmit={submitHandler}
          className=""
        >
          <div className="flex flex-row items-start">
            <input
              type="number"
              min={0}
              value={enteredSalary !== null ? enteredSalary : 0}
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
        {/*<button
          onClick={() => deleteHandler()}
          className="h-[45px] mt-2 border border-green font bg-color-dgreen font-bold focus:ring-4 focus:ring-blue-300
            px-2 py-2 focus:outline-none"
          style={{ fontSize: "14px" }}
        >
          <img
            src="./delete_red.svg"
            className=""
            width={"15"}
            alt="Supprimez votre salaire"
          />
        </button> */}
        
      </div>
    </>
  );
}
