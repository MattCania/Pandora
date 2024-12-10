import { useParams, useNavigate } from "react-router-dom";
import CreateInterface from "../../components/interface/createInterface";
import { useEffect, useState } from "react";
import PostRequest from "../../hooks/PostRequest";
import GetData from "../../hooks/GetData";
import ConfirmEdited from "../../components/prompts/confirmEdited";

function EditInventory() {
	const navigate = useNavigate();
	const { inventoryId } = useParams();
	const [showEdited, setShowEdited] = useState(false);

	const [existingData, setExistingData] = useState({ results: {} });

	if (!inventoryId) return <h1>Loading...</h1>;

	const fetchInventoryInfo = async () => {
		try {
			const result = await GetData(`inventory/open/${inventoryId}`);
			if (!result) throw new Error("Error Getting Inventory Data");
			setExistingData(result);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		fetchInventoryInfo();
	}, []);

	if (!existingData) return <h1>Loading...</h1>;

	const inventoryInput = [
		{
		  label: "Inventory Name",
		  type: "text",
		  id: "inventoryName",
		  name: "inventoryName",
		  placeholder: "Enter Inventory Name",
		},
		{
		  label: 'Stock Type',
		  type: 'select',
		  id: 'type',
		  name: 'type',
		  options: [
			'Goods',
			'Service'
		  ]
		},
		{
		  label: "Category",
		  type: "select",
		  id: "category",
		  name: "category",
		  options: [
			"Raw Materials",
			"Finished Goods",
			"Work-in-Progress",
			"Consumables",
			"Office Supplies",
			"Machinery and Equipment",
			"Furniture",
			"Electronics",
			"Vehicles",
			"Health and Safety",
			"Packaging Materials",
			"Perishable Goods",
			"Non-Perishable Goods",
			"Tools",
			"Miscellaneous",
		  ],
		},
		{
		  label: "Quantity",
		  type: "number",
		  id: "quantity",
		  name: "quantity",
		  placeholder: "Enter Quantity",
		},
		{
		  label: "Unit Price",
		  type: "number",
		  id: "unitPrice",
		  name: "unitPrice",
		  placeholder: "Enter Unit Price",
		},
		{
		  label: "Status",
		  type: "select",
		  id: "status",
		  name: "status",
		  options: [
			"In Stock",
			"Out of Stock",
			"Reserved",
			"On Order",
			"In Transit",
			"Backordered",
			"Pending",
			"Damaged",
			"Quarantined",
			"Returned",
			"Ready for Dispatch",
			"Under Maintenance",
			"Expired",
			"On Hold",
			"Sold",
			"Recalled",
			"Available for Allocation",
		  ],
		},
		{
		  label: "Description",
		  type: "textarea",
		  id: "description",
		  name: "description",
		  placeholder: "Enter Description",
		},
	  ];

	const [formValues, setFormValues] = useState({
		inventoryName: existingData.inventoryName || "",
		type: existingData.type || "",
		category: existingData.category || "",
		quantity: existingData.quantity || "",
		unitPrice: existingData.unitPrice || "",
		status: existingData.status || "",
		description: existingData.description || "",
	});

	useEffect(() => {
		setFormValues({
			inventoryName: existingData.inventoryName,
			type: existingData.type,
			category: existingData.category,
			quantity: existingData.quantity,
			unitPrice: existingData.unitPrice,
			status: existingData.status,
			description: existingData.description,
		});
	}, [existingData]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			...formValues,
		};

		try {
			if (
				!formData.inventoryName || !formData.type || !formData.category || !formData.quantity || !formData.unitPrice 
				|| !formData.status || !formData.description
			)
				throw new Error("All fields must be filled out.");

			const response = await PostRequest(`update-inventory/${inventoryId}`, formData);
			if (!response) throw new Error("Error Updating Inventory");

			setShowEdited(true);
			setTimeout(() => {
				setShowEdited(false);
				navigate('/home/inventory');
			}, 3000)
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const onClose = () => {
		navigate(-1);
	};

	return (
		<div>
			<CreateInterface
				mainText={`Edit Inventory: ${inventoryId}`}
				formInput={inventoryInput}
				formValues={formValues}
				inputChange={handleInputChange}
				onClose={onClose}
				onSubmit={handleSubmit}
				buttonText="Update"
			/>
			{showEdited && (
				<ConfirmEdited 
				subText="The inventory item has been successfully edited."
				close = {() => navigate('/home/inventory')}
				/>
			)}
		</div>
	);
}

export default EditInventory;