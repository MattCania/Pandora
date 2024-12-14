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
  const [expenses, setExpenses] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (!user) return
    // console.log("User ID is fetched");
    fetchExpenses(); // Call the function to fetch expenses
    fetchPurchases(); // Call the function to fetch expenses
  }, [user]);

  // Fetch Expenses and organize them by month
  const fetchExpenses = async () => {
    try {
      const getExp = await GetData(`user-expense/${user.session.userId}`);
      if (!getExp) throw new Error("Records Null or Undefined");

      // console.log(getExp);

      // Organizing expenses by month
      const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthlyData = getExp.reduce((acc, record) => {
        const month = new Date(record.transactionDate).toLocaleString("default", { month: "short" });
        if (!acc[month]) {
          acc[month] = 0; // initialize if month doesn't exist
        }
        acc[month] += parseFloat(record.amount); // sum the amounts for each month
        return acc;
      }, {});

      const chartData = allMonths.map(month => ({
        month,
        totalExpense: monthlyData[month] || 0, // default to 0 if no data for the month
      }));

      setExpenses(chartData); // Set the expenses data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const fetchPurchases = async () => {
    try {
      const getPur = await GetData(`user-purchase/${user.session.userId}`);
      if (!getPur) throw new Error("Records Null or Undefined");

      // console.log(getPur);

      // Organizing expenses by month
      const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthlyData = getPur.reduce((acc, record) => {
        const month = new Date(record.transactionDate).toLocaleString("default", { month: "short" });
        if (!acc[month]) {
          acc[month] = 0; // initialize if month doesn't exist
        }
        acc[month] += parseFloat(record.amount); // sum the amounts for each month
        return acc;
      }, {});

      const chartData = allMonths.map(month => ({
        month,
        totalPurchase: monthlyData[month] || 0, // default to 0 if no data for the month
      }));

      setPurchases(chartData); // Set the expenses data
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  // Assuming purchases will be fetched similarly, for now, use mock data:
  const purchaseChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Purchases",
        data: purchases.map(entry => entry.totalPurchase),// Use purchase data here
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const expenseChartData = {
    labels: expenses.map(entry => entry.month),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map(entry => entry.totalExpense),
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
          text: "Amount",
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
        {loading ? (
          <div className={styles.loadingContainer}>
            <p>Loading transaction data...</p>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <>
            <div className={styles.subSection}>
              <SubHeader text="Purchases Records" subText="As of 2024" />
              <Line data={purchaseChartData} options={options} />
            </div>
            <div className={styles.subSection}>
              <SubHeader text="Expenses Records" subText="As of 2024" />
              <Line data={expenseChartData} options={options} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default TransactionOverview;
