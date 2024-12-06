import React from "react";
import InventoryOverview from "./homeInventory";
import TransactionOverview from "./homeTransactions";
import InventoryDisplay from "../inventoryD/inventoryD"; // Import the InventoryDisplay component
import Transactions from "../transactions/transactions"; // Import the Transactions component
import styles from "./analytics.module.css"; // For layout styling

function Analytics() {
  const expenseRecordId = 1; // Replace with dynamic record ID for expenses if necessary
  const purchaseRecordId = 2; // Replace with dynamic record ID for purchases if necessary

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
        <div className={styles.transactionTables}>
          <div className={styles.tableWrapper}>
            <h2>Expense Transactions</h2>
            <Transactions transaction="expenses" recordId={expenseRecordId} />
          </div>
          <div className={styles.tableWrapper}>
            <h2>Purchase Transactions</h2>
            <Transactions transaction="purchases" recordId={purchaseRecordId} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Analytics;
