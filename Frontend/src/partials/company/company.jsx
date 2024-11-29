import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./company.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Company() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <section className={styles.companySection}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h1 className={styles.companyTitle}>Company Profile</h1>
            </header>
            <div className={styles.profileContainer}>
                <div className={styles.detail}>
                    <h2>Company Name:</h2>
                    <p>Tech Innovators Inc.</p>
                </div>
                <div className={styles.detail}>
                    <h2>Founded:</h2>
                    <p>2005</p>
                </div>
                <div className={styles.detail}>
                    <h2>Industry:</h2>
                    <p>Software Development</p>
                </div>
                <div className={styles.detail}>
                    <h2>Location:</h2>
                    <p>San Francisco, CA</p>
                </div>
                <div className={styles.detail}>
                    <h2>About:</h2>
                    <p>
                        We specialize in creating cutting-edge technology solutions
                        for businesses around the globe. Our team is dedicated to
                        innovation and excellence.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Company;
