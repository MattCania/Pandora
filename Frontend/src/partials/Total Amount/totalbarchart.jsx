import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { SessionContext } from "../../pages/home/home";
import GetData from "../../hooks/GetData";
import styles from "./overview.module.css";
import SubHeader from "../../components/overviews/subheader";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function PurchaseExpenseOverview() {
  const user = useContext(SessionContext);
  const [transactionData, setTransactionData] = useState([]);

  const fetchTransactionData = async () => {
    try {
      if (!user) return;
      const transactions = await GetData(`transactions`); // Adjust API endpoint as needed
      setTransactionData(transactions || []);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, [user]);

  const barChartData = {
    labels: transactionData.map((item) => item.date), // Assuming `date` is in transaction data
    datasets: [
      {
        label: "Purchase",
        data: transactionData
          .filter((item) => item.type === "purchase") // Filter by purchase type
          .map((item) => item.totalAmount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expense",
        data: transactionData
          .filter((item) => item.type === "expense") // Filter by expense type
          .map((item) => item.totalAmount),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Dates",
          font: { size: 14, weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Amount",
          font: { size: 14, weight: "bold" },
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <section className={styles.inventorySection}>
      <SubHeader text="Purchase and Expense Overview" subText="As of 2024" />

      <section className={styles.sectionChart}>
        <Bar data={barChartData} options={barOptions} />
      </section>
    </section>
  );
}

export default PurchaseExpenseOverview;
