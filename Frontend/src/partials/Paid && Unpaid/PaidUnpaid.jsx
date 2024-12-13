import React, { useEffect, useState, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { SessionContext } from "../../pages/home/home";
import GetData from "../../hooks/GetData";
import styles from "./overview.module.css";
import SubHeader from "../../components/overviews/subheader";

ChartJS.register(ArcElement, Tooltip, Legend);

function PaidUnpaidOverview() {
  const user = useContext(SessionContext);
  const [paymentData, setPaymentData] = useState([]);

  const fetchPaymentData = async () => {
    try {
      if (!user) return;
      const payments = await GetData(`payments`); // Replace with your actual API endpoint
      setPaymentData(payments || []);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, [user]);

  // Calculate paid and unpaid counts
  const paidCount = paymentData.filter((item) => item.status === "Paid").length;
  const unpaidCount = paymentData.filter((item) => item.status === "Unpaid").length;

  const doughnutChartData = {
    labels: ["Paid", "Unpaid"],
    datasets: [
      {
        label: "Payment Status",
        data: [paidCount, unpaidCount],
        backgroundColor: ["#4BC0C0", "#FF6384"], // Colors for Paid and Unpaid
      },
    ],
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
    <section className={styles.paymentSection}>
      <SubHeader text="Paid vs Unpaid Overview" subText="As of 2024" />

      <section className={styles.doughnutChart}>
        <Doughnut data={doughnutChartData} options={doughnutOptions} />
      </section>
    </section>
  );
}

export default PaidUnpaidOverview;
