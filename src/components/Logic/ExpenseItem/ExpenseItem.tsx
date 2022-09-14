import { useState } from 'react';
import { Expense } from '../../../types/Expense';
import Card from '../../UI/Card/Card';
import ExpenseDate from '../ExpenseDate/ExpenseDate';
import './ExpenseItem.css';

function ExpenseItem(props: any) {

    const [expenseTitle, seTitle] = useState(props.title);
    const expenseAmount: number = props.amount;

    const clickHanler = () => {
        seTitle('test');
    }

    return (
        <li>
            <Card className="expense-item">
            <ExpenseDate date={props.date}/>
            <div className='expense-item__description'>
                <h2>{expenseTitle}</h2>
            </div>
            <div className='expense-item__price'>{expenseAmount} €</div>
            <button onClick={clickHanler}>Change title</button>
            </Card>
        </li>  
    );
    
}

export default ExpenseItem;


