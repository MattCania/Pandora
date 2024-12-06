import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faX } from "@fortawesome/free-solid-svg-icons";
import GetData from '../../hooks/GetData';
import MiniHeader from "../../components/subheader/miniheader";
import inventoryStyle from './inventory.module.css';
import transactionStyle from '../transactions/transactions.module.css'
import ConfirmPrompt from "../../components/prompts/confirmPrompt";
import DeleteRequest from "../../hooks/DeleteRequest";

function OpenInventory() {
	const navigate = useNavigate();
	const { inventoryId, access } = useParams();

	const [inventoryData, setInventoryData] = useState({
		category: '',
		createdAt: '',
		creatorId: '',
		description: '',
		inventoryId: '',
		inventoryName: '',
		location: '',
		minQty: '',
		quantity: '',
		status: '',
		supplier: '',
		unitPrice: ''
	});

	const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);

	const fetchInventoryData = async () => {
		try {
			const result = await GetData(`inventory/open/${inventoryId}`);
			console.log(result)
			if (!result) throw new Error("Error fetching inventory data");

			setInventoryData(result);
		} catch (error) {
			console.error(error);
		}
	};

	const confirmDeletion = async () => {
		try {
			const response = await DeleteRequest(`delete-inventory/${inventoryId}`);
			if (!response) {
				throw new Error("Failed to delete the inventory");
			}

			navigate(-1);
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setShowConfirmPrompt(false);
		}
	};

	useEffect(() => {
		fetchInventoryData();
	}, []);

	if (!inventoryData) return <h1>Loading...</h1>;

	return (
		<div className={transactionStyle.blur}>
			<section className={transactionStyle.openSection}>
				<MiniHeader text={`Inventory: ${inventoryData.inventoryName}`} />
				<section className={transactionStyle.viewSection}>

					<div className={transactionStyle.formDivs}>
						<label htmlFor="inventoryName">Inventory Name:</label>
						<input id="inventoryName" type="text" value={inventoryData.inventoryName} disabled />
					</div>
					<div className={transactionStyle.formDivs}>
						<label htmlFor="category">Category:</label>
						<input id="category" type="text" value={inventoryData.category} disabled />
					</div>
					<div className={transactionStyle.formDivs}>
						<label htmlFor="quantity">Quantity:</label>
						<input id="quantity" type="text" value={inventoryData.quantity} disabled />
					</div>
					<div className={transactionStyle.formDivs}>
						<label htmlFor="minQty">Minimum Quantity:</label>
						<input id="minQty" type="text" value={inventoryData.minQty} disabled />
					</div>
					<div className={transactionStyle.formDivs}>
						<label htmlFor="unitPrice">Unit Price:</label>
						<input id="unitPrice" type="text" value={inventoryData.unitPrice} disabled />
					</div>
					<div className={transactionStyle.formDivs}>
						<label htmlFor="supplier">Supplier:</label>
						<input id="supplier" type="text" value={inventoryData.supplier} disabled />
					</div>
					<div className={transactionStyle.formDivs}>
						<label htmlFor="location">Location:</label>
						<input id="location" type="text" value={inventoryData.location} disabled />
					</div>
					<div className={transactionStyle.formDivs}>
						<label htmlFor="status">Status:</label>
						<input id="status" type="text" value={inventoryData.status} disabled />
					</div>
					<div className={transactionStyle.formDivs}>
						<label htmlFor="description">Description:</label>
						<textarea id="description" value={inventoryData.description} disabled ></textarea>
					</div>
					<div className={transactionStyle.formDivs}>
						<label htmlFor="createdAt">Created At:</label>
						<input id="createdAt" type="text" value={new Date(inventoryData.createdAt).toLocaleString()} disabled />
					</div>
				</section>

				<div className={transactionStyle.submission}>
					<button type="button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faX} /></button>
					<div className={inventoryStyle.actionButtons}>
			{
							access === 'Admin' &&
							<button type="button" className={transactionStyle.delete} onClick={() => setShowConfirmPrompt(true)}>Delete</button>
						}
						{
							access !== 'Viewer' &&
							<Link to={`/home/inventory/edit/${inventoryId}`}>Edit</Link >
						}
						
					</div>
				</div>
			</section>

			{showConfirmPrompt && (
				<ConfirmPrompt
					mainText="Confirm Deletion"
					subText={`Are you sure you want to delete ${inventoryData.inventoryName}?`}
					cancelText="Cancel"
					proceedText="Delete"
					close={() => setShowConfirmPrompt(false)}
					action={confirmDeletion}
				/>
			)}
		</div>
	);
}

export default OpenInventory;