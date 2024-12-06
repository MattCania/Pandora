import React, { useState } from "react";
import InventoryOverview from "./homeInventory";
import TransactionOverview from "./homeTransactions";
import InventoryDisplay from "./inventoryD";
import Records from "./records";
import styles from "./analytics.module.css";

function Analytics() {
  const [expenseFilter, setExpenseFilter] = useState("");
  const [purchaseFilter, setPurchaseFilter] = useState("");

  // Handlers for filtering records
  const handleExpenseFilterChange = (e) => {
    setExpenseFilter(e.target.value);
  };

  const handlePurchaseFilterChange = (e) => {
    setPurchaseFilter(e.target.value);
  };

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

      {/* Full Inventory Display */}
      <section className={styles.fullInventorySection}>
        <InventoryDisplay />
      </section>

      {/* Transactions Section */}
      <section className={styles.transactionsSection}>
        <h2>Expense Transactions</h2>
        <Records recordType="Expenses" searchTerm={expenseFilter} />
      </section>
    </div>
  );
}

export default Analytics;
