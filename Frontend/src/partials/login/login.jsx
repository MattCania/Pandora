import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetSession from "../../hooks/GetSession"

function Login() {
	const navigate = useNavigate()
	const [isAuth, setAuth] = useState(false)
	const user = GetSession()

	// Authenticate if already logged in
	useEffect(() => {
		if (user) {
			setAuth(true);
		} else {
			setAuth(false);
		}
	}, [user]);

	// Defaultform Values
	const [formValues, setFormValues] = useState({ email: "", password: "" });

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
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			})

			if (response.ok) {
				alert("Login Successful")
				navigate('/home')
			} else {
				alert("Login Unsuccessful")
			}
		} catch (error) {
			console.error("Error:", error)
		}
	}

	return (
		<>
		{isAuth && <a href="/home">User Already Logged In</a> }
		<form>
			<h1>Log In</h1>
			<input type="email" name="email" id="email" placeholder="Email" onChange={handleInputChange} />
			<input type={visible ? "text" : "password"} name="password" id="password" placeholder="Password" onChange={handleInputChange} />
			<button type="button" onClick={setVisibility}>SetVisibility: {!visible}</button>

			<input type="submit" value="submit" onClick={handleSubmit} />
		</form>
		</>

	)
}

export default Login;