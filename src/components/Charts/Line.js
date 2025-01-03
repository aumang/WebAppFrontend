import {Line} from 'react-chartjs-2'
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    plugins
 } from 'chart.js';

 ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    plugins
 );

export default function LineGraph({data}){
    const options = {
        responsive: true,
        plugins:{
            legend:{
                position: "bottom"
            },
            title: {
                display: false,
                text: "Tom & Jerry"
            }
        }
    };

    return(
        <Line options={options} data={data}/>
    );
}