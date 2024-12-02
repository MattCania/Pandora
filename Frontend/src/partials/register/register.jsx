import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '/src/assets/MainLogo.svg'

function Register() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstname: "", lastname: "", middlename: "", suffix: "",
    email: "", password: "", confirmpassword: "", username: "",
    contact: "", secondaryemail: "", jobtitle: "", organization: "",
    department: "", street: "", city: "", state: "", postal: "", birthday: "",
  });

  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);

  const setVisibility = () => {
    setVisible(prev => !prev);
  };


  const validate = () => {
    let newErrors = {};
    if (!formValues.firstname.trim()) newErrors.firstname = "First name is required.";
    if (!formValues.lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!formValues.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formValues.email)) newErrors.email = "Invalid email format.";
    if (!formValues.password) newErrors.password = "Password is required.";
    else if (formValues.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (formValues.password !== formValues.confirmpassword) newErrors.confirmpassword = "Passwords do not match.";
    if (!formValues.username.trim()) newErrors.username = "Username is required.";
    if (formValues.contact && !/^\d{11}$/.test(formValues.contact)) newErrors.contact = "Invalid contact number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setErrors("")
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = { ...formValues };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error Registration");
      navigate('/login');
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
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            onChange={handleInputChange}
          />
          {errors.firstname && <p className={styles.error}>{errors.firstname}</p>}

          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            onChange={handleInputChange}
          />
          {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}

          <input
            type="text"
            name="middlename"
            id="middlename"
            placeholder="Middle Name"
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="suffix"
            id="suffix"
            placeholder="Suffix"
            onChange={handleInputChange}
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

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
          {errors.password && <p className={styles.error}>{errors.password}</p>}

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
          {errors.confirmpassword && <p className={styles.error}>{errors.confirmpassword}</p>}

          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={handleInputChange}
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}

          <input
            type="number"
            name="contact"
            id="contact"
            placeholder="Contact Number"
            onChange={handleInputChange}
          />
          {errors.contact && <p className={styles.error}>{errors.contact}</p>}

          {/* Additional fields omitted for brevity */}
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
