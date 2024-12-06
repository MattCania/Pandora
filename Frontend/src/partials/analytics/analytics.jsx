import React from "react";
import InventoryOverview from "./homeInventory";
import TransactionOverview from "./homeTransactions";
import styles from "./analytics.module.css"; // For layout styling
function Analytics() {
  return (
    <div className={styles.mainSection}>
  {/* Transaction Overview: Total Expenses & Total Purchases */}
  <section className={styles.transactionSection}>
    <div className={styles.subSection}>
      <TransactionOverview type="expenses" />
    </div>
    <div className={styles.subSection}>
      <TransactionOverview type="purchases" />
    </div>
  </section>
  {/* Inventory Overview */}
  <section className={styles.inventorySection}>
    <InventoryOverview />
  </section>
</div>
  );
}
export default Analytics;

