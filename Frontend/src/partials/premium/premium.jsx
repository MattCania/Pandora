import styles from './premium.module.css';

function Premium() {

    return (
        <section className={styles.section}>
                <div className={styles.nonPremium}>
                    <h1>Free</h1>
                    <h2>$0</h2>
                    <h3>Basic features: </h3>
                    <ul>
                        <h3>• Analytics</h3>
                        <h3>• Transaction Records</h3>
                        <h3>• Inventory System</h3>
                        <h3>• Company Roles</h3>
                    </ul>
                </div>
                <div className={styles.Premium}>
                    <h1>Boosted</h1>
                    <h2>$100 per month</h2>
                    <h3>Premium features: </h3>
                    <ul>
                        <h3>• All the basic features</h3>
                        <h3>• Banking Logs</h3>
                        <h3>• Experimental Features</h3>
                        <h3>• Early Access to future features</h3>
                    </ul>
                    <button className={styles.button}>Subscribe</button>
                </div>
        </section>
    )
}

export default Premium