import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Prompt from "../../components/prompt/prompt";

function ChangePassword() {
	const navigate = useNavigate()
	const email = sessionStorage.getItem("email")

	if (!email) navigate('/login')
	
	// Prompt Functions
	const [showPrompt, setShowPrompt] = useState(false);
	const [errMessage, setError] = useState(null)
	const timeoutRef = useRef(null)

	// Defaultform Values
	const [formValues, setFormValues] = useState({ password: "", confirmpassword: "" });

	// Password Visibility Function
	const [passVisible, setPassVisible] = useState(false);
	const [confirmVisible, setConfirmVisible] = useState(false);

	const togglePassVisibility = () => {
		setPassVisible(prev => !prev);
	};

	const toggleConfirmVisibility = () => {
		setConfirmVisible(prev => !prev);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()


		const formData = {
			...formValues,
		}

		try {
			if (formData.password !== formData.confirmpassword) throw new Error("New Password Mismatch")
			if (formData.password.length === 0 || formData.confirmpassword.length === 0) throw new Error("Invalid Input")
			const response = await fetch(`/api/recover-email/${email}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			})

			if (!response.ok) throw new Error("Account Recovery Failure")
			console.log("Successful Password Change")
			sessionStorage.removeItem("email");
			navigate('/login')
		} catch (error) {
			setError(error.message)
			setShowPrompt(true)
			console.error("Error:", error)
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				setShowPrompt(false);
			}, 2000);
		}
	}

	return (
		<form>
			{showPrompt && <p style={{color: 'red', fontWeight: 'bold', margin: '0'}}>{errMessage}</p>}
			<h4>Enter New Password</h4>
			<div>
				<input type={passVisible ? "text" : "password"} name="password" id="password" placeholder="Password" onChange={handleInputChange} required/>
				<button type="button" onClick={togglePassVisibility}>
					{passVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
				</button>
			</div>
			<div>
				<input type={confirmVisible ? "text" : "password"} name="confirmpassword" id="confirmpassword" placeholder="Password" onChange={handleInputChange} required/>
				<button type="button" onClick={toggleConfirmVisibility}>
					{confirmVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
				</button>
			</div>

			<input type="submit" value="Change Password" onClick={handleSubmit} />
		</form>

	)
}

export default ChangePassword;