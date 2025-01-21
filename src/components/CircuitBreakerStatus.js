import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import "./CircuitBreakerStatus.css";

export default function CircuitBreakerStatus() {
    const [circuitState, setCircuitState] = useState("Closed");
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // WebSocket connection for real-time updates
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5158/hubs/circuitBreakerHub")
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => console.log("Connected to Circuit Breaker WebSocket!"))
            .catch((err) => console.error("Connection failed:", err));

        connection.on("ReceiveCircuitState", (state) => {
            setCircuitState(state);
        });

        connection.on("ReceiveLog", (logMessage) => {
            setLogs((prevLogs) => [...prevLogs, logMessage]);
        });

        return () => {
            connection.stop();
        };
    }, []);

    const handleFetchProduct = () => {
        setIsLoading(true);
        fetch('http://localhost:5158/api/AdminProduct/GetProduct', {
            method: 'GET',
            headers: { 'accept': '*/*' },
        })
        .then((response) => response.json())
        .then((data) => {
            setCircuitState(data.circuitState);
        })
        .catch(() => {
            setCircuitState("Open");
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const handleClearLogs = () => {
        setLogs([]);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Circuit Breaker Status Card */}
                <div className="col-lg-3">
                    <div className="card status-card shadow-lg">
                        <div className="card-header text-white text-center">
                            <h5>Circuit Breaker Status</h5>
                        </div>
                        <div className="card-body text-center">
                            <p className="status-text">
                                <strong>Current State:</strong> {circuitState}
                            </p>
                            <button
                                className="btn btn-primary w-100 mb-3"
                                onClick={handleFetchProduct}
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Trigger API Call"}
                            </button>
                            <button className="btn btn-primary w-100 mb-3" onClick={handleClearLogs}>
                                Clear Logs
                            </button>
                        </div>
                    </div>
                </div>
                {/* Console Logs Section */}
                <div className="col-lg-8">
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
