import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './records.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import PostRequest from "../../hooks/PostRequest";
import GetSession from "../../hooks/GetSession";
import GetData from '../../hooks/GetData';
import CreatedPrompt from '../../components/prompts/createdPrompt';

function CreateRecords() {
	const navigate = useNavigate();
	const [userPermissions, setUserPermissions] = useState({});
	const [usernames, setUsernames] = useState([]);
	const [errors, setErrors] = useState({});
	const user = GetSession();
	const [isAuth, setAuth] = useState(false);
	const [showConfirmed, setShowConfirmed] = useState(false);

	useEffect(() => {
		if (user) {
			setAuth(true);
		} else {
			setAuth(false);
		}
	}, [user]);

	useEffect(() => {
		const fetchUsernames = async () => {
			try {
				const usernames = await GetData('get-profiles');
				setUsernames(usernames || []);
			} catch (err) {
				console.error('Fetching Usernames', err);
			}
		};

		fetchUsernames();
	}, []);

	const handlePermissionChange = (username, newPermission) => {
		setUserPermissions((prev) => ({
			...prev,
			[username]: newPermission,
		}));
	};

	const handleAddUser = (event) => {
		const selectedUser = event.target.value;
		if (selectedUser && !userPermissions[selectedUser]) {
			setUserPermissions((prev) => ({
				...prev,
				[selectedUser]: 4,
			}));
		}
	};

	const handleRemoveUser = (removedUser) => {
		setUserPermissions((prevPermissions) => {
			const updatedPermissions = { ...prevPermissions };
			delete updatedPermissions[removedUser];
			return updatedPermissions;
		});
	};

	const [formValues, setFormValues] = useState({
		recordType: "",
		recordName: ""
	});

	const validateFields = () => {
		const newErrors = {};
		if (!formValues.recordType) {
			newErrors.recordType = "Please select a record type.";
		}
		if (!formValues.recordName.trim()) {
			newErrors.recordName = "Record name cannot be empty.";
		}
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
			[name]: undefined, // Clear error for the field being edited
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateFields()) {
			return;
		}

		const formData = {
			...formValues,
			...(userPermissions && { userPermissions })
		};

		try {
			const response = await PostRequest("create-record", formData);
			if (!response) {
				throw new Error("Error during creation");
			}
			setShowConfirmed(true);
			setTimeout(() => {
				setShowConfirmed(false);
				navigate('/home/records');
			}, 3000);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		user && (
			<section className={styles.blur}>
				<section className={styles.createSection}>
					<div className={styles.buttonDiv}>
						<button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faXmark} /></button>
					</div>
					<div className={styles.container}>
						<form className={styles.createForm} onSubmit={handleSubmit}>
							<h1>New Record</h1>
							<div className={styles.recordType}>
								<select
									name="recordType"
									id="recordType"
									value={formValues.recordType}
									onChange={handleInputChange}
									className={errors.recordType ? styles.inputError : ""}
								>
									<option value="" disabled>{errors.recordType || "Record Type"}</option>
									<option value="Expenses">Expenses</option>
									<option value="Purchases">Purchases</option>
								</select>
							</div>
							<input
								type="text"
								name="recordName"
								id="recordName"
								value={formValues.recordName}
								onChange={handleInputChange}
								placeholder={errors.recordName || "Record Name"}
								className={errors.recordName ? styles.inputError : ""}
							/>

							<select name="usernames" defaultValue="" id="usernames" onChange={handleAddUser}>
								<option value="" disabled>Add User</option>
								{usernames?.map((option, index) => (
									user.session.username !== option.userName && !userPermissions[option.userName] && (
										<option key={index} value={option.userName}>
											{option.userName}
										</option>
									)
								))}
							</select>
							<input type="submit" value="Create Record" />
						</form>
						<section className={styles.userSection}>
							<h1>Permitted Users</h1>
							{Object.entries(userPermissions).map(([username, permission], index) => (
								<div key={index} className={styles.permissionTable}>
									<div>{username}</div>
									<div className={styles.permissionTab}>
										<select
											name="permission"
											id="permission"
											value={permission}
											onChange={(e) => handlePermissionChange(username, e.target.value)}
										>
											<option value={1}>Admin</option>
											<option value={3}>Editor</option>
											<option value={4}>Viewer</option>
										</select>
										<button onClick={() => handleRemoveUser(username)}>
											<FontAwesomeIcon icon={faTrashCan} />
										</button>
									</div>
								</div>
							))}
						</section>
					</div>

					{showConfirmed && (
						<CreatedPrompt
							subText="The record has been successfully created"
							close={() => navigate('/home/records')}
						/>
					)}
				</section>
			</section>
		)
	);
}

export default CreateRecords;
