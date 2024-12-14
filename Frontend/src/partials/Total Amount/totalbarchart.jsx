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
import GetSession from "../../hooks/GetSession";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function PurchaseExpenseOverview() {
  const user = GetSession();
  const [transactionData, setTransactionData] = useState([]);
  const [expenseAmounts, setExpenseAmounts] = useState([]);
  const [purchaseAmounts, setPurchaseAmounts] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchTransactionData();
    fetchAmount();
  }, [user]);

  const fetchAmount = async () => {
    try {
      const expenseAmounts = [];
      const purchaseAmounts = [];

      // Loop through each recordId in transactionData
      for (const transaction of transactionData) {
        const recordId = transaction.recordId;

        // Fetch the amount for the current recordId (both expenses and purchases)
        const expenseAmount = await GetData(`recordAmount/expenses/${recordId}`);
        const purchaseAmount = await GetData(`recordAmount/purchases/${recordId}`);

        // Push the results into respective arrays
        expenseAmounts.push(expenseAmount);
        purchaseAmounts.push(purchaseAmount);
      }

      // Set the state for expense and purchase amounts
      setExpenseAmounts(expenseAmounts);
      setPurchaseAmounts(purchaseAmounts);

      console.log("Fetched expense amounts:", expenseAmounts);
      console.log("Fetched purchase amounts:", purchaseAmounts);

    } catch (error) {
      console.error("Error fetching amounts:", error);
    }
  };

  const fetchTransactionData = async () => {
    try {
      if (!user) return;
      console.log('User', user);
      const transactions = await GetData(`records/${user.session.userId}`);

      console.log(transactions);
      setTransactionData(transactions || []);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  const barChartData = {
    // Group transactions by date and format the dates
    labels: [...new Set(transactionData.map((item) => new Date(item.createdAt).toLocaleDateString()))], // Unique dates

    datasets: [
      {
        label: "Purchase",
        // Set the purchase amounts for each date
        data: [...new Set(transactionData.map((item) => new Date(item.createdAt).toLocaleDateString()))]
          .map((date) =>
            purchaseAmounts[transactionData.findIndex((item) => new Date(item.createdAt).toLocaleDateString() === date)]
          ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expense",
        // Set the expense amounts for each date
        data: [...new Set(transactionData.map((item) => new Date(item.createdAt).toLocaleDateString()))]
          .map((date) =>
            expenseAmounts[transactionData.findIndex((item) => new Date(item.createdAt).toLocaleDateString() === date)]
          ),
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
