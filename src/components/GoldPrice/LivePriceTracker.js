import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import LineGraph from "../Charts/Line";

export default function LivePriceTracker(){
    const [chartData, setChartData] = useState({
        labels: [], // Timestamps
        datasets: [
            {
                label: "Gold Price (USD)",
                data: [], // Prices
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                tension: 0.2, // Smooth curves
            },
        ],
    });

    // useEffect(()=>{
    //     fetch("http://localhost:5156/api/GoldPrice/history")
    //     .then((res)=>res.json())
    //     .then((res)=>{
    //         setChartData(res);
    //     })
    // },[]);
    useEffect(() => {
    fetch("http://localhost:5156/api/GoldPrice/history")
        .then((res) => res.json())
        .then((res) => {
            // Format the historical data to match chartData structure
            const labels = res.map((entry) => new Date(entry.timestamp).toLocaleTimeString());
            const data = res.map((entry) => entry.price);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: "Gold Price (USD)",
                        data: data,
                        borderColor: "rgba(75,192,192,1)",
                        backgroundColor: "rgba(75,192,192,0.2)",
                        tension: 0.2,
                    },
                ],
            });
        });
}, []);


    useEffect(()=>{
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5156/hubs/goldpriceshub")
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => console.log("Connected to WebSocket!"))
            .catch((err) => console.error("Connection failed:", err));

        connection.on("ReceiveGoldPriceUpdate", (goldPrice) => {
            console.log("Received update:", goldPrice);

            // Dynamically update the chart with new data
            setChartData((prevData) => ({
                labels: [...prevData.labels, new Date(goldPrice.timestamp).toLocaleTimeString()],
                datasets: prevData.datasets.map((dataset) => ({
                    ...dataset,
                    data: [...dataset.data, goldPrice.price],
                })),
            }));
        });

        return () => {
            connection.stop();
        };
    },[]);
    return(
        <div>
            <h5 className="card-title text-success">Live Price Tracker</h5>
            {/* <ul>
                {goldPrices.map((price, index) => (
                    <li key={index}>
                        Price: ${price.price}, Updated at: {new Date(price.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul> */}
            <LineGraph data={chartData}/>
        </div>
    );
}