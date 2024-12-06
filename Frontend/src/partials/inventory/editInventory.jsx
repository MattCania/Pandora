import { useParams, useNavigate } from "react-router-dom";
import CreateInterface from "../../components/interface/createInterface";
import { useEffect, useState } from "react";
import PostRequest from "../../hooks/PostRequest";
import GetData from "../../hooks/GetData";

function EditInventory() {
	const navigate = useNavigate();
	const { inventoryId } = useParams();

	const [existingData, setExistingData] = useState({ results: {} });

	if (!inventoryId) return <h1>Loading...</h1>;

	const fetchInventoryInfo = async () => {
		try {
			const result = await GetData(`inventory/open/${inventoryId}`);
			if (!result) throw new Error("Error Getting Inventory Data");
			console.log(result);
			setExistingData(result);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		fetchInventoryInfo();
	}, []);

	if (!existingData) return <h1>Loading...</h1>;

	console.log("Existing Inventory Data:", existingData);

	const inventoryInput = [
		{
			label: "Inventory Name",
			type: "text",
			id: "inventoryName",
			name: "inventoryName",
			placeholder: "Enter Inventory Name",
		},
		{
			label: "Category",
			type: "text",
			id: "category",
			name: "category",
			placeholder: "Enter Category",
		},
		{
			label: "Quantity",
			type: "number",
			id: "quantity",
			name: "quantity",
			placeholder: "Enter Quantity",
		},
		{
			label: "Minimum Quantity",
			type: "number",
			id: "minQty",
			name: "minQty",
			placeholder: "Enter Minimum Quantity",
		},
		{
			label: "Unit Price",
			type: "number",
			id: "unitPrice",
			name: "unitPrice",
			placeholder: "Enter Unit Price",
		},
		{
			label: "Supplier",
			type: "text",
			id: "supplier",
			name: "supplier",
			placeholder: "Enter Supplier Name",
		},
		{
			label: "Location",
			type: "text",
			id: "location",
			name: "location",
			placeholder: "Enter Location",
		},
		{
			label: "Status",
			type: "text",
			id: "status",
			name: "status",
			placeholder: "Enter Status",
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
		category: existingData.category || "",
		quantity: existingData.quantity || "",
		minQty: existingData.minQty || "",
		unitPrice: existingData.unitPrice || "",
		supplier: existingData.supplier || "",
		location: existingData.location || "",
		status: existingData.status || "",
		description: existingData.description || "",
	});

	useEffect(() => {
		setFormValues({
			inventoryName: existingData.inventoryName,
			category: existingData.category,
			quantity: existingData.quantity,
			minQty: existingData.minQty,
			unitPrice: existingData.unitPrice,
			supplier: existingData.supplier,
			location: existingData.location,
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
				!formData.inventoryName || !formData.category || !formData.quantity ||
				!formData.minQty || !formData.unitPrice || !formData.supplier ||
				!formData.location || !formData.status || !formData.description
			)
				throw new Error("All fields must be filled out.");

			const response = await PostRequest(`update-inventory/${inventoryId}`, formData);
			if (!response) throw new Error("Error Updating Inventory");

			navigate('/home/inventory');
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
		</div>
	);
}

export default EditInventory;