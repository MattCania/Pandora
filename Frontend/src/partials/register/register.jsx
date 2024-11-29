import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '/src/assets/MainLogo.svg'

function Register() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    firstname: "", lastname: "", middlename: "", suffix: "",
    email: "", password: "", confirmpassword: "", username: "",
    contact: "", secondaryemail: "", jobtitle: "", organization: "",
    department: "", street: "", city: "", state: "", postal: "", birthday: "",
  });

  const [visible, setVisible] = useState(false);

  const setVisibility = () => {
    setVisible(prev => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...formValues };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error Registration")
      navigate('/login')
        
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.logo}>
          <a href="/landing"> 
            <img className={styles.formLogo} src={Logo} alt="" draggable="false" />
          </a>
        </div>
        <h3 className={styles.welcome}>Welcome to Pandora!</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstname" id="firstname" placeholder="First Name" onChange={handleInputChange} />
          <input type="text" name="lastname" id="lastname" placeholder="Last Name" onChange={handleInputChange} />
          <input type="text" name="middlename" id="middlename" placeholder="Middle Name" onChange={handleInputChange} />
          <input type="text" name="suffix" id="suffix" placeholder="Suffix" onChange={handleInputChange} />
          <input type="email" name="email" id="email" placeholder="Email" onChange={handleInputChange} />
          <div className={styles.passwordContainer}>
            <input
              type={visible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <button type="button" onClick={setVisibility} className={styles.visibilityToggle}>
              <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
            </button>
          </div>

          <div className={styles.passwordContainer}>
            <input
              type={visible ? "text" : "password"}
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />
            <button type="button" onClick={setVisibility} className={styles.visibilityToggle}>
              <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
            </button>
          </div>

          <input type="text" name="username" id="username" placeholder="Username" onChange={handleInputChange} />
          <input type="number" name="contact" id="contact" placeholder="Contact Number" onChange={handleInputChange} />
          <h3>Optional (Profile Only)</h3>
          <input type="email" name="secondaryemail" id="secondaryemail" placeholder="Secondary Email" onChange={handleInputChange} />
          <input type="text" name="jobtitle" id="jobtitle" placeholder="Job Title" onChange={handleInputChange} />
          <input type="text" name="organization" id="organization" placeholder="Organization" onChange={handleInputChange} />
          <input type="text" name="department" id="department" placeholder="Department" onChange={handleInputChange} />
          <input type="text" name="street" id="street" placeholder="Street" onChange={handleInputChange} />
          <input type="text" name="city" id="city" placeholder="City" onChange={handleInputChange} />
          <input type="text" name="state" id="state" placeholder="State" onChange={handleInputChange} />
          <input type="text" name="postal" id="postal" placeholder="Postal" onChange={handleInputChange} />
          <input type="date" name="birthday" id="birthday" placeholder="Birthday" onChange={handleInputChange} />
          <div className={styles.gender}>
            <select name="gender" id="gender">
              <option value="" selected="selected" disabled>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <h4>By signing up, you agree to our terms and conditions.</h4>
          <div className={styles.reg}>
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
      <div className={styles.imageSection}>
        <img src="../src/assets/reg.svg" alt="Pandora" />
      </div>
    </div>
  );
}

export default Register;

