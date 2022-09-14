import './ExpenseDate.css';

function ExpenseDate(props:any){

    return(
        <div className='expense-date'>
            <div className='expense-date__day'>{new Date(props.date).toLocaleString('fr', { day: 'numeric' })}</div>
            <div className='expense-date__month'>{new Date(props.date).toLocaleString('fr', { month: 'long' })}</div>
            <div className='expense-date__year'>{new Date(props.date).getFullYear()}</div>
        </div>
    );
}

export default ExpenseDate;