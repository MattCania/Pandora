import React, { useEffect, useState, useContext } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { SessionContext } from "../../pages/home/home";
import GetData from "../../hooks/GetData";
import SubHeader from "./subheader";
import styles from './overview.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function BudgetOverview() {
  const user = useContext(SessionContext);
  const [inventoryData, setInventoryData] = useState([]);

  const fetchInventory = async () => {
    try {
      if (!user) return;
      const inventory = await GetData(`inventory/${user.session.userId}`);
      setInventoryData(inventory || []);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [user]);

  const inventoryChartData = inventoryData.reduce(
    (acc, item) => {
      const categoryIndex = acc.labels.indexOf(item.category);
      if (categoryIndex === -1) {
        acc.labels.push(item.category);
        acc.data.push(item.quantity);
      } else {
        acc.data[categoryIndex] += item.quantity;
      }
      return acc;
    },
    { labels: [], data: [] }
  );

  const doughnutChartData = {
    labels: ["Kitchenette", "Cafe", "Consulting", "Crypto Investments"],
    datasets: [
      {
        label: "Expenses",
        data: [20, 15, 5, 25],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };

  const inventoryDoughnutData = {
    labels: inventoryChartData.labels,
    datasets: [
      {
        label: "Inventory Distribution",
        data: inventoryChartData.data,
        backgroundColor: [
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
      },
    ],
  };

  return (
    <section className={styles.budgetSection}>
      <SubHeader text="Inventory Stocks" subText="as of 2024" />
      <section className={styles.sectionChart}>
        {inventoryData.length > 0 ? (
          <Doughnut data={inventoryDoughnutData} />
        ) : (
          <p>Loading inventory data...</p>
        )}
      </section>
    </section>
  );
}

export default BudgetOverview;