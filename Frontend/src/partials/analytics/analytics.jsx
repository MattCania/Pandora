import React, { useState } from "react";
import InventoryOverview from "../../components/overviews/homeInventory";
import TransactionOverview from "../../components/overviews/homeTransactions";
import InventoryDisplay from "../inventory/inventory";
import Records from './transaction';
import styles from "./analytics.module.css";

import Footer from '../footer/footer'
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
      <section className={styles.transactionchart}>
          <TransactionOverview type="expenses" />
      </section>

      <section className={styles.transactionsection}>
        <Records recordType="Expenses" searchTerm={expenseFilter} />
      </section>

      <section className={styles.inventorychart}>
        <InventoryOverview />
      </section>

      <section className={styles.inventorysection}>
        <InventoryDisplay />
      </section>
    </div>
  );
}

export default Analytics;