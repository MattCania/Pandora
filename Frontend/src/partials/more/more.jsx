import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons"
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import React, { useContext, useState } from 'react'
import { SessionContext } from "../../pages/home/home"
import fakeQr from '/fakeQr.svg'
import styles from './more.module.css'
import Loading from "../loading/loading"
import Wallet from "../../components/wallet/wallet";

function MoreSidebar() {
	const navigate = useNavigate()
	const user = useContext(SessionContext);

	let middleInitial
	if (user.user.middleInitial) middleInitial = user.user.middleName.charAt(0)

	const handleLogout = async () => {
		try {
			const response = await fetch("/api/logout", {
				method: "GET",
				credentials: "include",
			});

			if (!response.ok) throw new Error("Logout Failed")
			console.log("Logged out successfully");
			navigate("/login");

		} catch (error) {
			console.error("Error during logout:", error);
		}
	};
	return (
		<aside className={styles.aside}>
			{!user && <Loading />}
			<section className={styles.accountSection}>
				<button className={styles.profileButton}><FontAwesomeIcon icon={faUser} /></button>
				<div className={styles.accountDiv}>
					<h1>{user.user.lastName}, {user.user.firstName} {middleInitial && `${middleInitial}.`} </h1>
					<p>{user.session.email}</p>

					<div className={styles.accountButtons}>
						<Link to='profile'>
							My Account
						</Link>
						<button onClick={handleLogout}>Sign Out</button>
					</div>
				</div>
			</section>
			{user.profile.department &&
				<>

					<hr />
					<section className={styles.departmentSection}>
						<h1>Department</h1>
						<h2>{user.profile.department}</h2>
					</section>

				</>
			}

			<hr />
			<section className={styles.links}>
				<Wallet/>
			</section>
			<hr />

			<section className={styles.links}>
				<div>
					<Link to="settings">Settings</Link>
					<Link to="">Privacy Policy</Link>
					<Link to="">Other Links</Link>
					<Link to="/aboutus">About Us</Link>
					<Link to="">Request a Feature</Link>
				</div>

				<Link><FontAwesomeIcon icon={faStar} /> Experimental Features</Link>
			</section>
			<hr />

			<section className={styles.qrSection}>
				<h2>Download our App!</h2>
				<div className={styles.qrDivSection}>
					<div className={styles.qrDiv}>
						<FontAwesomeIcon icon={faGooglePlay} />
						<img src={fakeQr} alt="" />
					</div>
					<div className={styles.qrDiv}>
						<FontAwesomeIcon icon={faApple} />
						<img src={fakeQr} alt="" />
					</div>
				</div>

			</section>

		</aside>
	)

}

export default MoreSidebar

