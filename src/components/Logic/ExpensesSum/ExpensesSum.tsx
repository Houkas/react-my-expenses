import { useEffect } from "react";
import useStoreSalary from "../../store/store-salary";

function ExpensesSum(props: any) {
  const salary = useStoreSalary((state) => state.salary);
  useEffect(() => {
    if (salary) {
    }
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-end py-4 fixed bottom-[60px] right-[20px] w-full bg-color-dgreen h-[40px]">
        <span className="text-sm">Dépenses totales: {props.sum} €</span>
        {salary && (
          <span
            className="text-sm"
            style={{ color: salary - props.sum > 0 ? "#87FF73" : " #ff7373" }}
          >
            <span>Reste: </span>
            {salary - props.sum} €
          </span>
        )}
      </div>
    </>
  );
}

export default ExpensesSum;
