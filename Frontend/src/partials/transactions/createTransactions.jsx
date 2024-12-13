import { useParams, useNavigate } from "react-router-dom";
import CreateInterface from "../../components/interface/createInterface";
import { useState } from "react";
import PostRequest from "../../hooks/PostRequest";
import CreatedPrompt from "../../components/prompts/createdPrompt";

function CreateTransactions() {
	const navigate = useNavigate();
	const { transaction, recordId } = useParams();
	const [showCreated, setShowCreated] = useState(false);
	const [errors, setErrors] = useState({}); // To track errors for fields

	if (!transaction || !recordId) return <h1>Loading...</h1>;

	const transactionInput = [
		{
			label: "Account",
			type: "select",
			id: "account",
			name: "account",
			options: ["Revenue", "Expenses", "Equity", "Assets", "Liabilities"],
		},
		{
			label: "Recurring",
			type: "select",
			id: "recurring",
			name: "recurring",
			options: ["Monthly", "Semi-Monthly", "Quarterly", "Annually"],
		},
		{
			label: "Payment Type",
			type: "select",
			id: "paymentType",
			name: "paymentType",
			options: ["Cash", "Credit Card", "Bank Transfer", "Digital Wallet", "Check"],
		},
		{
			label: "Transaction Date",
			type: "datetime-local",
			id: "transactionDate",
			name: "transactionDate",
		},
		{
			label: "Amount",
			type: "number",
			id: "amount",
			name: "amount",
			placeholder: "Enter Amount",
		},
		{
			label: "Vendor/Customer",
			type: "text",
			id: "vendorCustomer",
			name: "vendorCustomer",
			placeholder: "Enter Vendor/Customer Name",
		},
		{
			label: "Invoice Number",
			type: "text",
			id: "invoiceNumber",
			name: "invoiceNumber",
			placeholder: "Enter Invoice Number",
		},
		{
			label: "Tax",
			type: "number",
			id: "tax",
			name: "tax",
			placeholder: "Enter Tax Amount",
		},
		{
			label: "Status",
			type: "select",
			id: "status",
			name: "status",
			options: ["Completed", "Pending", "Incomplete", "Cancelled"],
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
		account: "",
		paymentType: "",
		transactionDate: "",
		description: "",
		amount: "",
		vendorCustomer: "",
		invoiceNumber: "",
		tax: 0,
		status: "",
	});

	const validateFields = () => {
		const newErrors = {};
		if (!formValues.account) newErrors.account = "Account is required.";
		if (!formValues.paymentType) newErrors.paymentType = "Payment type is required.";
		if (!formValues.description) newErrors.description = "Description cannot be empty.";
		if (!formValues.amount || formValues.amount <= 0) newErrors.amount = "Amount must be greater than zero.";
		if (!formValues.vendorCustomer) newErrors.vendorCustomer = "Vendor/Customer name is required.";
		if (!formValues.invoiceNumber) newErrors.invoiceNumber = "Invoice number is required.";
		if (!formValues.status) newErrors.status = "Transaction status is required.";
		if (!formValues.tax || formValues.tax < 0) newErrors.tax = "Tax must be a valid number.";
		if (!formValues.transactionDate) newErrors.transactionDate = "Transaction date is required.";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: undefined, 
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateFields()) {
			return;
		}

		const formData = { ...formValues };

		try {
			const response = await PostRequest(`create-${transaction.slice(0, -1)}/${recordId}`, formData);
			console.log(response)
			if (!response) throw new Error("Error in creating transaction");

			setShowCreated(true);
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
				mainText={`Create ${transaction}`}
				subText={`Record ${recordId}`}
				formInput={transactionInput}
				formValues={formValues}
				inputChange={handleInputChange}
				errors={errors} 
				onClose={onClose}
				onSubmit={handleSubmit}
			/>
			{showCreated && (
				<CreatedPrompt
					subText="The transaction has been successfully created!"
					close = {() =>  {navigate(-1); setShowEdited(false)}}
				/>
			)}
		</div>
	);
}

export default CreateTransactions;
