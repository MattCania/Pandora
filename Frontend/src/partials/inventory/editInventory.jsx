import React, { useState, useEffect, useContext } from "react";
import SubHeader from "../../components/overviews/subheader";
import { useNavigate, Link, useParams } from "react-router-dom";
import styles from './inventory.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import GetData from "../../hooks/GetData";
// import { SessionContext } from "../../pages/home/home";
import Loading from "../loading/loading";
import PostRequest from "../../hooks/PostRequest";
import GetSession from "../../hooks/GetSession";
import Error from "../../components/error/error";


function EditRecords() {
	const navigate = useNavigate();
	const { recordId } = useParams()
	const user = GetSession()
	const [isAuth, setAuth] = useState(false);

	useEffect(() => {
		if (user) {
			setAuth(true);
		} else {
			setAuth(false);
		}
	}, [user]);

	const [formValues, setFormValues] = useState({
		recordType: '',
		recordName: '',
	});

	// const record = GetData(`/edit-record/${recordId}`);

	// if (!record){
	// 	return <Loading/>
	// }
	useEffect(() => {
		const fetchRecord = async () => {
			try {
				const data = await GetData(`records/open/${recordId}`)
				if (!data) throw new Error("Fetching Error")
				setFormValues(data)
			}
			catch (err) {
				return
			}
		}
		fetchRecord()
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
			const response = await PostRequest(`update-record/${recordId}`, formData)
			if (!response) throw new Error("Updating Data Error");
			navigate(-1)
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		user && 
		<section className={styles.blur}>

			<section className={styles.createSection}>

				<div className={styles.buttonDiv}>
					<button type="button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faXmark} /></button>
				</div>

				<div className={styles.container}>

					<form className={styles.createForm} onSubmit={handleSubmit}>
						<h1>Update Record #{recordId}</h1>
						<div className={styles.recordType}>
							<select name="recordType" id="recordType" value={formValues.recordType} onChange={handleInputChange}>
								<option value="" disabled>Record Type</option>
								<option value="Expenses">Expneses</option>
								<option value="Purchases">Purchases</option>
							</select>
						</div>
						<input type="text" name="recordName" id="recordName" value={formValues.recordName} onChange={handleInputChange} placeholder="Record Name" />
						<input type="submit" value="Update Record" />
					</form>

					<section className={styles.userSection}>

					</section>
				</div>
			</section>
		</section>
	)

}

export default EditRecords