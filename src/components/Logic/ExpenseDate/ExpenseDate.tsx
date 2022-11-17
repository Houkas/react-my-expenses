import './ExpenseDate.css';

function ExpenseDate(props:any){

    

    return(
        <div className='flex flex-row items-center'>
            <span style={{fontSize: "12px"}} className='color-dgreen text-center font-medium'>{new Date(props.date).toLocaleString('fr', { day: 'numeric' }) + '/'}</span>
            <span style={{fontSize: "12px"}} className='color-dgreen text-center font-medium'>{new Date(props.date).toLocaleString('fr', { month: 'numeric' }) + '/'}</span>
            <span style={{fontSize: "12px"}} className='color-dgreen text-center font-medium'>{new Date(props.date).getFullYear()}</span>
        </div>
    );
}

export default ExpenseDate;