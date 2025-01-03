import { barChartData, lineChartData, pieChartData } from "../Utils/FakeData";
import BarGraph from "./Charts/Bar";
import LineGraph from "./Charts/Line";
import PieGraph from "./Charts/Pie";
export default function TryChart(){
    return(
        <div className="Charts">
            <div className="Line">
                <LineGraph data={lineChartData}/>
            </div>
            <hr/>
            <div className="Bar">
                <BarGraph data={barChartData}/>
            </div>
            <hr/>
            <div className="Pie">
                <PieGraph data = {pieChartData} />
            </div>
        </div>
    );
}