export const lineChartData = {
    labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ],
    datasets:[
        {
            label: "Tom",
            data: [3000, 5000, 4500, 6000, 8000, 7000, 9000],
            borderColor: "black"
        },
        {
            label: "Jerry",
            data: [3500, 5100, 450, 5500, 8000, 7000, 9000],
            borderColor: "red"
        },
    ],
};

export const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            label: "Sales in 2024 (in USD)",
            data: [12000, 15000, 8000, 18000, 10000, 20000],
            backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

export const pieChartData = {
    labels: ["Electronics", "Groceries", "Clothing", "Furniture", "Toys"],
    datasets: [
        {
            label: "Market Share by Category",
            data: [25, 20, 15, 30, 10], // Example data values
            backgroundColor: [
                "rgba(255, 99, 132, 0.5)",  // Electronics
                "rgba(54, 162, 235, 0.5)",  // Groceries
                "rgba(255, 206, 86, 0.5)",  // Clothing
                "rgba(75, 192, 192, 0.5)",  // Furniture
                "rgba(153, 102, 255, 0.5)", // Toys
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
            hoverOffset: 4,
        },
    ],
};
