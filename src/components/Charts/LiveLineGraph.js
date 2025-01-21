import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LiveLineGraph({ data }) {
  const options = {
    responsive: true,
    animation: {
      duration: 500, // Smooth animation for real-time updates
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `Value: ${value}`;
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Stock Names",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Stock Rates",
        },
        ticks: {
            beginAtZero: false,
            //callback: (value) => `$${value.toFixed(2)}`, // Format y-axis labels
            precision: 2,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4, // Smooth lines
      },
      point: {
        radius: 4, // Highlight data points
        hoverRadius: 6,
        backgroundColor: "rgba(255, 99, 132, 1)", // Highlight latest point
      },
    },
  };

  return <Line options={options} data={data} />;
}
