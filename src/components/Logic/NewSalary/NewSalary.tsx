import { useState } from "react";

export default function NewSalary() {
    const [enteredSalary, setEnteredSalary] = useState(0);
    function salaryHandler(event: any){
        setEnteredSalary(event.target.value);
    }
    function submitHandler(event: any){
        event.preventDefault();
    }
  return (
    <form onSubmit={submitHandler}>
      <h2 className="underline underline-offset-8">Ajouter son salaire :</h2>
      <input type="number" min={0} value={enteredSalary} onChange={salaryHandler}/>
    </form>
  );
}
