import { useContext } from "react";
import styles from './dashboard.module.css';
import { SessionContext } from "../home/home";
import TransactionOverview from "../../components/overviews/homeTransactions";
import InventoryOverview from "../../components/overviews/homeInventory";
import BudgetOverview from "../../components/overviews/homeBudget";
import Footer from "../../partials/footer/footer";
import HomeWallet from "../../components/overviews/homewallet";
import Loading from "../../partials/loading/loading";
import GetSession from "../../hooks/GetSession";
import PaidUnpaidOverview from "../../partials/Paid && Unpaid/PaidUnpaid"; // Import the new component
import HomeWalletHistory from "../../components/overviews/homeWalletHistory";

function Dashboard() {
    const user = useContext(SessionContext);

    if (!user) {
        return null;
    }

    return (
        <section className={styles.section}>
            <header className={styles.welcomeHeader}>
                <h1>Welcome {user.profile.userName}</h1>
                <p>{user.profile.organization || "Sole Proprietor"}</p>
            </header>

            <section className={styles.firstSection}>
                <TransactionOverview />
                <HomeWallet />
                <HomeWalletHistory />
            </section>

            <section className={styles.secondSection}>
                <InventoryOverview />
            </section>

            {/* New Paid and Unpaid Doughnut Chart */}
            <section className={styles.paidUnpaidChart}>
                <PaidUnpaidOverview />
            </section>

            <section className={styles.footerSection}>
                <Footer />
            </section>
        </section>
    );
}

export default Dashboard;
