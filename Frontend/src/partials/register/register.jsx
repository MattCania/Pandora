import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '/src/assets/MainLogo.svg'
import PostRequest from '../../hooks/PostRequest'

function Register() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstname: "", lastname: "", email: "", password: "",
    confirmpassword: "", username: "",
    contact: "", organization: "",
    currency: "" || 'USD',
    country: "", recurrance: '' || 'Monthly',
    income: 0.0
  });

  const [walletForm, setWalletForm] = useState(false)

  const setWallet = () => {

    validate
    setWalletForm(walletForm => !walletForm)
  }

  const currencyTypes = ["PHP", "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "SGD", "HKD", "NZD", "ZAR", "BRL", "RUB", "MXN", "KRW", "AED", "SEK", "NOK", "DKK", "THB", "IDR", "TRY", "SAR", "MYR", "PLN", "ILS", "VND", "CLP", "COP"]
  const recurranceTypes = ['Monthly', 'Semi-Monthly', 'Annually', 'Quarterly']
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);

  const setVisibility = () => {
    setVisible(prev => !prev);
  };


  const validate = () => {
    let newErrors = {};
    if (!formValues.income) newErrors.income = "Income field is required"
    if (!formValues.firstname.trim()) newErrors.firstname = "First name is required.";
    if (!formValues.lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!formValues.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formValues.email)) newErrors.email = "Invalid email format.";
    if (!formValues.password) newErrors.password = "Password is required.";
    else if (formValues.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (formValues.password !== formValues.confirmpassword) newErrors.confirmpassword = "Passwords do not match.";
    if (!formValues.username.trim()) newErrors.username = "Username is required.";
    if (formValues.contact.length < 7 || !formValues.contact || formValues.contact.length > 15) newErrors.contact = "Invalid contact number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [existingInput, setExistingInput] = useState({
    firstname: "", lastname: "", email: "", password: "",
    confirmpassword: "", username: "",
    contact: "", organization: "",
    currency: "" || 'USD',
    country: "", recurrance: '' || 'Monthly',
    income: 0.0
  });


  const handleInputChange = (e) => {
    setErrors("")
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
    setExistingInput(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = { ...formValues };

    try {

      const response = await PostRequest('register', formData)
      if (!response) throw new Error("Error Registration");
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
        <form onSubmit={walletForm ? handleSubmit : (e) => { e.preventDefault(); setWallet(); }}>
          {walletForm ?
            <section>

              <div className={styles.selectionDiv}>
                <select name="currency" id="currency" value={existingInput.currency} onChange={handleInputChange}>
                  {currencyTypes.map((data, index) => (
                    <option key={index} value={data}>{data}</option>
                  ))
                  }
                </select>
              </div>
              <input
                type="text"
                name="organization"
                id="organization"
                placeholder="Organization"
                onChange={handleInputChange}
              />

              <div className={styles.selectionDiv}>

                <select name="recurrance" id="recurrance" value={existingInput.recurrance} onChange={handleInputChange}>
                  {recurranceTypes.map((data, index) => (
                    <option key={index} value={data}>{data}</option>
                  ))
                  }

                </select>
              </div>

              <input
                type="number"
                name="income"
                id="income"
                placeholder='Income'
                value={existingInput.income}
                onChange={handleInputChange}
              />
              {errors.income && <p className={styles.error}>{errors.income}</p>}
            </section> :

            <section>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                value={existingInput.firstname}
                onChange={handleInputChange}
              />
              {errors.firstname && <p className={styles.error}>{errors.firstname}</p>}

              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
                value={existingInput.lastname}
                onChange={handleInputChange}
              />
              {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}

              
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={existingInput.username}
                onChange={handleInputChange}
              />
              {errors.username && <p className={styles.error}>{errors.username}</p>}

              <input
                type="number"
                name="contact"
                id="contact"
                placeholder="Contact Number"
                value={existingInput.contact}
                onChange={handleInputChange}
              />
              {errors.contact && <p className={styles.error}>{errors.contact}</p>}

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={existingInput.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}


              <div className={styles.passwordContainer}>
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={existingInput.password}
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
                  value={existingInput.confirmpassword}
                  onChange={handleInputChange}
                />

                <button type="button" onClick={setVisibility} className={styles.visibilityToggle}>
                  <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.confirmpassword && <p className={styles.error}>{errors.confirmpassword}</p>}
            </section>

          }
          <h4>By signing up, you agree to our terms and conditions.</h4>
          <div className={styles.reg}>
            {walletForm &&
              <input type='button' value='Back' onClick={setWallet} />
            }
            <input type='submit' value={walletForm ? "Register" : "Next"} />
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