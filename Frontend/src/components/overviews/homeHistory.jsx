import React, { useState } from 'react'; 
import styles from './overview.module.css'; 
import SubHeader from './subheader';

const WalletHistory = ({ user, transactions }) => {
    const [editMode, setEditMode] = useState(false);
    const [formValues, setFormValues] = useState({});

    const toggleModes = () => setEditMode(!editMode);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = () => {
        // Logic to save changes
        console.log("Saved changes:", formValues);
        toggleModes();
    };

    return (
        user &&
        <section className={styles.Section}>
            <div className={styles.chartContainer}>
                <div className={styles.subSection}>
                    <SubHeader text="Wallet Transaction History" subText="Recent Transactions" />
                    
                    <div className={styles.transactions}>
                        <table className={styles.transactionTable}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount ({user.profile.currency})</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions && transactions.length > 0 ? (
                                    transactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td>{transaction.date}</td>
                                            <td>{transaction.description}</td>
                                            <td>
                                                {editMode ? (
                                                    <input
                                                        type="number"
                                                        name={`amount-${index}`}
                                                        value={formValues[`amount-${index}`] || transaction.amount}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    transaction.amount
                                                )}
                                            </td>
                                            <td>{transaction.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No transactions available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.buttonDiv}>
                        <button onClick={editMode ? handleSubmit : toggleModes} className={editMode ? styles.active : null}>
                            {editMode ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WalletHistory;
