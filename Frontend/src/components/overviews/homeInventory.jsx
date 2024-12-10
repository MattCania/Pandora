import React, { useEffect, useState, useContext } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { SessionContext } from "../../pages/home/home";
import GetData from "../../hooks/GetData";
import styles from "./overview.module.css";
import SubHeader from "./subheader";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

function InventoryOverview() {
  const user = useContext(SessionContext);
  const [inventoryData, setInventoryData] = useState([]);

  const fetchInventory = async () => {
    try {
      if (!user) return;
      const inventory = await GetData(`inventory`);
      setInventoryData(inventory || []);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [user]);

  if (!inventoryData || inventoryData.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading inventory data...</p>
        <div className={styles.spinner}></div>
      </div>
    );
  }


  const barChartData = {
    labels: inventoryData.map((item) => item.inventoryName),
    datasets: [
      {
        label: "Quantity",
        data: inventoryData.map((item) => item.quantity),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Unit Price",
        data: inventoryData.map((item) => item.unitPrice),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const { labels: doughnutLabels, data: doughnutData } = inventoryData.reduce(
    (acc, item) => {
      const categoryIndex = acc.labels.indexOf(item.category);
      if (categoryIndex === -1) {
        acc.labels.push(item.category);
        acc.data.push(1);
      } else {
        acc.data[categoryIndex] += 1;
      }
      return acc;
    },
    { labels: [], data: [] }
  );

  const doughnutChartData = {
    labels: doughnutLabels,
    datasets: [
      {
        label: "Category Distribution",
        data: doughnutData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
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
          text: "Inventory Items",
          font: { size: 14, weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: true,
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
    },
  };

  return (
    <section className={styles.inventorySection}>
      <SubHeader text="Inventory Overview" subText="As of 2024" />

      <section className={styles.sectionChart}>
        <Bar data={barChartData} options={barOptions} />
      </section>
    </section>
  );
}

export default InventoryOverview;
