import React, { useState, useEffect, useContext } from "react";
import SubHeader from "../../components/overviews/subheader";
import { useNavigate, Link, useParams } from "react-router-dom";
import styles from './records.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import GetData from "../../hooks/GetData";
// import { SessionContext } from "../../pages/home/home";
import Loading from "../loading/loading";

function EditRecords() {
    const navigate = useNavigate();
	const {recordId} = useParams()

	const [formValues, setFormValues] = useState({
		recordType: '',
		recordName: '',
	});

	// const record = GetData(`/edit-record/${recordId}`);
	
	// if (!record){
	// 	return <Loading/>
	// }
	useEffect(() => {
		fetch(`/api/edit-record/${recordId}`)
		  .then((response) => response.json())
		  .then((data) => {
			// Populate formData with the fetched record's data
			setFormValues(data);
		  })
		  .catch((error) => {
			console.error('Error fetching record:', error);
		  });
	  }, [recordId]);


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
			const response = await fetch(`/api/update-record/${recordId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
				credentials: "include",
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Unknown error occurred");
			  }

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
				<h1>Update Record #{recordId}</h1>
				<div className={styles.recordType}>
					<select name="recordType" id="recordType" value={formValues.recordType} onChange={handleInputChange}>
						<option value="" disabled>Record Type</option>
						<option value="Expenses">Expneses</option>
						<option value="Purchases">Purchases</option>
					</select>
				</div>
				<input type="text" name="recordName" id="recordName" value={formValues.recordName} onChange={handleInputChange} placeholder="Record Name" />

				<input type="submit" value="Update Record"/>
			</form>

		</section>
	)

}

export default EditRecords