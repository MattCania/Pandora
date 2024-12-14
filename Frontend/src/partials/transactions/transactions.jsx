import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import GetData from "../../hooks/GetData";
import styles from "./transactions.module.css";
import SubHeader from "../../components/overviews/subheader";
import ConfirmPrompt from "../../components/prompts/confirmingPrompt";
import DeleteRequest from "../../hooks/DeleteRequest";
import ConfirmDeletion from "../../components/prompts/confirmDeletion";
import GetSession from "../../hooks/GetSession";
import Loading from "../loading/loading"; // Import the Loading component

function Transactions() {
  const navigate = useNavigate();
  const user = GetSession();
  const { transaction, recordId, access } = useParams();
  const [data, setData] = useState([]);
  const [record, setRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currencyType, setCurrencyType] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const fetchTransactions = async () => {
    if (!user) return;
    const currency = await user.profile.currency;
    setCurrencyType(currency);
    try {
      if (!transaction || !recordId) return;

      setIsLoading(true); // Start loading
      const transactionData = await GetData(`get-${transaction}/${recordId}`);
      if (!transactionData) {
        throw new Error("Transactions Null or Undefined");
      }

      const records = await GetData(`records/open/${recordId}`);
      if (!records) {
        throw new Error("Records Data Unfound?");
      }

      setRecord(records);
      setData(transactionData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [transaction, user]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredData = data.filter((item) => {
    const transactionId = item.transactionId.toString();
    const description = item.description.toLowerCase();
    const amount = item.amount.toString();
    const status = item.status.toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      transactionId.includes(search) ||
      description.includes(search) ||
      amount.includes(search) ||
      status.includes(search)
    );
  });

  const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [showConfirmedPrompt, setShowConfirmedPrompt] = useState(false);

  const triggerDeletePrompt = (e, transactionId) => {
    e.stopPropagation();
    setTransactionToDelete(transactionId);
    setShowConfirmPrompt(true);
  };

  const confirmDeletion = async () => {
    try {
      if (!transactionToDelete) return;

      const response = await DeleteRequest(
        `delete-${transaction.toLowerCase().slice(0, -1)}/${transactionToDelete}`
      );
      if (!response) {
        throw new Error("Failed to delete the record");
      }

      fetchTransactions();
      setShowConfirmedPrompt(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setShowConfirmPrompt(false);
      setTransactionToDelete(null);
    }
  };

  const openTransaction = (type, id, access) => {
    navigate(`/home/transaction/${type}/${id}/${access}`);
  };

  if (isLoading) {
    return <Loading />; // Show loading while data is being fetched
  }

  return (
    filteredData &&
    data &&
    user && (
      <section className={styles.section}>
        <header className={styles.subHeader}>
          <h1>Record: {record.recordName}</h1>
        </header>

        <section className={styles.subSection}>
          <SubHeader
            text="Expense Transaction Record"
            searchUp={true}
            placeholder="Search Transactions"
            inputChange={handleSearchChange}
            buttonClick={
              access !== "Viewer"
                ? () =>
                    navigate(
                      `/home/transaction/create/${transaction.toLowerCase()}/${recordId}`
                    )
                : null
            }
          />
          <section className={styles.displaySection}>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div className={styles.index}>#</div>
                <div className={styles.access}>Transaction Id</div>
                <div className={styles.name}>Description</div>
                <div className={styles.amount}>Amount</div>
                <div className={styles.creation}>Status</div>
                <div className={styles.creation}>Created At</div>
                {access !== "Viewer" && (
                  <>
                    <div className={styles.edit}>Edit</div>
                    <div className={styles.delete}>Delete</div>
                  </>
                )}
              </div>
              <div className={styles.tableBody}>
                {filteredData.map((data, index) => (
                  <div
                    className={styles.row}
                    key={index}
                    onClick={() =>
                      openTransaction(transaction, data.transactionId, access)
                    }
                  >
                    <div className={styles.index}>{index + 1}</div>
                    <div className={styles.access}>{data.transactionId}</div>
                    <div className={styles.name}>{data.description}</div>
                    <div className={styles.amount}>
                      {currencyType} {Number(data.amount).toFixed(2)}
                    </div>
                    <div className={styles.creation}>{data.status}</div>
                    <div className={styles.creation}>
                      {new Date(data.transactionDate).toLocaleDateString()}
                    </div>
                    <div className={styles.edit}>
                      <Link
                        className={access !== "Viewer" ? "" : styles.disabled}
                        onClick={(e) => {
                          if (access === "Viewer") {
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                          }
                          e.stopPropagation();
                        }}
                        to={`/home/transaction/edit/${transaction
                          .toLowerCase()
                          .slice(0, -1)}/${data.transactionId}`}
                      >
                        {access === "Viewer" ? (
                          <FontAwesomeIcon icon={faBan} />
                        ) : (
                          <FontAwesomeIcon icon={faEdit} />
                        )}
                      </Link>
                    </div>
                    <div className={styles.delete}>
                      <button
                        disabled={access !== "Admin"}
                        onClick={(e) => {
                          if (access === "Editor" || access === "Viewer") {
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                          }
                          triggerDeletePrompt(e, data.transactionId);
                        }}
                      >
                        {access === "Editor" || access === "Viewer" ? (
                          <FontAwesomeIcon icon={faBan} />
                        ) : (
                          <FontAwesomeIcon icon={faTrash} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
        {showConfirmPrompt && (
          <ConfirmPrompt
            mainText="Confirm Deletion"
            subText={`Are you sure you want to delete Transaction ${transactionToDelete}?`}
            cancelText="Cancel"
            proceedText="Delete"
            close={() => setShowConfirmPrompt(false)}
            action={confirmDeletion}
          />
        )}
        {showConfirmedPrompt && (
          <ConfirmDeletion
            subText="The record has been successfully deleted!"
            close={() => setShowConfirmedPrompt(false)}
          />
        )}
      </section>
    )
  );
}

export default Transactions;
