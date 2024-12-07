import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import GetSession from "../../hooks/GetSession"
import styles from './login.module.css'
import Logo from '/src/assets/MainLogo.svg'

import Loading from "../loading/loading";
import PostRequest from "../../hooks/PostRequest";

function Login() {
	const navigate = useNavigate()
	const [isAuth, setAuth] = useState(false)
	const user = GetSession()

	// if (!user) return <Loading/>

	sessionStorage.clear()

	// Prompt
	const [showPrompt, setShowPrompt] = useState(false);
	const [errMessage, setError] = useState(null)
	const timeoutRef = useRef(null);

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
			const response = await PostRequest("/login", formData)

			if (!response) throw new Error("Invalid Credentials")
			navigate('/home')
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
		<section className={styles.section}>
			<div className={styles.leftImage}></div>

			<div className={styles.middleSection}>
				<a href="/landing">
					<img className={styles.formLogo} src={Logo} alt="" draggable="false" />
				</a>
				<form className={styles.form}>

					{showPrompt && <p style={{ color: 'red', fontWeight: 'bold', margin: '0' }}>{errMessage}</p>}
					<h3>Log In Account</h3>
					
					<input type="email" name="email" id="email" placeholder="Email" onChange={handleInputChange} required />

					<div className={styles.passwordDiv}>
						<input type={visible ? "text" : "password"} name="password" id="password" placeholder="Password" onChange={handleInputChange} required />
						<button type="button" onClick={setVisibility}>
							{visible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
						</button>
					</div>


					<input type="submit" value="Log In" onClick={handleSubmit} />
				</form>
				<div className={styles.accountOptions}>
					<a href="/register">Dont have an Account?</a>
					<a href="/recovery">Forgot Password?</a>
				</div>
				{/* {user && <a href="/login">`User ${user.username} Already Logged in?`</a>} */}
			</div>

			<div className={styles.rightImage}></div>
		</section>
	)
}

export default Login;