import React, { useState, useEffect, useContext } from "react";
import SubHeader from "../../components/overviews/subheader";
import { useNavigate, Link } from "react-router-dom";
import styles from './records.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { SessionContext } from "../../pages/home/home";
// import Loading from "../loading/loading";

function CreateRecords() {
    const navigate = useNavigate();
	// const user = useContext(SessionContext)
	// if (!user) {
	// 	return (<Loading />)
	// }

	const [formValues, setFormValues] = useState({
		recordType: "", recordName: ""
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = { ...formValues };

		try {
			const response = await fetch("/api/create-record", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
				credentials: "include",
			});

			if (!response.ok) throw new Error("Error Creation")
			navigate(-1)

		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<section className={styles.blur}>
			
			<form className={styles.createForm} onSubmit={handleSubmit}>
				<div className={styles.buttonDiv}>
					<button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faXmark}/></button>
				</div>
				<h1>New Record</h1>
				<div className={styles.recordType}>
					<select name="recordType" id="recordType" value={formValues.recordType} onChange={handleInputChange}>
						<option value="" disabled>Record Type</option>
						<option value="Expenses">Expenses</option>
						<option value="Purchases">Purchases</option>
					</select>
				</div>
				<input type="text" name="recordName" id="recordName" value={formValues.recordName} onChange={handleInputChange} placeholder="Record Name" />

				<input type="submit" value="Create Record"/>
			</form>

		</section>
	)

}

export default CreateRecords

