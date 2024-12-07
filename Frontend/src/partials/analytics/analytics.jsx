import React from "react";
import styles from "./analytics.module.css"; // For layout styling
import InventoryOverview from "../../components/overviews/homeInventory";
import TransactionOverview from "../../components/overviews/homeTransactions";
import Footer from '../footer/footer'
function Analytics() {
  return (
    <div className={styles.mainSection}>
  {/* Transaction Overview: Total Expenses & Total Purchases */}
  <section className={styles.transactionSection}>
    <div className={styles.subSection}>
      <TransactionOverview type="expenses" />
    </div>
  </section>
  {/* Inventory Overview */}
  <section className={styles.inventorySection}>
    <InventoryOverview />
  </section>
  <Footer/>
</div>
  );
}
export default Analytics;

