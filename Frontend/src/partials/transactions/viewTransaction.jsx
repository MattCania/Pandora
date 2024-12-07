import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import GetData from '../../hooks/GetData'
import SubHeader from "../../components/overviews/subheader";
import Error from "../../components/error/error";
import styles from './transactions.module.css'
import ConfirmPrompt from "../../components/prompts/confirmingPrompt";
import DeleteRequest from "../../hooks/DeleteRequest";
import MiniHeader from "../../components/subheader/miniheader";

function ViewTransaction() {
	const navigate = useNavigate()
	const { transaction, transactionId, access } = useParams()

	const [transactionData, setTransactionData] = useState({
		account: '',
		category: '',
		amount: '',
		balance: '',
		transactionDate: '',
		paymentType: '',
		currency: '',
		orderNumber: '',
		invoiceNumber: '',
		vendorCustomer: '',
		tax: '',
		credit: '',
		debit: '',
		description: ''
	});

	const fetchTransactionData = async () => {

		try {
			const result = await GetData(`get-${transaction.slice(0, -1)}Transaction/${transactionId}`)

			if (!result) throw new Error("Error Fetching transaction")

			setTransactionData(result.results)
		} catch (error) {
			console.error(error)
			return
		}

	}

	useEffect(() => {
		fetchTransactionData()
	}, [])


	if (!transactionData) return <h1>Loading...</h1>
	const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);
	const [transactionToDelete, setTransactionToDelete] = useState(null);

	const triggerDeletePrompt = (e) => {
		e.stopPropagation();
		setTransactionToDelete(transactionId);
		setShowConfirmPrompt(true);
	};

	const confirmDeletion = async () => {
		try {
			if (!transactionToDelete) return;

			const response = await DeleteRequest(`delete-${transaction.toLowerCase().slice(0, -1)}/${transactionToDelete}`);
			if (!response) {
				throw new Error("Failed to delete the transaction");
			}

			fetchTransactions();
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setShowConfirmPrompt(false);
			setTransactionToDelete(null);
		}
	};

	return (
		transactionData && access &&
		<div className={styles.blur}>
			<section className={styles.openSection}>
				<MiniHeader text={`${transaction} #${transactionId}`} />
				<section className={styles.viewSection}>

					<div className={styles.formDivs}>
						<label htmlFor="account">Account:</label>
						<input id="account" type="text" value={transactionData.account} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="category">Category:</label>
						<input id="category" type="text" value={transactionData.category} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="amount">Amount:</label>
						<input id="amount" type="text" value={transactionData.amount} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="balance">Balance:</label>
						<input id="balance" type="text" value={transactionData.balance} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="transactionDate">Transaction Date:</label>
						<input
							id="transactionDate"
							type="text"
							value={new Date(transactionData.transactionDate).toLocaleString()}
							disabled
						/>
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="paymentType">Payment Type:</label>
						<input id="paymentType" type="text" value={transactionData.paymentType} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="currency">Currency:</label>
						<input id="currency" type="text" value={transactionData.currency} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="orderNumber">Order Number:</label>
						<input id="orderNumber" type="text" value={transactionData.orderNumber} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="invoiceNumber">Invoice Number:</label>
						<input id="invoiceNumber" type="text" value={transactionData.invoiceNumber} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="vendorCustomer">Vendor/Customer:</label>
						<input id="vendorCustomer" type="text" value={transactionData.vendorCustomer} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="tax">Tax:</label>
						<input id="tax" type="text" value={transactionData.tax} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="credit">Credit:</label>
						<input id="credit" type="text" value={transactionData.credit} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="debit">Debit:</label>
						<input id="debit" type="text" value={transactionData.debit} disabled />
					</div>
					<div className={styles.formDivs}>
						<label htmlFor="description">Description:</label>
						<input id="description" type="textarea" value={transactionData.description} disabled />
					</div>
				</section>


				<div className={styles.submission}>
					<button type="button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faX} /></button>
					<div className={styles.actionButtons}>
						{
							access === 'Admin' &&
							<button type="button" className={styles.delete} onClick={(e) => triggerDeletePrompt(e)}>Delete</button>
						}
						{
							access !== 'Viewer' &&
							<Link to={`/home/transaction/edit/${transaction.toLowerCase().slice(0, -1)}/${transactionId}`}>Edit</Link >
						}
					</div>
				</div>
			</section>
			{showConfirmPrompt && (
				<ConfirmPrompt
					mainText="Confirm Deletion"
					subText={`Are you sure you want to delete Transaction ${transactionToDelete}?`}
					cancelText="Cancel"
					proceedText="Delete"
					close={() => setShowConfirmPrompt(false)}
					action={confirmDeletion}
				/>
			)}
		</div>
	)

}

export default ViewTransaction
