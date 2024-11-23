import { useEffect, useState } from "react";

function Register() {

	// Defaultform Values
	const [formValues, setFormValues] = useState({
		firstname: "", lastname: "",
		middlename: "", suffix: "",
		email: "", password: "",
		confirmpassword: "", username: "",
		contact: "", secondaryemail: "",
		jobtitle: "", organization: "",
		department: "", street: "",
		city: "", state: "",
		postal: "", birthday: "",
	  });

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
			const response = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
				credentials: "include",
			})

			if (response.ok) {
				alert("Registration Successful")
			} else {
				alert("Registration Unsuccessful")
			}
		} catch (error) {
			console.error("Error:", error)
		}
	}

	return (
	<form>
		<h1>Required</h1>
		<input type="text" name="firstname" id="firstname" placeholder="First Name"onChange={handleInputChange} />
		<input type="text" name="lastname" id="lastname" placeholder="Last Name" onChange={handleInputChange} />
		<input type="text" name="middlename" id="middlename" placeholder="Middle Name" onChange={handleInputChange} />
		<input type="text" name="suffix" id="suffix" placeholder="Suffix" onChange={handleInputChange} />
		<input type="email" name="email" id="email" placeholder="Email" onChange={handleInputChange} />
		<input type={visible ? "text" : "password" } name="password" id="password" placeholder="Password" onChange={handleInputChange} />
		<input type={visible ? "text" : "password" } name="confirmpassword" id="confirmpassword" placeholder="Confirm Password" onChange={handleInputChange} />
		<button type="button" onClick={setVisibility}></button>
		<input type="text" name="username" id="username" placeholder="Username" onChange={handleInputChange} />
		<input type="number" name="contact" id="contact" placeholder="Contact Number" onChange={handleInputChange} />

		<h1>Optional (Profile Only)</h1>

		<input type="email" name="secondaryemail" id="secondaryemail" placeholder="Secondary Email" onChange={handleInputChange} />
		<input type="text" name="jobtitle" id="jobtitle" placeholder="Job Title" onChange={handleInputChange} />
		<input type="text" name="organization" id="organization" placeholder="Organization" onChange={handleInputChange} />
		<input type="text" name="department" id="department" placeholder="Department" onChange={handleInputChange} />
		<input type="text" name="street" id="street" placeholder="Street" onChange={handleInputChange} />
		<input type="text" name="city" id="city" placeholder="City" onChange={handleInputChange} />
		<input type="text" name="state" id="state" placeholder="State" onChange={handleInputChange} />
		<input type="text" name="postal" id="postal" placeholder="Postal" onChange={handleInputChange} />
		<input type="date" name="birthday" id="birthday" placeholder="Birthday"onChange={handleInputChange} />

		<select name="gender" id="gender">
			<option value="" selected="selected" disabled>-- Options --</option>
			<option value="male">Male</option>
			<option value="female">Female</option>
			<option value="others">Others</option>
		</select>

		<input type="submit" value="register" onClick={handleSubmit}/>
	</form>
	)
}

export default Register;