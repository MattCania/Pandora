import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import GetData from '../../hooks/GetData'
import styles from './inventoryD.module.css'
import SubHeader from "../../components/overviews/subheader";
import Footer from "../footer/footer";
import { SessionContext } from "../../pages/home/home";
import Loading from "../loading/loading";
import GetSession from "../../hooks/GetSession";


function InventoryDisplay() {
	const [data, setData] = useState([])
	const navigate = useNavigate()
	const user = useContext(SessionContext);
	const [searchTerm, setSearchTerm] = useState("");
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

	}, [user])

	if (!data) {
		return <Loading />;
	}

	const expenseData = data.filter(record =>
		record.transactionPermission?.recordType === "Expenses"
	);

	const purchaseData = data.filter(record =>
		record.transactionPermission?.recordType === "Purchases"
	);

	// Apply search term filtering
	const filteredExpenseData = expenseData.filter(record => {
		const recordId = record.transactionPermission.recordId.toString();
		const recordName = record.transactionPermission.recordName.toLowerCase();
		const accessType = record.userAccess.accessType.toLowerCase();
		const search = searchTerm.toLowerCase();

		return (
			recordId.includes(search) ||
			recordName.includes(search) ||
			accessType.includes(search)
		);
	});

	const filteredPurchaseData = purchaseData.filter(record => {
		const recordId = record.transactionPermission.recordId.toString();
		const recordName = record.transactionPermission.recordName.toLowerCase();
		const accessType = record.userAccess.accessType.toLowerCase();
		const search = searchTerm.toLowerCase();

		return (
			recordId.includes(search) ||
			recordName.includes(search) ||
			accessType.includes(search)
		);
	});

	const handleFilter = (event) => {
		setSearchTerm(event.target.value);
	};


	// Testing Data
	// const purchaseData = Array.from({ length: 50 }, (_, index) => ({
	// 	transactionPermission: {
	// 		recordId: `${index + 1}`,
	// 		recordName: `Record Name Purchase ${index + 1}`,
	// 		createdAt: new Date().toISOString(),
	// 		recordType: "Type A",
	// 	},
	// 	userAccess: {
	// 		accessType: index % 2 === 0 ? "Read" : "Write",
	// 	},
	// }));

	// const expenseData = Array.from({ length: 50 }, (_, index) => ({
	// 	transactionPermission: {
	// 		recordId: `${index + 1}`,
	// 		recordName: `Record Name Expense ${index + 1}`,
	// 		createdAt: new Date().toISOString(),
	// 		recordType: "Type B",
	// 	},
	// 	userAccess: {
	// 		accessType: index % 2 === 0 ? "Read" : "Write",
	// 	},
	// }));

	// Displaying Record Details
	const openRecord = (recordId, recordType) => {
		navigate(`${recordType}/${recordId}`)
	}

	// Create new Record
	const navigateCreate = () => {
		navigate('create')
	}

	// Deletion of Record
	const deleteRecord = async (e, recordId) => {
		e.stopPropagation();
	}

	return (
		user && expenseData && purchaseData &&
		<section className={styles.section}>

			<header className={styles.subHeader}>
				<h1>Inventory Transactions for User {user.profile.userName}</h1>
			</header>

			<section className={styles.subSection}>
				<SubHeader
					text="Quick Inventory Overview"
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
							<div className={styles.description}>Description</div>
							<div className={styles.category}>Category</div>
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
											data.transactionPermission.recordId,
											data.transactionPermission.recordType
										)
									}
								>
									<div className={styles.index}>{index + 1}</div>
									<div className={styles.id}>{data.transactionPermission.recordId}</div>
									<div className={styles.name}>{data.transactionPermission.recordName}</div>
									<div className={styles.description}>{data.transactionPermission.description || "N/A"}</div>
									<div className={styles.category}>{data.transactionPermission.category || "Uncategorized"}</div>
									<div className={styles.unitPrice}>
										{data.transactionPermission.unitPrice ? `$${data.transactionPermission.unitPrice.toFixed(2)}` : "N/A"}
									</div>
									<div className={styles.access}>{data.userAccess.accessType}</div>
									<div className={styles.creation}>
										{new Date(data.transactionPermission.createdAt).toLocaleDateString()}
									</div>
									<div className={styles.edit}>
										<Link
											to={`edit/${data.transactionPermission.recordId}`}
											onClick={(e) => e.stopPropagation()}
										>
											<FontAwesomeIcon icon={faEdit} />
										</Link>
									</div>
									<div className={styles.delete}>
										<button
											onClick={(e) => deleteRecord(e, data.transactionPermission.recordId)}
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
					text="Full Inventory Records"
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
							<div className={styles.name}>Description</div>
							<div className={styles.name}>Category</div>
							<div className={styles.name}>Unit Price</div>
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
											data.transactionPermission.recordId,
											data.transactionPermission.recordType
										)
									}
								>
									<div className={styles.index}>{index + 1}</div>
									<div className={styles.id}>{data.transactionPermission.recordId}</div>
									<div className={styles.name}>{data.transactionPermission.recordName}</div>
									<div className={styles.access}>{data.userAccess.accessType}</div>
									<div className={styles.creation}>
										{new Date(data.transactionPermission.createdAt).toLocaleDateString()}
									</div>
									<div className={styles.edit}>
										<Link
											to={`edit/${data.transactionPermission.recordId}`}
											onClick={(e) => e.stopPropagation()}
										>
											<FontAwesomeIcon icon={faEdit} />
										</Link>
									</div>
									<div className={styles.delete}>
										<button
											onClick={(e) => deleteRecord(e, data.transactionPermission.recordId)}
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

export default InventoryDisplay