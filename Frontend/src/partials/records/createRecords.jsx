import React, { useState, useEffect, useContext } from "react";
import SubHeader from "../../components/overviews/subheader";
import { useNavigate, Link } from "react-router-dom";
import styles from './records.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PostRequest from "../../hooks/PostRequest";
import CreateInterface from "../../components/interface/createInterface";

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
			if (!formData.recordType || !formData.recordName) throw new Error ("Please Input a record type")
			console.log(formData.recordType)
			const response = await PostRequest("create-record", formData)
			if (!response) throw new Error("Error Creation")
			navigate('/home/records')
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const cancel = () => {
		navigate('/home/records')
	}

	
	const recordInput = [
		{
			label: "Record Type",
			type: "select",
			id: "recordType",
			name: "recordType",
			value: formValues.recordType,
			options: ["Expenses", "Purchases"],
		},
		{
			label: "Record Name",
			type: "text",
			id: "recordName",
			name: "recordName",
			placeholder: "Enter Order Number",
		},
	]
	return (
		<CreateInterface 
		mainText={"Creating new Record"} 
		formInput={recordInput}  
		formValues={formValues}
		inputChange={handleInputChange} 
		onSubmit={handleSubmit} 
		onClose={cancel}/>
	)
	

}

export default CreateRecords