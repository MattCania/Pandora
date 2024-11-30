import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import GetData from '../../hooks/GetData'
import styles from './records.module.css'
import SubHeader from "../../components/overviews/subheader";
import Footer from "../footer/footer";
import { SessionContext } from "../../pages/home/home";
import Loading from "../loading/loading";
import DeleteRequest from "../../hooks/DeleteRequest";

function Records() {
	const [data, setData] = useState([])
	const navigate = useNavigate()
	const user = useContext(SessionContext);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchRecords = async () => {
		try {
			if (!user) return
			const records = await GetData(`records/${user.session.userId}`)
			console.log(records)
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
		const search = searchTerm.toLowerCase();

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
		const search = searchTerm.toLowerCase();

		return (
			recordId.includes(search) ||
			recordName.includes(search) ||
			accessType.includes(search)
		);
	});

	const handleFilter = (e) => {
		setSearchTerm(e.target.value);
	};


	// Displaying Record Details
	const openRecord = (recordId, recordType) => {
		navigate(`${recordType.toLowerCase()}/${recordId}`)
	}

	// Create new Record
	const navigateCreate = () => {
		navigate('create')
	}

	// Deletion of Record
	const deleteRecord = async (e, recordId) => {
		e.stopPropagation();

		// Create a prompt for this line
		const confirmDelete = window.confirm(`Are you sure you want to delete record ${recordId}?`);
		if (!confirmDelete) return;

		try {
			const response = await DeleteRequest(`delete-record/${recordId}`)

			if (!response) {
				throw new Error("Failed to delete the record");
			}

			fetchRecords()
		} catch (error) {
			console.error("Error:", error);
		}
	}

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
					inputChange={handleFilter}
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
							{filteredExpenseData.map((data, index) => (
								<div
									className={styles.row}
									key={index}
									onClick={() =>
										openRecord(
											data.recordId,
											data.recordType
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
										<Link
											to={`edit/${data.recordId}`}
											onClick={(e) => e.stopPropagation()}
										>
											<FontAwesomeIcon icon={faEdit} />
										</Link>
									</div>
									<div className={styles.delete}>
										<button
											onClick={(e) => deleteRecord(e, data.recordId)}
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
			<section className={styles.subSection}>
				<SubHeader
					text="Purchases Transaction Record"
					buttonClick={navigateCreate}
					searchUp={true}
					placeholder="Search Records"
					inputChange={handleFilter}
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
											data.recordType
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
										<Link
											to={`edit/${data.recordId}`}
											onClick={(e) => e.stopPropagation()}
										>
											<FontAwesomeIcon icon={faEdit} />
										</Link>
									</div>
									<div className={styles.delete}>
										<button
											onClick={(e) => deleteRecord(e, data.recordId)}
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

			<Footer />
		</section>

	)

}

export default Records