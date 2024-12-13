import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import GetData from "../../hooks/GetData";
import SubHeader from "./subheader";
import styles from "./overview.module.css";
import PostRequest from "../../hooks/PostRequest";
import GetSession from "../../hooks/GetSession";

function HomeWallet() {
  const user = GetSession();
  const [editMode, toggleEditMode] = useState(false);
  const [walletInfo, setWalletInfo] = useState({ recurrance: "", income: 0, wallet: 0 });
  const [formValues, setFormValues] = useState({ ...walletInfo });

  const fetchWallet = async () => {
    try {
      const wallet = await GetData("user-wallet");
      if (!wallet || wallet.length === 0) throw new Error("User Wallet Does Not Exist");
      setWalletInfo(wallet.result);
      setFormValues(wallet.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const toggleModes = () => {
    toggleEditMode((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await PostRequest("update-wallet", formValues);
      if (!response) throw new Error("Error Updating Wallet");
      toggleModes();
      fetchWallet();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    user && (
      <section className={styles.Section}>
        <div className={styles.subSection}>
		<SubHeader text="Wallet Overview" subText="As of 2024" />
          <div className={styles.walletHeader}>
            <FontAwesomeIcon icon={faWallet} size="2x" className={styles.walletIcon} />
            <h2 className={styles.walletTitle}>Wallet Amount</h2>
          </div>

          <form className={styles.walletForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="wallet" className={styles.formLabel}>
                Current Balance
              </label>
              <div className={styles.inputGroup}>
                <span className={styles.currencySymbol}>{user.profile.currency}</span>
                <h1
                  // type="text"
                  // id="wallet"
                  // name="wallet"
                  // value={formValues.wallet}
                  // readOnly={!editMode}
                  // onChange={handleInputChange}
                  className={`${styles.walletInput} ${editMode ? styles.editable : ""}`}
                >
                  {Number(formValues.wallet).toFixed(2)}
                </h1>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  );
}

export default HomeWallet;
