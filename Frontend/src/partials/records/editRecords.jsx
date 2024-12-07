import React, { useState, useEffect, useContext } from "react";
import SubHeader from "../../components/overviews/subheader";
import { useNavigate, Link, useParams } from "react-router-dom";
import styles from './records.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
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
	const [userPermissions, setUserPermissions] = useState({})
	const [usernames, setUsernames] = useState([])
	const [existingUsers, setExistingUsers] = useState([])
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
	
	useEffect(() => {
		const fetchRecord = async () => {
			try {
				const data = await GetData(`records/open/${recordId}`)
				if (!data) throw new Error("Fetching Error")
					setFormValues(data)
			}
			catch (err) {
				console.error(err)
				return
			}
		}
		fetchRecord()
	}, [recordId]);


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

						<select name="usernames" defaultValue="" id="usernames" onChange={handleAddUser}>
							<option value="" disabled>
								Add User
							</option>
							{usernames?.map((option, index) => (
								user.session.username !== option.userName && !userPermissions[option.userName] && (
									<option key={index} value={option.userName}>
										{option.userName}
									</option>
								)
							))}
						</select>

						<input type="submit" value="Update Record" />
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
			</section>
		</section>
	)

}

export default EditRecords