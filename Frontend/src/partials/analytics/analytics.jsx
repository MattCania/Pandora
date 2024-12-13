import React, { useState } from "react";
import InventoryOverview from "../../components/overviews/homeInventory";
import TransactionOverview from "../../components/overviews/homeTransactions";
import PurchaseExpenseOverview from "../Total Amount/totalbarchart";
import InventoryDisplay from "../inventory/inventory";
import Records from './transaction';
import styles from "./analytics.module.css";
import Footer from '../footer/footer';

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
    <div className={styles.section}>
      <section className={styles.mainSection}>
        <header className={styles.subHeader}>
          <h1>Financial Analytics</h1>
        </header>

        {/* Existing Transaction Chart */}
        <section className={styles.transactionchart}>
          <TransactionOverview type="expenses" />
        </section>

        {/* Existing Inventory Chart */}
        <section className={styles.inventorychart}>
          <InventoryOverview />
        </section>

        {/* New Purchase and Expense Chart */}
        <section className={styles.purchaseExpenseChart}>
          <PurchaseExpenseOverview />
        </section>

        {/* Footer */}
        <Footer />
      </section>
    </div>
  );
}

export default Analytics;
