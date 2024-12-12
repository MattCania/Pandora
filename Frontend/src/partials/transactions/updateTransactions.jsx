import { useParams, useNavigate } from "react-router-dom";
import CreateInterface from "../../components/interface/createInterface";
import { useEffect, useState } from "react";
import PostRequest from "../../hooks/PostRequest";
import GetData from "../../hooks/GetData";
import PutRequest from "../../hooks/PutRequest";
import ConfirmEdited from "../../components/prompts/confirmEdited";

function EditTransactions() {
	const navigate = useNavigate()
	const { transaction, transactionId, access } = useParams()
	const [existingData, setExistingData] = useState({ results: {} })
	const [showEdited, setShowEdited] = useState(false);

	if (!transaction || !transactionId) return <h1>Loading...</h1>

	const fetchTransactionInfo = async () => {
		try {
			const result = await GetData(`get-${transaction.toLowerCase()}Transaction/${transactionId}`)
			if (!result) throw new Error("Error Getting Data")
			console.log(result)
			setExistingData(result)
		}
		catch (error) {
			console.error("Error:", error);
		}

	}
	useEffect(() => {
		fetchTransactionInfo()
	}, [])


	if (!existingData) return <h1>Loading...</h1>
	console.log("Existing Data:", existingData)


	const transactionInput = [
		{
			label: "Account",
			type: "select",
			id: "account",
			name: "account",
			options: ["Revenue", "Expenses", "Equity", "Assets", "Liabilities"], // For dropdown
		},
		{
			label: "Payment Type",
			type: "select",
			id: "paymentType",
			name: "paymentType",
			options: ["Cash", "Credit Card", "Bank Transfer", "Digital Wallet", "Check"], // For dropdown
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
			label: "Currency",
			type: "text",
			id: "currency",
			name: "currency",
			placeholder: "Enter Currency (e.g., USD)",
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
			label: "Description",
			type: "textarea",
			id: "description",
			name: "description",
			placeholder: "Enter Description",
		},
		{
			label: "Status",
			type: 'select',
			id: 'status',
			name: 'status',
			options: ['Completed', 'Pending', 'Incompleted', 'Cancelled']
		}
	];

	const [formValues, setFormValues] = useState({
		account: existingData.account || "",
		paymentType: existingData.paymentType || "",
		transactionDate: existingData.transactionDate || "",
		description: existingData.description || "",
		amount: existingData.amount || 0.00,
		currency: existingData.currency || "",
		vendorCustomer: existingData.vendorCustomer || "",
		invoiceNumber: existingData.invoiceNumber || "",
		tax: existingData.tax || 0.00,
		status: existingData.status || "Completed"
	});


	useEffect(() => {
		setFormValues({
			account: existingData.results.account,
			paymentType: existingData.results.paymentType,
			transactionDate: existingData.results.transactionDate
				? new Date(existingData.results.transactionDate).toISOString().slice(0, 16) // Format for datetime-local
				: "",
			description: existingData.results.description,
			amount: existingData.results.amount,
			currency: existingData.results.currency,
			vendorCustomer: existingData.results.vendorCustomer,
			invoiceNumber: existingData.results.invoiceNumber,
			tax: existingData.results.tax,
			status: existingData.results.status
		});
	}, [existingData]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	// Example submit handler
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			...formValues,
		};

		try {
			if (
				!formData.account || !formData.paymentType ||
				!formData.transactionDate || !formData.description || formData.amount < 0 || !formData.currency ||
				!formData.vendorCustomer || !formData.invoiceNumber
			) throw new Error("All fields must be filled out.");

			const response = await PostRequest(`update-expense/${transactionId}`, formData)
			if (!response) throw new Error("Error Creation of Transaction")
			setShowEdited(true)
			setTimeout(() => {
				setShowEdited(false);
				navigate(`/home/records/${transaction}/${transactionIddId}`);
			}, 3000)
		} catch (error) {
			console.error("Error:", error);
		}

	};

	const onClose = () => {
		fetchTransactionInfo()
		navigate(`/home/records/${transaction}/${transactionIddId}`);
	}

	return (
		<div>
			<CreateInterface
				mainText={`Edit ${transaction} Transaction ${transactionId}`}
				formInput={transactionInput}
				formValues={formValues}
				inputChange={handleInputChange}
				onClose={onClose}
				onSubmit={handleSubmit}
				buttonText={'Update'}
			/>
			{showEdited && (
				<ConfirmEdited
				subText = "The transaction has been successfully edited!"
				close = {() =>  navigate(-2)} />
			)}	
		</div>
	)

}

export default EditTransactions