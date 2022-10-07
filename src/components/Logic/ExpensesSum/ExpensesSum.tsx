function ExpensesSum(props: any) {
  return (

      <div className="flex flex-row justify-end my-4 fixed bottom-[30px] right-[20px] w-full bg-color-dgreen h-[50px] p-[5px]">
        <span>Total: {props.sum} €</span>
      </div>

  );
}

export default ExpensesSum;
