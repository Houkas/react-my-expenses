import React from "react";
import Chart from "../../UI/Chart/Chart";

function ExpensesChart(props:any){

    const chartDataPoints = [
        { value: 0, label:'Jan' },
        { value: 0, label:'Fev' },
        { value: 0, label:'Mar' },
        { value: 0, label:'Avr' },
        { value: 0, label:'Mai' },
        { value: 0, label:'Jun' },
        { value: 0, label:'Jui' },
        { value: 0, label:'Aou' },
        { value: 0, label:'Sep' },
        { value: 0, label:'Oct' },
        { value: 0, label:'Nov' },
        { value: 0, label:'Dec' },
    ]

        
        for(const expense of props.expenses){
            const expenseMonth = new Date(expense.date).getMonth();
            chartDataPoints[expenseMonth].value += expense.amount;
        }

    

    return(
        <div>
            {props.expenses !== undefined && <Chart dataPoints={chartDataPoints}/>}
        </div>
        
    );
}

export default ExpensesChart;