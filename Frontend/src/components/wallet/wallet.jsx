import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import styles from './wallet.module.css'
import GetData from '../../hooks/GetData'
import PostRequest from '../../hooks/PostRequest'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import GetSession from "../../hooks/GetSession";

function Wallet() {
	const user = GetSession()
	const [editMode, toggleEditMode] = useState(false)

	const [walletInfo, setWalletInfo] = useState({
		recurrance: '', income: 0, wallet: 0
	})
	const [formValues, setFormValues] = useState({
		recurrance: walletInfo?.recurrance, income: walletInfo?.income, wallet: walletInfo?.wallet,
	})


	const fetchWallet = async () => {
		try {
			const wallet = await GetData('user-wallet')
			if (!wallet || wallet.length === 0) throw new Error('User Wallet Does Not Exist')
			console.log(wallet.result)
			setWalletInfo(wallet.result)
			setFormValues(wallet.result)

		} catch (error) {
			console.log(error)
			return;
		}
	}

	useEffect(() => {
		fetchWallet()
	}, [])


	const toggleModes = () => {
		toggleEditMode(editMode => !editMode)
	}

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
		}

		try {
			const response = await PostRequest("update-wallet", formData);

			if (!response) throw new Error("Error Updating Profile");
			
			toggleModes()
			fetchWallet()
		} catch (error) {
			console.error("Error:", error.message);
		}
	};

	return (
		user &&
		<div className={styles.walletContainer}>
			<div className={styles.selectDiv}>
				<label htmlFor="recurrance">Income Rate</label>
				<select name="recurrance" id="recurrance" value={formValues.recurrance} disabled={editMode ? false : true} onChange={handleInputChange}>
					<option value="Semi-Monthly">Semi-Monthly</option>
					<option value="Monthly">Monthly</option>
					<option value="Quarterly">Quarterly</option>
					<option value="Annually">Annually</option>
				</select>
			</div>
			<div className={styles.money}>
				<label htmlFor="income">Income</label>
				<span>
				{user.profile.currency}
				<input
					type="number"
					id="income"
					name="income"
					value={formValues.income}
					readOnly={!editMode}
					onChange={handleInputChange}
				/>
					</span>
			</div>
			<div className={styles.money}>
				<label htmlFor="wallet">Wallet</label>
				<span>
				{user.profile.currency}
				<input
					type="number"
					id="wallet"
					name="wallet"
					value={formValues.wallet}
					readOnly={!editMode}
					onChange={handleInputChange}
				/>
				</span>

			</div>
			<div className={styles.buttonDiv}>
				<button onClick={editMode ? handleSubmit : toggleModes} className={editMode ? styles.active : null}>
					{editMode ? 'Save' : 'Edit'}
				</button>
			</div>
		</div>

	)

}

export default Wallet