import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from './transactions.module.css'
import GetData from '../../hooks/GetData'

function Transactions() {
	const navigate = useNavigate()
	const { transaction, recordId } = useParams()

	// console.log(transaction, recordId)
	const [data, setData] = useState([])

	// if (transactions !== 'expenses' && transactions !== 'purchases') navigate(-1)

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				if (!transaction || !recordId) return
				const records = await GetData(`get-${transaction}/${recordId}`)
				console.log(records)
				if (!records) {
					throw new Error("Transactions Null or Undefined")
				}

				setData(records)
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}
		fetchTransactions();
	}, [transaction])



	return (
		<section className={styles.section}>
			<header className={styles.subHeader}>
				<h1>Records {recordId} Information</h1>
			</header>


		</section>
	)
}


export default Transactions