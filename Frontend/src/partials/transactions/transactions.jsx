import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import GetData from '../../hooks/GetData'
import styles from './transactions.module.css'
import SubHeader from "../../components/overviews/subheader";

function Transactions() {
	const navigate = useNavigate()
	const { transaction, recordId } = useParams()

	// console.log(transaction, recordId)
	const [data, setData] = useState([])
	const [record, setRecord] = useState([])

	// if (transactions !== 'expenses' && transactions !== 'purchases') navigate(-1)
	const fetchTransactions = async () => {
		try {
			if (!transaction || !recordId) return
			const transactionData = await GetData(`get-${transaction}/${recordId}`)
			console.log(transactionData)
			
			if (!transactionData) {
				throw new Error("Transactions Null or Undefined")
			}

			const records = await GetData(`records/open/${recordId}`)

			if (!records) {
				throw new Error("Records Data Unfound?")
			}
			console.log(records)
			setRecord(records)
			setData(transactionData)
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}
	
	useEffect(() => {
		
		fetchTransactions();
	}, [transaction])



	return (
		<section className={styles.section}>
			<header className={styles.subHeader}>
				<h1>Record: {record.recordName} </h1>
			</header>

			<section className={styles.subSection}>
				<SubHeader
					text="Expense Transaction Record"
					searchUp={true}
					placeholder="Search Records"
				/>
				<section className={styles.displaySection}>
					<div className={styles.table}>
						<div className={styles.tableHeader}>
							<div className={styles.index}>#</div>
							<div className={styles.id}>Transaction Id</div>
							<div className={styles.name}>Description</div>
							<div className={styles.access}>Amount</div>
							<div className={styles.creation}>Created At</div>
							<div className={styles.edit}>Edit</div>
							<div className={styles.delete}>Delete</div>
						</div>
						<div className={styles.tableBody}>
							{data.map((data, index) => (
								<div
									className={styles.row}
									key={index}
								>
									<div className={styles.index}>{index + 1}</div>
									<div className={styles.id}>{data.transactionId}</div>
									<div className={styles.name}>{data.description}</div>
									<div className={styles.access}>{data.amount}</div>
									<div className={styles.creation}>
										{new Date(data.transactionDate).toLocaleDateString()}
									</div>
									<div className={styles.edit}>
										<Link
											to={`edit/${data.expenseId}`}
											onClick={(e) => e.stopPropagation()}
										>
											<FontAwesomeIcon icon={faEdit} />
										</Link>
									</div>
									<div className={styles.delete}>
										<button
											// onClick={(e) => deleteRecord(e, data.recordId)}
										>
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

			</section>

		</section>
	)
}


export default Transactions