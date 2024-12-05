import { useContext } from "react";
import styles from './dashboard.module.css';
import { SessionContext } from "../home/home";
import TransactionOverview from "../../components/overviews/homeTransactions";
import InventoryOverview from "../../components/overviews/homeInventory";
import BudgetOverview from "../../components/overviews/homeBudget";
import Footer from "../../partials/footer/footer";
import Loading from "../../partials/loading/loading";
import GetSession from "../../hooks/GetSession";

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
                <BudgetOverview />
            </section>

            <section className={styles.secondSection}>
                <InventoryOverview />
            </section>

            <section className={styles.footerSection}>
                <Footer />
            </section>
        </section>
    );
}

export default Dashboard;
