import { useState, useEffect } from "react";
import styles from './dashboard.module.css'
import TransactionOverview from "../../components/overviews/homeTransactions";
import InventoryOverview from "../../components/overviews/homeInventory";
import BudgetOverview from "../../components/overviews/homeBudget";
import Footer from "../../partials/footer/footer";

function Dashboard() {

	return (
		<section className={styles.section}>
			<header className={styles.welcomeHeader}>
				<h1>Welcome User {``}</h1>
				<p>{`Bisayang ML players Incorporated`}</p>
			</header>

			<section className={styles.firstSection}>
					<TransactionOverview/>
					<BudgetOverview/>
			</section>

			<section className={styles.secondSection}>
				<InventoryOverview/>
			</section>
			
			<section className={styles.footerSection}>
				<Footer/>

			</section>
		</section>
	)


}

export default Dashboard