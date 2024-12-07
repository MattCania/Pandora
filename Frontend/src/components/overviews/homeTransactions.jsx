import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { SessionContext } from "../../pages/home/home";
import GetData from "../../hooks/GetData";
import styles from './overview.module.css';
import SubHeader from "./subheader";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function TransactionOverview() {
  const user = useContext(SessionContext);
  const [transactionData, setTransactionData] = useState([]);

  const fetchTransactions = async () => {
    try {
      if (!user) return;
      const records = await GetData(`records/${user.session.userId}`);
      if (!records) throw new Error("Records Null or Undefined");

      // Define all months of the year
      const allMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      // Aggregate data by month for chart
      const monthlyData = records.reduce((acc, record) => {
        const month = new Date(record.createdAt).toLocaleString("default", { month: "short" });
        if (!acc[month]) {
          acc[month] = { purchases: 0, expenses: 0 };
        }
        if (record.recordType === "Purchases") {
          acc[month].purchases += 1;
        } else if (record.recordType === "Expenses") {
          acc[month].expenses += 1;
        }
        return acc;
      }, {});

      // Create chart data, ensuring all months are represented
      const chartData = allMonths.map(month => ({
        month,
        purchases: monthlyData[month]?.purchases || 0,
        expenses: monthlyData[month]?.expenses || 0,
      }));

      setTransactionData(chartData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const chartLabels = transactionData.map(data => data.month);
  const purchaseData = transactionData.map(data => data.purchases);
  const expenseData = transactionData.map(data => data.expenses);

  // Purchases chart data
  const purchaseChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Purchases",
        data: purchaseData,
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Expenses chart data
  const expenseChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
          font: { size: 14, weight: "bold" },
        },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
      y: {
        title: {
          display: true,
          text: "Transactions",
          font: { size: 14, weight: "bold" },
        },
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
  };

  return (
    <section className={styles.Section}>
      <div className={styles.chartContainer}>
        {transactionData.length > 0 ? (
          <>
            <div className={styles.subSection}>
              <SubHeader text="Purchases" subText="As of 2024" />
              <Line data={purchaseChartData} options={options} />
            </div>
            <div className={styles.subSection}>
              <SubHeader text="Expenses" subText="As of 2024" />
              <Line data={expenseChartData} options={options} />
            </div>
          </>
        ) : (
          <div className={styles.loadingContainer}>
            <p>Loading transaction data...</p>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TransactionOverview;
