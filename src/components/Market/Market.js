// import { useEffect, useState } from "react"
// import * as signalR from "@microsoft/signalr"; // Import signalR if not already imported


// export default function Market(){
//     const [logs, setLogs] = useState([]);
//     const [price, setPrice] = useState([]);

//     useEffect(() => {
//         const connection = new signalR.HubConnectionBuilder()
//             .withUrl("http://localhost:5158/hubs/stockmarkethub")
//             .withAutomaticReconnect()
//             .build();
        
//         connection.start()
//             .then(()=>console.log("Connected to Market Value WebSocket!"))
//             .catch((err)=>console.error("Connection failed:",err));
        
//         connection.on("ReceiveLog", (logMessage) => {
//             setLogs((prevLogs) => [...prevLogs, logMessage]);
//         });

//         connection.on("ReceiveMarketValue",(priceMessage) => {
//             setPrice((prevPrice) => [...prevPrice, priceMessage]);
//         });
//     })

//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 {/* Console Logs Section */}
//                 <div className="col-lg-8">
//                     <div className="card console-card shadow-lg">
//                         <div className="card-header text-white d-flex justify-content-between">
//                             <h5 className="m-0">Console Logs</h5>
                            
//                         </div>
//                         <div className="card-body console-window">
//                             <ul className="list-group">
//                                 {logs.map((log, index) => (
//                                     <li key={index} className="list-group-item log-item">
//                                         {log}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row">
//                 {/* Console Logs Section */}
//                 <div className="col-lg-8">
//                     <div className="card console-card shadow-lg">
//                         <div className="card-header text-white d-flex justify-content-between">
//                             <h5 className="m-0">Price Logs</h5>
                            
//                         </div>
//                         <div className="card-body console-window">
//                             <ul className="list-group">
//                                 {price.map((log, index) => (
//                                     <li key={index} className="list-group-item log-item">
//                                         {log}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useEffect, useState, useMemo } from "react";
import * as signalR from "@microsoft/signalr";
import LiveLineGraph from "../Charts/Line";

