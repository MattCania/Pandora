import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import GetData from '../../hooks/GetData'
import SubHeader from "../../components/overviews/subheader";
import Error from "../../components/error/error";

function Test() {
	let { transaction, transactionId} = useParams()

	if (!transaction) transaction = 'expense'
	if (!transactionId) transaction = 5

	const [transactionData, setTransactionData] = useState([])

	console.log((`get-${transaction}Transaction/${transactionId}`))
	const fetchTransactionData = async () => {

		try {
			const result = await GetData(`get-${transaction}Transaction/${transactionId}`)

			if (!result) throw new Error("Error Fetching transaction")
			
			console.log(result)
			setTransactionData(result)
		} catch (error) {
			console.error(error)
			return
		}

	}

	useEffect(() => {
		fetchTransactionData()
	}, [])


	return (
		<section>

		{transactionData.map((data, index) => (
			<ul key={index}>
				<li>{data.amount}</li>

			</ul>
		))}
		</section>
	)
}

export default Test;
