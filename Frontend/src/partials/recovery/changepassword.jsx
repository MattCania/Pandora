import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ChangePassword() {
	const navigate = useNavigate()
	const { email } = useParams()
	// Defaultform Values
	const [formValues, setFormValues] = useState({ password: "", confirmpassword: "" });

	// Password Visibility Function
	const [visible, setVisible] = useState(false);

	const setVisibility = () => {
		setVisible((visible) => !visible)
	}

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
		} catch (error) {
			console.error("Error:", error)
		}
	}

	return (
		<>
		<form>
			<h1>New Password</h1>
			<input type={visible ? "text" : "password"} name="password" id="password" placeholder="Password" onChange={handleInputChange} />
			<input type={visible ? "text" : "password"} name="confirmpassword" id="confirmpassword" placeholder="Confirm Password" onChange={handleInputChange} />
			<button type="button" onClick={setVisibility}>SetVisibility: {!visible}</button>

			<input type="submit" value="submit" onClick={handleSubmit} />
		</form>
		</>

	)
}

export default ChangePassword;