
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Confirmation() {
	const navigate = useNavigate()

	// Defaultform Values
	const [formValues, setFormValues] = useState({ email: ""});

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
			const response = await fetch("/api/account-confirmation", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			})

			if (!response.ok) throw new Error("Error Confirming Account")
				navigate(`/change-password/${formData.email}`)

		} catch (error) {
			console.error("Error:", error)
		}
	}

	return (
		<>
		<form>
			<h1>Enter Recovery Email</h1>
			<input type="email" name="email" id="email" placeholder="Email" onChange={handleInputChange} />

			<input type="submit" value="submit" onClick={handleSubmit} />
		</form>
		</>

	)
}

export default Confirmation;