import React from 'react';
import './Chart.css';
import ChartBar from './ChartBar';

function Chart(props:any){

    const dataPointsValues = props.dataPoints.map((dataPoint: { value: any; }) => dataPoint.value)
    const totalMaximum = Math.max(...dataPointsValues);

    return(
        <div className='chart'>
            {
                props.dataPoints.map((dataPoint:any) => (

                    <ChartBar 
                    value={dataPoint.value} 
                    maxValue={totalMaximum} 
                    label={dataPoint.label}
                    key={dataPoint.label}
                    />
                
                ))
            }
        </div>
    );
}

export default Chart;