import './ExpenseDate.css';

function ExpenseDate(props:any){

    return(
        <div className='border border-dgreen w-[75px] h-[75px] flex flex-col items-center justify-center'>
            <div className='color-dgreen text-center text-sm'>{new Date(props.date).toLocaleString('fr', { day: 'numeric' })}</div>
            <div className='color-dgreen text-center text-sm'>{new Date(props.date).toLocaleString('fr', { month: 'long' })}</div>
            <div className='color-dgreen text-center text-sm'>{new Date(props.date).getFullYear()}</div>
        </div>
    );
}

export default ExpenseDate;