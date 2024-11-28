import React from 'react';
import { useState } from "react";
import styles from './landing.module.css';
import Logo from '/src/assets/MainLogo.svg'
import TransactIcon from '../../assets/transaction.png'
import SalesIcon from '../../assets/sales.png'
import InventoryIcon from '../../assets/inventory.png'
import ExpenseIcon from '../../assets/expense.png'
import { Link } from 'react-router-dom'

function Landing() {
    
    return (
        <section className={styles.section}>
            <div className={styles.navigation}>
                    <div className={styles.logo}>
                        <img src={Logo} alt="Pandora" />
                    </div>
                    <div className={styles.links}>
                        <a href="">Products</a>
                        <a href="">Company</a>
                        <a href="">...</a>
                    </div>
                    <div className={styles.logging}>
                        <a href="/login">Sign In</a>
                        <a href="/register">Sign Up</a>
                </div>
            </div>
            <div className={styles.heroContent}>
                <div className={styles.leftContent}>
                    <div className={styles.Header}>
                        <h1>We Got You</h1>
                        <h1><u>Covered!</u></h1>
                    </div>
                    <div className={styles.subheader}>
                        <h2>Welcome to Pandora - your all-in-one financial bookkeeping management app! Stay on top of your finances while keeping track of your inventory with ease.</h2>
                    </div>
                        <div className={styles.loggingIn}>
                            <a href="/register">Get Started for Free</a>
                    </div>
                </div>
                <div className={styles.rightContent}>
                    <div className={styles.featuresCard}>
                        <h2>FEATURES</h2>
                        <ul>
                            <li>
                                <img src={TransactIcon} alt="Transaction Records Icon" />
                                <span>TRANSACTION RECORDS</span>
                            </li>
                            <li>
                                <img src={InventoryIcon} alt="Inventory System Icon" />
                                <span>INVENTORY SYSTEM</span>
                            </li>
                            <li>
                                <img src={SalesIcon} alt="Sales System Icon" />
                                <span>SALES SYSTEM</span>
                            </li>
                            <li>
                                <img src={ExpenseIcon} alt="Annual Expense Icon" />
                                <span>ANNUAL EXPENSE TOTAL</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Landing;
