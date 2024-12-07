import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { SessionContext } from "../../pages/home/home";
import styles from './records.module.css'
import Loading from "../loading/loading";
import GetData from '../../hooks/GetData'
import SubHeader from "../../components/overviews/subheader";
import Footer from "../footer/footer";
import DeleteRequest from "../../hooks/DeleteRequest";
import CreateInterface from "../../components/interface/createInterface";
import FilterRecords from "../../utils/recordFilter";
import ConfirmPrompt from "../../components/prompts/confirmingPrompt";
import ConfirmDeletion from "../../components/prompts/confirmDeletion"

function Records() {
	const navigate = useNavigate()
	const user = useContext(SessionContext);
	const [data, setData] = useState([])
	const [purchaseTerm, setPurchaseTerm] = useState("");
	const [expenseTerm, setExpenseTerm] = useState('')

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

	useEffect(() => {
		fetchRecords();
	}, [user])

	if (!data) {
		return <Loading />;
	}

	const expenseData = data.filter(record =>
		record.recordType === "Expenses"
	);

	const purchaseData = data.filter(record =>
		record.recordType === "Purchases"
	);

	// Apply search term filtering
	const filteredExpenseData = expenseData.filter(record => {
		const recordId = record.recordId.toString();
		const recordName = record.recordName.toLowerCase();
		const accessType = record.recordPermissions[0].userAccess.accessType.toLowerCase();
		const search = expenseTerm.toLowerCase();

		return (
			recordId.includes(search) ||
			recordName.includes(search) ||
			accessType.includes(search)
		);
	});

	const filteredPurchaseData = purchaseData.filter(record => {
		const recordId = record.recordId.toString();
		const recordName = record.recordName.toLowerCase();
		const accessType = record.recordPermissions[0].userAccess.accessType.toLowerCase();
		const search = purchaseTerm.toLowerCase();

		return (
			recordId.includes(search) ||
			recordName.includes(search) ||
			accessType.includes(search)
		);
	});

	const purchaseFilter = (e) => {
		setPurchaseTerm(e.target.value);
	};

	const expenseFilter = (e) => {
		setExpenseTerm(e.target.value);
	};

	// Displaying Record Details
	const openRecord = (recordId, recordType, access) => {
		navigate(`${recordType.toLowerCase()}/${recordId}/${access}`)
	}

	// Create new Record

	const navigateCreate = () => {
		navigate('create')
	}

	const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);
	const [recordToDelete, setRecordToDelete] = useState(null);
	const [showConfirmedPrompt, setShowConfirmedPrompt] = useState(false);

	const triggerDeletePrompt = (e, recordId) => {
		e.stopPropagation();
		setRecordToDelete(recordId);
		setShowConfirmPrompt(true);
	};

	const confirmDeletion = async () => {
		try {
			if (!recordToDelete) return;
	
			const response = await DeleteRequest(`delete-record/${recordToDelete}`);
			if (!response) {
				throw new Error("Failed to delete the record");
			}
			fetchRecords(); 
			setShowConfirmedPrompt(true);

			setTimeout(() => {
				setShowConfirmedPrompt(false);
			}, 3000);
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setShowConfirmPrompt(false); 
			setRecordToDelete(null); 
		}
	};
	

	return (
		user && expenseData && purchaseData &&
		<section className={styles.section}>

			<header className={styles.subHeader}>
				<h1>Available Records for User {user.profile.userName}</h1>
			</header>

			<section className={styles.subSection}>
				<SubHeader
					text="Expense Transaction Record"
					buttonClick={navigateCreate}
					searchUp={true}
					placeholder="Search Records"
					inputChange={expenseFilter}
				/>
				<section className={styles.displaySection}>
					<div className={styles.table}>
						<div className={styles.tableHeader}>
							<div className={styles.index}>#</div>
							<div className={styles.id}>Record Id</div>
							<div className={styles.name}>Record Name</div>
							<div className={styles.cost}>Cost</div>
							<div className={styles.access}>Access Type</div>
							<div className={styles.creation}>Created At</div>
							<div className={styles.edit}>Edit</div>
							<div className={styles.delete}>Delete</div>
						</div>
						<div className={styles.tableBody}>
							{filteredExpenseData.map((data, index) => (
								<div
									className={styles.row}
									key={index}
									onClick={() =>
										openRecord(
											data.recordId,
											data.recordType,
											data.recordPermissions[0].userAccess.accessType
										)
									}
								>
									<div className={styles.index}>{index + 1}</div>
									<div className={styles.id}>{data.recordId}</div>
									<div className={styles.name}>{data.recordName}</div>
									<div className={styles.cost}>{data.cost}</div>
									<div className={styles.access}>{data.recordPermissions[0].userAccess.accessType}</div>
									<div className={styles.creation}>
										{new Date(data.createdAt).toLocaleDateString()}
									</div>

										<div className={styles.edit}>
										<Link className={data.recordPermissions[0].userAccess.accessType === "Viewer" ? styles.linkButton : ''}
											to={`edit/${data.recordId}`}
											disabled={data.recordPermissions[0].userAccess.accessType === "Viewer"}
											onClick={(e) => {
												if (data.recordPermissions[0].userAccess.accessType === "Viewer") {
													e.preventDefault();
													e.stopPropagation();
													return; // Block further execution
												}
												triggerDeletePrompt(e, data.recordId);
											}}
										>
											{data.recordPermissions[0].userAccess.accessType === 'Viewer' ? <FontAwesomeIcon icon={faBan}/> : <FontAwesomeIcon icon={faEdit} />}
										</Link>
									</div>
									<div className={styles.delete}>
										<button
										disabled={
											data.recordPermissions[0].userAccess.accessType === "Editor" || 
											data.recordPermissions[0].userAccess.accessType === "Viewer"
										  }
										onClick={(e) => {
											if (data.recordPermissions[0].userAccess.accessType === "Editor" || data.recordPermissions[0].userAccess.accessType === "Viewer") {
												e.preventDefault();
												e.stopPropagation();
												return; // Block further execution
											}
											triggerDeletePrompt(e, data.recordId);
										}}
										>
											{data.recordPermissions[0].userAccess.accessType === 'Editor' || data.recordPermissions[0].userAccess.accessType === 'Viewer' ? <FontAwesomeIcon icon={faBan}/> : <FontAwesomeIcon icon={faTrash} />}
											
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

			</section>
			<section className={styles.subSection}>
				<SubHeader
					text="Purchases Transaction Record"
					buttonClick={navigateCreate}
					searchUp={true}
					placeholder="Search Records"
					inputChange={purchaseFilter}
				/>
				<section className={styles.displaySection}>
					<div className={styles.table}>
						<div className={styles.tableHeader}>
							<div className={styles.index}>#</div>
							<div className={styles.id}>Record Id</div>
							<div className={styles.name}>Record Name</div>
							<div className={styles.access}>Access Type</div>
							<div className={styles.creation}>Created At</div>
							<div className={styles.edit}>Edit</div>
							<div className={styles.delete}>Delete</div>
						</div>
						<div className={styles.tableBody}>
							{filteredPurchaseData.map((data, index) => (
								<div
									className={styles.row}
									key={index}
									onClick={() =>
										openRecord(
											data.recordId,
											data.recordType,
											data.recordPermissions[0].userAccess.accessType
										)
									}
								>
									<div className={styles.index}>{index + 1}</div>
									<div className={styles.id}>{data.recordId}</div>
									<div className={styles.name}>{data.recordName}</div>
									<div className={styles.access}>{data.recordPermissions[0].userAccess.accessType}</div>
									<div className={styles.creation}>
										{new Date(data.createdAt).toLocaleDateString()}
									</div>
									<div className={styles.edit}>
										<Link className={data.recordPermissions[0].userAccess.accessType === "Viewer" ? styles.linkButton : ''}
											to={`edit/${data.recordId}`}
											onClick={(e) => {
												if (data.recordPermissions[0].userAccess.accessType === "Viewer") {
													e.preventDefault();
													e.stopPropagation();
													return; // Block further execution
												}
												triggerDeletePrompt(e, data.recordId);
											}}
											disabled={data.recordPermissions[0].userAccess.accessType === "Viewer"}
										>
											{data.recordPermissions[0].userAccess.accessType === 'Viewer' ? <FontAwesomeIcon icon={faBan}/> : <FontAwesomeIcon icon={faEdit} />}
										</Link>
									</div>
									<div className={styles.delete}>
										<button
										disabled={
											data.recordPermissions[0].userAccess.accessType === "Editor" || 
											data.recordPermissions[0].userAccess.accessType === "Viewer"
										  }
										  onClick={(e) => {
											if (data.recordPermissions[0].userAccess.accessType === "Editor" || data.recordPermissions[0].userAccess.accessType === "Viewer") {
												e.preventDefault();
												e.stopPropagation();
												return; // Block further execution
											}
											triggerDeletePrompt(e, data.recordId);
										}}
										>
											{data.recordPermissions[0].userAccess.accessType === 'Editor' || data.recordPermissions[0].userAccess.accessType === 'Viewer' ? <FontAwesomeIcon icon={faBan}/> : <FontAwesomeIcon icon={faTrash} />}
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

			</section>

			{showConfirmPrompt && (
					<ConfirmPrompt
						mainText="Confirm Deletion"
						subText={`Are you sure you want to delete record ${recordToDelete}?`}
						cancelText="Cancel"
						proceedText="Delete"
						close={() => setShowConfirmPrompt(false)}
						action={confirmDeletion}
					/>
			)}

			{showConfirmedPrompt && (
				<ConfirmDeletion
					subText="The record has been successfully deleted!"
					close={() => setShowConfirmedPrompt(false)}
				/>
			)}
			<Footer />
		</section>

	)

}

export default Records