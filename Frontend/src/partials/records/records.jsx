import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GetData from '../../hooks/GetData'
import styles from './records.module.css'
import SubHeader from "../../components/overviews/subheader";
import Footer from "../footer/footer";
import { SessionContext } from "../../pages/home/home";
import Loading from "../loading/loading";
import GetSession from "../../hooks/GetSession";


function Records() {
	const [data, setData] = useState([])
	const user = useContext(SessionContext);



	useEffect(() => {
		const fetchRecords = async () => {
			try {
				if (!user) return
				const records = await GetData(`records/${user.session.userId}`)
				if (!records) throw new Error("Records Null or Undefined")

				setData(records)
			} catch (error) {
				console.error("Error fetching data:", error);
			}

		}
		fetchRecords();

	}, [])

	return (
		user &&
		<section className={styles.section}>

			<header className={styles.subHeader}>
				<h1>Available Records for User {user.profile.userName}</h1>
			</header>

			<section className={styles.subSection}>
				<SubHeader text="Expense Transaction Record" />
				<section className={styles.displaySection}>

				</section>

			</section>

			<section className={styles.subSection}>
				<SubHeader text="Expense Transaction Record" />
				<section className={styles.displaySection}>
					{data.map((item, index) => (
						<div key={index}>
							<h2>{item.transactionPermission.recordName}</h2>
							<p>Access Type: {item.userAccess.accessType}</p>
							<p>User: {item.userProfiles.userName}</p>
						</div>
					))}
				</section>

			</section>

			<Footer />
		</section>

	)

}

export default Records