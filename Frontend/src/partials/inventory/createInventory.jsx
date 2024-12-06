import React, { useState, useEffect, useContext } from "react";
import SubHeader from "../../components/overviews/subheader";
import { useNavigate, Link } from "react-router-dom";
import styles from './inventory.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import PostRequest from "../../hooks/PostRequest";
import CreateInterface from "../../components/interface/createInterface";
import GetSession from "../../hooks/GetSession";
import GetData from '../../hooks/GetData'
import Error from "../../components/error/error";

function CreateInventory() {
	const navigate = useNavigate();
	const [userPermissions, setUserPermissions] = useState([])
	const [usernames, setUsernames] = useState([])
	const user = GetSession()
	const [isAuth, setAuth] = useState(false);
	
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
				const usernames = await GetData('get-profiles')

				if (!usernames) {
					console.log('No username found')
					setUsernames([])
					return
				}

				setUsernames(usernames)
			}
			catch (err) {
				console.error('Fetching Usernames', err)
			}
		}

		fetchUsernames()
	}, [])

	const handleAddUser = (event) => {
		const selectedUser = event.target.value;
		if (selectedUser && !userPermissions.includes(selectedUser)) {
			setUserPermissions((prev) => [...prev, selectedUser]);
		}
	};

	const handleRemoveUser = (removedUser) => {
		setUserPermissions((prevPermissions) =>
			prevPermissions.filter((user) => user !== removedUser)
		);
	};

	const [formValues, setFormValues] = useState({
		inventoryName: "", description: ""
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
		const formData = {
			...formValues,
			...(userPermissions && { userPermissions: userPermissions })
		};

		try {
			if (!formData.recordType || !formData.recordName) throw new Error("Please Input a record type")
			console.log(formData.recordType)
			const response = await PostRequest("create-inventory", formData)
			if (!response) throw new Error("Error Creation")
			navigate('/home/inventory')
		} catch (error) {
			console.error("Error:", error);
		}
	};
	return (
		user && 
		<section className={styles.blur}>
			<section className={styles.createSection}>

				<div className={styles.buttonDiv}>
					<button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faXmark} /></button>
				</div>
				<div className={styles.container}>

					<form className={styles.createForm} onSubmit={handleSubmit}>
						<h1>New Inventory</h1>
						<input type="text" name="inventoryName" id="inventoryName" value={formValues.inventoryName} onChange={handleInputChange} placeholder="Inventory Name" />
						<textarea name="description" id="description" value={formValues.description} onChange={handleInputChange} placeholder="Description"></textarea>

						<select name="usernames" defaultValue="" id="usernames" onChange={handleAddUser}>
							<option value="" disabled>
								Add User
							</option>
							{usernames?.map((option, index) => (
								user.session.username !== option.userName && !userPermissions.includes(option.userName) &&
								<option key={index} value={option.userName}>
									{option.userName}
								</option>
							))}
						</select>
						<input type="submit" value="Create Record" />
					</form>
					<section className={styles.userSection}>
						<h1>Permitted Users</h1>
						{userPermissions.map((user, index) => (
							<div key={index} className={styles.permissionTable}>
								<div>{user}</div>
								<div>
									<button onClick={() => { handleRemoveUser(user) }}>
										<FontAwesomeIcon icon={faTrashCan} />
									</button>
								</div>
							</div>
						))}
					</section>
				</div>

			</section>
		</section>
	)


}

export default CreateInventory