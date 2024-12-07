import React, { useContext, useState, useEffect } from "react";
import GetSession from "../../hooks/GetSession";
import Loading from "../../partials/loading/loading";
import { useNavigate } from "react-router-dom";
import styles from "./company.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Company() {
  const navigate = useNavigate()
	const user = GetSession()
	const [isAuth, setAuth] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) return;

		if (user) {
			setAuth(true);
		} else {
			setAuth(false);
		}
	}, [user, loading]);
    
    if(!user) {
        navigate('/login')
        return (<Loading></Loading>)
    }

    return (
        <section className={styles.companySection}>
            <header className={styles.header}>
                <h1 className={styles.companyTitle}>Company Profile</h1>
            </header>
            <div className={styles.profileContainer}>
                <div className={styles.detail}>
                    <h2>Company Name: {user.profile.organization}</h2>
                    <p>Tech Innovators Inc.</p>
                </div>
                <div className={styles.detail}>
                    
                </div>
            </div>
        </section>
    );
}

export default Company;