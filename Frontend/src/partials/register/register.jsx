import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '/src/assets/MainLogo.svg';
import PostRequest from '../../hooks/PostRequest';

function Register() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstname: "", lastname: "", email: "", password: "",
    confirmpassword: "", username: "", contact: "",
    organization: "", currency: "USD",
    recurrance: "Monthly", income: ""
  });

  const [errors, setErrors] = useState({});
  const [walletForm, setWalletForm] = useState(false);
  const [visible, setVisible] = useState(false);

  const currencyTypes = ["PHP", "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "SGD", "HKD", "NZD", "ZAR", "BRL", "RUB", "MXN", "KRW", "AED", "SEK", "NOK", "DKK", "THB", "IDR", "TRY", "SAR", "MYR", "PLN", "ILS", "VND", "CLP", "COP"];
  const recurranceTypes = ['Monthly', 'Semi-Monthly', 'Annually', 'Quarterly'];

  const setVisibility = () => setVisible(prev => !prev);

  const validate = () => {
    const newErrors = {};
    if (!formValues.firstname.trim()) newErrors.firstname = "First name is required.";
    if (!formValues.lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!formValues.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formValues.email)) newErrors.email = "Invalid email format.";
    if (!formValues.password) newErrors.password = "Password is required.";
    else if (formValues.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (formValues.password !== formValues.confirmpassword) newErrors.confirmpassword = "Passwords do not match.";
    if (!formValues.username.trim()) newErrors.username = "Username is required.";
    if (!formValues.contact || formValues.contact.length < 7 || formValues.contact.length > 15) newErrors.contact = "Invalid contact number.";
    if (walletForm) {
      if (!formValues.income) newErrors.income = "Income is required.";
      else if (Number(formValues.income) <= 0) newErrors.income = "Income must be greater than 0.";
      if (!formValues.organization.trim()) newErrors.organization = "Organization is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      setWalletForm(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validate()) return;

    const formData = { ...formValues }

    try {
      const response = await PostRequest('register', formData);
      console.log(response)
      if (!response) throw new Error("Registration failed.");
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
            <img className={styles.formLogo} src={Logo} alt="Logo" draggable="false" />
          </a>
        </div>
        <h3 className={styles.welcome}>Welcome to Pandora!</h3>
        <form onSubmit={walletForm ? handleSubmit : handleNext}>
          {walletForm ? (
            <section>
              <div className={styles.selectionDiv}>
                <select name="currency" value={formValues.currency} onChange={handleInputChange}>
                  {currencyTypes.map((currency, index) => (
                    <option key={index} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                value={formValues.organization}
                onChange={handleInputChange}
              />
              {errors.organization && <p className={styles.error}>{errors.organization}</p>}
              <div className={styles.selectionDiv}>
                <select name="recurrance" value={formValues.recurrance} onChange={handleInputChange}>
                  {recurranceTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                name="income"
                placeholder="Income"
                value={formValues.income}
                onChange={handleInputChange}
              />
              {errors.income && <p className={styles.error}>{errors.income}</p>}
            </section>
          ) : (
            <section>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formValues.firstname}
                onChange={handleInputChange}
              />
              {errors.firstname && <p className={styles.error}>{errors.firstname}</p>}
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formValues.lastname}
                onChange={handleInputChange}
              />
              {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleInputChange}
              />
              {errors.username && <p className={styles.error}>{errors.username}</p>}
              <input
                type="number"
                name="contact"
                placeholder="Contact Number"
                value={formValues.contact}
                onChange={handleInputChange}
              />
              {errors.contact && <p className={styles.error}>{errors.contact}</p>}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
              <div className={styles.passwordContainer}>
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formValues.password}
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
                  placeholder="Confirm Password"
                  value={formValues.confirmpassword}
                  onChange={handleInputChange}
                />
                <button type="button" onClick={setVisibility} className={styles.visibilityToggle}>
                  <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.confirmpassword && <p className={styles.error}>{errors.confirmpassword}</p>}
            </section>
          )}
          <h4>By signing up, you agree to our terms and conditions.</h4>
          <div className={styles.reg}>
            {walletForm && <input type="button" value="Back" onClick={() => setWalletForm(false)} />}
            <input type="submit" value={walletForm ? "Register" : "Next"} />
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
