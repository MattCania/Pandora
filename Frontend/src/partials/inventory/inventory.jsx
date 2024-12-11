import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { SessionContext } from "../../pages/home/home";
import styles from './inventory.module.css'
import Loading from "../loading/loading";
import GetData from '../../hooks/GetData'
import SubHeader from "../../components/overviews/subheader";
import Footer from "../footer/footer";
import DeleteRequest from "../../hooks/DeleteRequest";
import CreateInterface from "../../components/interface/createInterface";
import FilterRecords from "../../utils/recordFilter";
import ConfirmPrompt from "../../components/prompts/confirmingPrompt";
import ConfirmDeletion from "../../components/prompts/confirmDeletion";

function Inventory() {
	const navigate = useNavigate()
	const user = useContext(SessionContext);
	const [data, setData] = useState([])
	const [searchTerm, setSearchTerm] = useState("");

	const fetchRecords = async () => {
		try {
			if (!user) return
			const inventory = await GetData(`inventory/${user.session.userId}`)
			if (inventory.length === 0 || !inventory) {
				console.log('Empty Results')
			}

			setData(inventory || [])
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

	// Apply search term filtering
	const filteredInventory = data.filter(inventory => {
		const inventoryRecord = String(inventory.inventoryId);
		const accessType = inventory.permissions[0].userAccess.accessType.toLowerCase();
		const search = searchTerm.toLowerCase();

		return (
			inventoryRecord.includes(search) ||
			accessType.includes(search)
		);
	});

	const inventoryFilter = (e) => {
		setSearchTerm(e.target.value);
	};

	// Displaying Record Details
	const openRecord = (recordId, access) => {
		navigate(`${recordId}/${access}`)
	}

	// Create new Record

	const navigateCreate = () => {
		navigate('create')
	}

	const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);
	const [inventoryToDelete, setInventoryToDelete] = useState(null);
	const [showConfirmedPrompt, setShowConfirmedPrompt] = useState(false);

	const triggerDeletePrompt = (e, inventoryId) => {
		e.stopPropagation();
		setInventoryToDelete(inventoryId);
		setShowConfirmPrompt(true);
	};

	const confirmDeletion = async () => {
		try {
			if (!inventoryToDelete) return; 

			const response = await DeleteRequest(`delete-inventory/${inventoryToDelete}`);
			if (!response) {
				throw new Error("Failed to delete the record");
			}
			fetchRecords();
			setShowConfirmedPrompt(true); 
			setTimeout(() => {
				setShowConfirmedPrompt(false);
			}, 3000);
		} catch (error) {
			console.error("Error deleting inventory:", error);
		} finally {
			setShowConfirmPrompt(false); 
			setInventoryToDelete(null); 
		}
	};


	return (
		user &&
		<section className={styles.section}>

			<header className={styles.subHeader}>
				<h1>Available Inventory for User {user.profile.userName}</h1>
			</header>

			<section className={styles.subSection}>
				<SubHeader
					text="Inventory Records"
					buttonClick={navigateCreate}
					searchUp={true}
					placeholder="Search Inventory"
					inputChange={inventoryFilter}
				/>
				<section className={styles.displaySection}>
					<div className={styles.table}>
						<div className={styles.tableHeader}>
							<div className={styles.index}>#</div>
							{/* <div className={styles.id}>Inventory Id</div> */}
							<div className={styles.name2}>Stock Name</div>
							<div className={styles.name}>Inventory Description</div>
							<div className={styles.category}>Category</div>
							<div className={styles.access}>Quantity</div>
							<div className={styles.cell2}>Unit Price</div>
							{/* <div className={styles.access}>Supplier</div> */}
							{/* <div className={styles.access}>Location</div> */}
							{/* <div className={styles.access}>Minimum Quantity</div> */}
							<div className={styles.cell}>Status</div>
							<div className={styles.cell}>Access Type</div>
							<div className={styles.creation}>Created At</div>
							<div className={styles.edit}>Edit</div>
							<div className={styles.delete}>Delete</div>
						</div>
						<div className={styles.tableBody}>
							{data.map((data, index) => (
								<div
									className={styles.row}
									key={index}
									onClick={() =>
										openRecord(
											data.inventoryId,
											data.permissions[0].userAccess.accessType
										)
									}
								>
									<div className={styles.index}>{index + 1}</div>
									{/* <div className={styles.id}>{data.inventoryId}</div> */}
									<div className={styles.name2}>{data.inventoryName}</div>
									<div className={styles.name}>{data.description}</div>
									<div className={styles.category}>{data.category}</div>
									<div className={styles.access}>{data.quantity}</div>
									<div className={styles.cell2}>{data.unitPrice}</div>
									{/* <div className={styles.access}>{data.supplier}</div> */}
									{/* <div className={styles.access}>{data.location}</div> */}
									{/* <div className={styles.access}>{data.minQty}</div> */}
									<div className={styles.cell}>{data.status}</div>
									<div className={styles.cell}>{data.permissions[0].userAccess.accessType}</div>
									<div className={styles.creation}>
										{new Date(data.createdAt).toLocaleDateString()}
									</div>
									<div className={styles.edit}>
										<Link
											to={`edit/${data.inventoryId}`}
											onClick={(e) => e.stopPropagation()}
										>
											<FontAwesomeIcon icon={faEdit} />
										</Link>
									</div>
									<div className={styles.delete}>
										<button
											disabled={data.permissions[0].userAccess.accessType === "Editor" ? true : false}
											onClick={(e) => {
												if (data.permissions[0].userAccess.accessType === "editor") {
													e.preventDefault();
													e.stopPropagation();
													return; // Block further execution
												}
												triggerDeletePrompt(e, data.inventoryId);
											}}
										>
											{data.permissions[0].userAccess.accessType === 'Editor' ? <FontAwesomeIcon icon={faBan} /> : <FontAwesomeIcon icon={faTrash} />}

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
					subText={`Are you sure you want to delete record ${inventoryToDelete}?`}
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

export default Inventory