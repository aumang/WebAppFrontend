import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import "./LatestGoldPrice.css";

export default function LatestGoldPrice() {
    const [goldPrice, setGoldPrice] = useState({ price: 0, timestamp: new Date().toISOString() });

    // Initial fetch for the latest price
    useEffect(() => {
        fetch("http://localhost:5158/api/GoldPrice/latest-gold-price")
            .then((res) => res.json())
            .then((res) => {
                setGoldPrice(res);
            });
    }, []);

    // WebSocket connection for real-time updates
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5158/hubs/goldpriceshub")
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => console.log("Connected to WebSocket!"))
            .catch((err) => console.error("Connection failed:", err));

        // Listen for real-time gold price updates
        connection.on("ReceiveGoldPriceUpdate", (updatedGoldPrice) => {
            console.log("Received update:", updatedGoldPrice);

            // Dynamically update the latest gold price
            setGoldPrice(updatedGoldPrice);
        });

        // Cleanup WebSocket connection on component unmount
        return () => {
            connection.stop();
        };
    }, []);

    return (
        <div className="gold-price-card">
            <h5 className="card-title text-primary">Latest Product Price</h5>
            <p className="price">
                💰 Price: <span>${goldPrice.price}</span>
            </p>
            <p className="timestamp">
                🕒 Updated at: <span>{new Date(goldPrice.timestamp).toLocaleString()}</span>
            </p>
        </div>
    );
}
