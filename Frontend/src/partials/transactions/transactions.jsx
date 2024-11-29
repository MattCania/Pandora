import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Transactions() {
	const navigate = useNavigate()
	const { transactions, recordId } = useParams
	const [data, setData] = useState([])

	if (transactions !== 'expenses' && transactions !== 'purchases') navigate(-1)

	const fetchTransactions = async () => {
		try {
			if (!transactions || !recordId) return
			const records = await GetData(`get-${user.session.userId}/${recordId}`)
			if (!records) throw new Error("Transactions Null or Undefined")
			console.log(records)
			setData(records)
		} catch (error) {
			console.error("Error fetching data:", error);
		}

	}

	useEffect(() => {
		fetchTransactions();
	}, [transactions, recordId])



	return (
		<section>



		</section>
	)
}


export default Transactions