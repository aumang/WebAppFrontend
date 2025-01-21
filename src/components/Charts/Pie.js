import {Pie} from 'react-chartjs-2'
import { 
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
 } from 'chart.js';

 ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
 );

 export default function PieGraph({data}){
    const options = {
      responsive: true,  // Make it responsive to the container size
      aspectRatio: 2,
      plugins: {
          legend: {
              position: 'right',
          },
      },
      cutout: '30%',  // Controls the inner cutout for a donut chart, if desired
      elements: {
          arc: {
              borderWidth: 2, // Adjusts the border width of the pie slices
          },
      },
   };
    return (
        <Pie options={options} data={data}/>
    );
 }
