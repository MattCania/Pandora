import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./company.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Company() {
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [members, setMembers] = useState([]);
  const companyId = 1; // This should be dynamic, e.g., from route params

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1);
  };

  // Fetch company details and members
  useEffect(() => {
    // Fetch company details
    const fetchCompany = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch company details");
        }
        const companyData = await response.json();
        setCompany(companyData);
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    // Fetch company members
    const fetchMembers = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/members`);
        if (!response.ok) {
          throw new Error("Failed to fetch company members");
        }
        const membersData = await response.json();
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchCompany();
    fetchMembers();
  }, [companyId]);

  // Render loading state while data is being fetched
  if (!company || members.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <section className={styles.companySection}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className={styles.companyTitle}>Company Profile</h1>
      </header>
      <div className={styles.profileContainer}>
        <div className={styles.detail}>
          <h2>Company Name:</h2>
          <p>{company.companyName}</p>
        </div>
        <div className={styles.detail}>
          <h2>Team Members:</h2>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.jobTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Company;
