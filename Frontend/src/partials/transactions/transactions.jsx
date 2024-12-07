import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import GetData from "../../hooks/GetData";
import styles from "./transactions.module.css";
import SubHeader from "../../components/overviews/subheader";
import ConfirmPrompt from "../../components/prompts/confirmingPrompt";
import DeleteRequest from "../../hooks/DeleteRequest";

function Transactions() {
  const navigate = useNavigate();
  const { transaction, recordId, access } = useParams();
  const [data, setData] = useState([]);
  const [record, setRecord] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTransactions = async () => {
    try {
      if (!transaction || !recordId) return;
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
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [transaction]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredData = data.filter((item) => {
    const transactionId = item.transactionId.toString();
    const description = item.description.toLowerCase();
    const amount = item.amount.toString();
    const search = searchTerm.toLowerCase();

    return (
      transactionId.includes(search) ||
      description.includes(search) ||
      amount.includes(search)
    );
  });

  const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

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
        throw new Error("Failed to delete the transaction");
      }

      fetchTransactions();
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

  return (
    <section className={styles.section}>
      <header className={styles.subHeader}>
        <h1>Record: {record.recordName} </h1>
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
              <div className={styles.id}>Transaction Id</div>
              <div className={styles.name}>Description</div>
              <div className={styles.access}>Amount</div>
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
                  <div className={styles.id}>{data.transactionId}</div>
                  <div className={styles.name}>{data.description}</div>
                  <div className={styles.access}>{data.amount}</div>
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
                          return; // Block further execution
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
                          return; // Block further execution
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
    </section>
  );
}

export default Transactions;
