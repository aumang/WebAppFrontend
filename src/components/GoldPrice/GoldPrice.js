import LatestGoldPrice from "./LatestGoldPrice";
import LivePriceTracker from "./LivePriceTracker";
import UpdateGoldPrice from "./UpdateGoldPrice";

export default function GoldPrice(){
    return (
        <div className="container mt-4">
            {/* Latest Gold Price Card */}
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border-primary shadow-sm">
                        <div className="card-body">
                            
                            <LatestGoldPrice />
                        </div>
                    </div>
                </div>

                {/* Live Price Tracker Graph */}
                <div className="col-md-8 col-lg-6">
                    <div className="card border-success shadow-sm">
                        <div className="card-body">
                            
                            <LivePriceTracker />
                        </div>
                    </div>
                </div>
            </div>
            {/* Hello World Card Below the Latest Gold Price Card */}
            <div className="row justify-content-center mt-4">
                <div className="col-md-4">
                    <div className="card border-warning shadow-sm">
                        <div className="card-body">
                            <UpdateGoldPrice/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}