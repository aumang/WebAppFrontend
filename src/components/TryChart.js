import { barChartData, lineChartData, pieChartData } from "../Utils/FakeData";
import BarGraph from "./Charts/Bar";
import LineGraph from "./Charts/Line";
import PieGraph from "./Charts/Pie";
export default function TryChart(){
    return(
        <div className="container mt-5">
            <div className="row">
                {/* Line Chart Card */}
                <div className="col-lg-6 col-md-12 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="m-0">Line Chart</h5>
                        </div>
                        <div className="card-body">
                            <LineGraph data={lineChartData} style={{ height: '300px' }} />
                        </div>
                    </div>
                </div>

                {/* Bar Chart Card */}
                <div className="col-lg-6 col-md-12 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white">
                            <h5 className="m-0">Bar Chart</h5>
                        </div>
                        <div className="card-body">
                            <BarGraph data={barChartData} style={{ height: '300px' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Pie Chart Card */}
                <div className="col-lg-6 col-md-12 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-warning text-white">
                            <h5 className="m-0">Pie Chart</h5>
                        </div>
                        <div className="card-body">
                            <PieGraph data={pieChartData} style={{ height: '300px' }} />
                        </div>
                    </div>
                </div>

                {/* Empty Column to balance the row */}
                <div className="col-lg-6 col-md-12 mb-4"></div>
            </div>
        </div>

    );
}