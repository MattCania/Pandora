import { useParams, useNavigate } from "react-router-dom";
import CreateInterface from "../../components/interface/createInterface";
import { useEffect, useState } from "react";
import PostRequest from "../../hooks/PostRequest";
import GetData from "../../hooks/GetData";
import PutRequest from "../../hooks/PutRequest";
import ConfirmEdited from "../../components/prompts/confirmEdited";

function EditTransactions() {
	const navigate = useNavigate()
	const {transaction, transactionId} = useParams()
	const [existingData, setExistingData] = useState({ results: {} })
	const [showEdited, setShowEdited] = useState(false);

	if (!transaction || !transactionId) return <h1>Loading...</h1>

	const fetchTransactionInfo = async () => {
		try{
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
			value: existingData.results.category,
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
			label: "Credit",
			type: "number",
			id: "credit",
			name: "credit",
			placeholder: "Enter Credit Amount",
		},
		{
			label: "Debit",
			type: "number",
			id: "debit",
			name: "debit",
			placeholder: "Enter Debit Amount",
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
		orderNumber: existingData.orderNumber || "",
		account: existingData.account || "",
		category: existingData.category || "",
		paymentType: existingData.paymentType || "",
		transactionDate: existingData.transactionDate || "",
		description: existingData.description || "",
		amount: existingData.amount || "",
		credit: existingData.credit || "",
		debit: existingData.debit || "",
		currency: existingData.currency || "",
		vendorCustomer: existingData.vendorCustomer || "",
		invoiceNumber: existingData.invoiceNumber || "",
		tax: existingData.tax || "",
		balance: existingData.balance || "",
	});


	useEffect(() => {
		setFormValues({
			orderNumber: existingData.results.orderNumber ,
			account: existingData.results.account ,
			category: existingData.results.category ,
			paymentType: existingData.results.paymentType ,
			transactionDate: existingData.results.transactionDate 
            ? new Date(existingData.results.transactionDate).toISOString().slice(0, 16) // Format for datetime-local
            : "",
			description: existingData.results.description ,
			amount: existingData.results.amount ,
			credit: existingData.results.credit ,
			debit: existingData.results.debit ,
			currency: existingData.results.currency ,
			vendorCustomer: existingData.results.vendorCustomer ,
			invoiceNumber: existingData.results.invoiceNumber ,
			tax: existingData.results.tax ,
			balance: existingData.results.balance ,
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
				!formData.orderNumber || !formData.account || !formData.category || !formData.paymentType ||
				!formData.transactionDate || !formData.description || !formData.amount || !formData.currency ||
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
		navigate(-1)
	}

	return(
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
				close = {() =>  navigate(`/home/records/${transaction}/${transactionId}`)} />
			)}	
		</div>
	)

}

export default EditTransactions