// import { useEffect, useState } from "react";
// import * as signalR from "@microsoft/signalr";

// export default function TokenBucketRateLimiterDemo(){
//     const [logs, setLogs] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [apiResponse, setApiResponse] = useState("NA");
//     useEffect(()=>{
//         const connection = new signalR.HubConnectionBuilder()
//             .withUrl("http://localhost:5158/hubs/rateLimiterhub")
//             .withAutomaticReconnect()
//             .build();

//             connection.start()
//                 .then(()=>console.log("Connected to Rate Limiter Web Socket"))
//                 .catch((err) => console.error("Connection failed: ", err));
            
//             connection.on("ReceiveLog", (logMessage) => {
//                 setLogs((prevLogs) => [...prevLogs, logMessage]);
//             });

//             return () => {
//                 connection.stop();
//             };
//     }, []);

//     const handleFetchDemo = () => {
//         setIsLoading(true);
//         fetch('http://localhost:5158/WeatherForecast/demo',{
//             method: 'GET',
//             headers: { 'accept': '*/*' },
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             setApiResponse(data);
//         })
//         .catch(() => {
//             setApiResponse("Error");
//         })
//         .finally(() => {
//             setIsLoading(false);
//         })
//     };

//     const handleClearLogs = () => {
//         setLogs([]);
//     };

//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 {/* Circuit Breaker Status Card */}
//                 <div className="col-lg-3">
//                     <div className="card status-card shadow-lg">
//                         <div className="card-header text-white text-center">
//                             <h5>Circuit Breaker Status</h5>
//                         </div>
//                         <div className="card-body text-center">
//                             <p className="status-text">
//                                 <strong>Current State:</strong> {apiResponse}
//                             </p>
//                             <button
//                                 className="btn btn-primary w-100 mb-3"
//                                 onClick={handleFetchDemo}
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? "Loading..." : "Trigger API Call"}
//                             </button>
//                             <button className="btn btn-primary w-100 mb-3" onClick={handleClearLogs}>
//                                 Clear Logs
//                             </button>
//                         </div>
//                     </div>
//                 </div>
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
//         </div>
//     )
// }

import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export default function TokenBucketRateLimiterDemo() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("NA");

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5158/hubs/rateLimiterhub")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("Connected to Rate Limiter Web Socket"))
      .catch((err) => console.error("Connection failed: ", err));

    connection.on("ReceiveLog", (logMessage) => {
      setLogs((prevLogs) => [...prevLogs, logMessage]);
    });

    return () => {
      connection.stop();
    };
  }, []);

  const handleFetchDemo = () => {
    setIsLoading(true);
    setApiResponse("NA"); // Reset the response display before the new call

    fetch("http://localhost:5158/WeatherForecast/demo", {
      method: "GET",
      headers: { accept: "*/*" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.text();
      })
      .then((data) => {
        setApiResponse(JSON.stringify(data, null, 2)); // Format the response for readability
      })
      .catch((error) => {
        setApiResponse(`Error: ${error.message}`);
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
                <strong>Current State:</strong>{" "}
                <pre
                  style={{
                    textAlign: "left",
                    backgroundColor: "#f8f9fa",
                    padding: "10px",
                    borderRadius: "5px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {apiResponse}
                </pre>
              </p>
              <button
                className="btn btn-primary w-100 mb-3"
                onClick={handleFetchDemo}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Trigger API Call"}
              </button>
              <button
                className="btn btn-primary w-100 mb-3"
                onClick={handleClearLogs}
              >
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
