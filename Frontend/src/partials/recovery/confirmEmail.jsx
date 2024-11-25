import { useEffect, useState, useRef } from "react";
import { redirect, useNavigate } from "react-router-dom";

function ConfirmEmail() {
	const navigate = useNavigate()
	const [showPrompt, setShowPrompt] = useState(false);
	const [errMessage, setError] = useState(null)
	const timeoutRef = useRef(null)
	// Defaultform Values
	const [formValues, setFormValues] = useState({ email: "" });

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}))
	}

	const storeSensitiveData = (email) => {
	  sessionStorage.setItem("email", email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = {
			...formValues,
		}

		try {
			const response = await fetch("/api/account-confirmation", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			})

			if (!response.ok) throw new Error("Invalid Account Input")
			console.log("Successfully Confirmed Email")
			storeSensitiveData(formData.email)
			navigate(`new-password`)

		} catch (error) {
			setError(error.message)
			setShowPrompt(true);
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
		<>
			{showPrompt && <p style={{color: 'red', fontWeight: 'bold', margin: '0'}}>{errMessage}</p>}
			<form>
				<h4>Recover Account</h4>
				<input type="email" name="email" id="email" placeholder="Email" onChange={handleInputChange} required/>

				<input type="submit" value="Continue" onClick={handleSubmit} />
			</form>
		</>

	)
}

export default ConfirmEmail;