export default function Market() {
    const [logs, setLogs] = useState([]);
    const [prices, setPrices] = useState([]); // Array of price objects
    const [isListening, setIsListening] = useState(false);

    // const chartData = useMemo(
    //     () => ({
    //         labels: prices.map((price) => price.stockName), // Use stock names as labels
    //         datasets: [
    //             {
    //                 label: "Stock Rate",
    //                 data: prices.map((price) => price.stockRate), // Use stock rates for data
    //                 borderColor: "rgba(75, 192, 192, 1)",
    //                 backgroundColor: "rgba(75, 192, 192, 0.2)",
    //                 tension: 0.4, // Smooth the line
    //             },
    //         ],
    //     }),
    //     [prices]
    // );
    const chartData = useMemo(() => {
        // Slice the prices array to get the latest 10 entries
        const latestPrices = prices.slice(-10);
    
        return {
            //labels: latestPrices.map((price) => price.stockName), // Use stock names as labels
            labels: latestPrices.map(() => ""), // Empty labels for x-axis
            datasets: [
                {
                    label: "Price",
                    data: latestPrices.map((price) => price.stockRate), // Use stock rates for data
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    tension: 0.4, // Smooth the line
                },
            ],
        };
    }, [prices]);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5158/hubs/stockmarkethub")
            .withAutomaticReconnect()
            .build();

        connection
            .start()
            .then(() => console.log("Connected to Market Value WebSocket!"))
            .catch((err) => console.error("Connection failed:", err));

        connection.on("ReceiveLog", (logMessage) => {
            setLogs((prevLogs) => [...prevLogs, `${new Date().toISOString()} - ${logMessage}`]);
        });

        connection.on("ReceiveMarketValue", (priceMessage) => {
            setPrices((prevPrices) => {
                // Check if stock already exists and update its rate
                const existingIndex = prevPrices.findIndex(
                    (p) => p.stockName === priceMessage.stockName
                );
                // if (existingIndex !== -1) {
                //     const updatedPrices = [...prevPrices];
                //     updatedPrices[existingIndex] = priceMessage;
                //     return updatedPrices;
                // }
                // Otherwise, add the new stock price
                return [...prevPrices, priceMessage];
            });
        });

        // Cleanup on component unmount
        return () => {
            connection.stop();
        };
    }, []);

    // Start WebSocket Listener
    const startListening = () => {
        fetch(`http://localhost:5158/api/StockMarket/start`)
            .then((res) => {
                if (res.ok) {
                    setIsListening(true); // Enable Stop button
                    console.log("WebSocket listener started successfully.");
                } else {
                    throw new Error("Failed to start WebSocket listener.");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // Stop WebSocket Listener
    const stopListening = () => {
        fetch(`http://localhost:5158/api/StockMarket/stop`)
            .then((res) => {
                if (res.ok) {
                    setIsListening(false); // Enable Start button
                    console.log("WebSocket listener stopped successfully.");
                } else {
                    throw new Error("Failed to stop WebSocket listener.");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };
    // return (
    //     <div className="container mt-5">
    //         <div className="row mt-4">
    //             {/* Line Chart Section */}
    //             <div className="col-lg-8">
    //                 <div className="card console-card shadow-lg">
    //                     <div className="card-header text-white d-flex justify-content-between">
    //                         <h5 className="m-0">Stock Rate Line Chart</h5>
    //                     </div>
    //                     <div className="card-body">
    //                         <LiveLineGraph data={chartData} />
    //                     </div>
    //                 </div>
    //             </div>
    
    //             {/* Price Logs Section */}
    //             <div className="col-lg-3">
    //                 <div className="card console-card shadow-lg">
    //                     <div className="card-header text-white d-flex justify-content-between">
    //                         <h5 className="m-0">WebSocket Controller</h5>
    //                     </div>
    //                     <div className="card-body">
    //                         <div className="d-flex justify-content-center my-3">
    //                             {/* Start Button */}
    //                             <button
    //                                 className="btn btn-success me-3"
    //                                 onClick={startListening}
    //                                 disabled={isListening}
    //                             >
    //                                 Start
    //                             </button>
    
    //                             {/* Stop Button */}
    //                             <button
    //                                 className="btn btn-danger"
    //                                 onClick={stopListening}
    //                                 disabled={!isListening}
    //                             >
    //                                 Stop
    //                             </button>
    //                         </div>
    //                         <h6 className="text-muted">WebSocket Status</h6>
    //                         <p>{isListening ? "Listening for updates..." : "Stopped."}</p>
    //                     </div>
    //                 </div>
    
    //                 <div className="card console-card shadow-lg mt-4">
    //                     <div className="card-header text-white d-flex justify-content-between">
    //                         <h5 className="m-0">Price Logs</h5>
    //                     </div>
    //                     <div className="card-body console-window">
    //                         <ul className="list-group">
    //                             {prices.map((price, index) => (
    //                                 <li key={index} className="list-group-item log-item">
    //                                     <strong>{price.stockName}</strong>: ${price.stockRate.toFixed(2)}{" "}
    //                                     {price.circuitClosed ? "(Circuit Closed)" : ""}
    //                                 </li>
    //                             ))}
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    
    //         <div className="row mt-4">
    //             {/* Console Logs Section */}
    //             <div className="col-lg-8">
    //                 <div className="card console-card shadow-lg">
    //                     <div className="card-header text-white d-flex justify-content-between">
    //                         <h5 className="m-0">Console Logs</h5>
    //                     </div>
    //                     <div className="card-body console-window">
    //                         <ul className="list-group">
    //                             {logs.map((log, index) => (
    //                                 <li key={index} className="list-group-item log-item">
    //                                     {log}
    //                                 </li>
    //                             ))}
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
    
    return (
        <div className="container mt-5">
            <div className="row mt-4">
                {/* Line Chart Section */}
                <div className="col-lg-8 col-md-12">
                    <div className="card console-card shadow-lg">
                        <div className="card-header text-white d-flex justify-content-between">
                            <h5 className="m-0">Stock Rate Line Chart</h5>
                        </div>
                        <div className="card-body">
                            <LiveLineGraph data={chartData} />
                        </div>
                    </div>
                </div>
    
                {/* WebSocket Controller Section */}
                <div className="col-lg-3 col-md-12">
                    <div className="card console-card shadow-lg">
                        <div className="card-header text-white d-flex justify-content-between">
                            <h5 className="m-0">WebSocket Controller</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-center my-3">
                                {/* Start Button */}
                                <button
                                    className="btn btn-success me-3"
                                    onClick={startListening}
                                    //disabled={isListening}
                                >
                                    Start
                                </button>
    
                                {/* Stop Button */}
                                <button
                                    className="btn btn-danger"
                                    onClick={stopListening}
                                    //disabled={!isListening}
                                >
                                    Stop
                                </button>
                            </div>
                            <h6 className="text-muted">WebSocket Status</h6>
                            <p>{isListening ? "Listening for updates..." : "Stopped."}</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="row mt-4">
                {/* Price Logs Section */}
                <div className="col-lg-3 col-md-12">
                    <div className="card console-card shadow-lg">
                        <div className="card-header text-white d-flex justify-content-between">
                            <h5 className="m-0">Price Logs</h5>
                        </div>
                        <div className="card-body console-window">
                            <ul className="list-group">
                                {prices.map((price, index) => (
                                    <li key={index} className="list-group-item log-item">
                                        <strong>{price.stockName}</strong>: ${price.stockRate.toFixed(2)}{" "}
                                        {price.circuitClosed ? "(Circuit Closed)" : ""}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
    
                {/* Console Logs Section */}
                <div className="col-lg-8 col-md-12">
                    <div className="card console-card shadow-lg">
                        <div className="card-header text-white d-flex justify-content-between">
                            <h5 className="m-0">Console Logs</h5>
                        </div>
                        <div className="card-body console-window">
                            <ul className="list-group">
                                {logs.map((log, index) => (
                                    <li key={index} className="list-group-item log-item">
                                        {log}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}
