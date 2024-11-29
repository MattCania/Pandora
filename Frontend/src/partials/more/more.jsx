import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons"
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import React, { useContext } from 'react'
import { SessionContext } from "../../pages/home/home"
import fakeQr from '/fakeQr.svg'
import styles from './more.module.css'
import Loading from "../loading/loading"
import Profile from "../../partials/profile/profile.jsx"

function MoreSidebar() {
	const navigate = useNavigate()
	const user = useContext(SessionContext);

	const middleInitial = user.user.middleName.charAt(0)

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
					<h1>{user.user.lastName}, {user.user.firstName} {middleInitial}. </h1>
					<p>{user.session.email}</p>

					<div className={styles.accountButtons}>
						<a href={Profile}>
							My Account
						</a>
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
				<div>

					<Link to="">Help & Support</Link>
					<Link to="">Explore Tools</Link>
					<Link to="">Contact Support</Link>
					<Link to="">Checkout Plans</Link>
				</div>

				<Link><FontAwesomeIcon icon={faStar} /> Whats New?</Link>
			</section>
			<hr />

			<section className={styles.links}>
				<div>
					<Link to="">Settings</Link>
					<Link to="">Privacy Policy</Link>
					<Link to="">Other Links</Link>
					<Link to="">About Us</Link>
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

