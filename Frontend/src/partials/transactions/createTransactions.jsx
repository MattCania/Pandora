import { useParams, useNavigate } from "react-router-dom";
import CreateInterface from "../../components/interface/createInterface";
import { useEffect, useState } from "react";
import PostRequest from "../../hooks/PostRequest";
import CreatedPrompt from "../../components/prompts/createdPrompt";

function CreateTransactions() {
	const navigate = useNavigate()
	const {transaction, recordId} = useParams()
	const [showCreated, setShowCreated] = useState(false);

	if (!transaction || !recordId) return <h1>Loading...</h1>
	
	const transactionInput = [
		{
			label: "Order Number",
			type: "text",
			id: "orderNumber",
			name: "orderNumber",
			placeholder: "Enter Order Number",
		},
		{
			label: "Account",
			type: "select",
			id: "account",
			name: "account",
			options: ["Revenue", "Expenses", "Equity", "Assets", "Liabilities"], // For dropdown
		},
		{
			label: "Category",
			type: "select",
			id: "category",
			name: "category",
			options: ["Income", "Expense", "Asset", "Liability", "Equity"], // For dropdown
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
			type: "select",
			id: "currency",
			name: "currency",
			options: ["PHP","USD","EUR","GBP","JPY","AUD","CAD","CHF","CNY","INR","SGD","HKD","NZD","ZAR","BRL","RUB","MXN","KRW","AED","SEK","NOK","DKK","THB","IDR","TRY","SAR","MYR","PLN","ILS","VND","CLP","COP"],
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
			label: "Balance",
			type: "number",
			id: "balance",
			name: "balance",
			placeholder: "Enter Balance Amount",
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
		orderNumber: "",
		account: "",
		category: "",
		paymentType: "",
		transactionDate: "",
		description: "",
		amount: "",
		credit: "",
		debit: "",
		currency: "",
		vendorCustomer: "",
		invoiceNumber: "",
		tax: "",
		balance: "",
	});

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
				!formData.orderNumber || !formData.account || !formData.category || !formData.paymentType ||
				!formData.transactionDate || !formData.description || !formData.amount || !formData.currency ||
				!formData.vendorCustomer || !formData.invoiceNumber
			) throw new Error("All fields must be filled out.");
			
			const response = await PostRequest(`create-${transaction.slice(0, -1)}/${recordId}`, formData)
			if (!response) throw new Error("Error Creation of Transaction")
			setShowCreated(true)
			setTimeout(() => {
				setShowCreated(false)
				navigate(`/home/records/${transaction}/${recordId}`)
			}, 3000)
		} catch (error) {
			console.error("Error:", error);
		}

	};

	const onClose = () => {
		navigate(-1)
	}

	return(
		<div>
			<CreateInterface 
				mainText={`Create ${transaction}`} 
				subText={`Record ${recordId}`} 
				formInput={transactionInput}
				formValues={formValues}
				inputChange={handleInputChange}
				onClose={onClose}
				onSubmit={handleSubmit}
			/>
			{showCreated && (
				<CreatedPrompt
				subText = "The transaction has been succefully created!"
				close = {() => navigate(`/home/records/${transaction}/${recordId}`)} />
			)}
		</div>
	)

}

export default CreateTransactions