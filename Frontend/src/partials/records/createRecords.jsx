import { useState } from "react";
import SubHeader from "../../components/overviews/subheader";
import styles from "./create.module.css";

function CreateRecords() {
    // State to manage records
    const [records, setRecords] = useState([]);
    const [formData, setFormData] = useState({
        recordId: "",
        recordName: "",
        accessType: "Read",
        createdAt: new Date().toISOString().split("T")[0],
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Add a new record
    const handleAddRecord = (e) => {
        e.preventDefault();

        if (!formData.recordId || !formData.recordName) {
            alert("Please fill in all required fields.");
            return;
        }

        setRecords((prev) => [...prev, formData]);
        setFormData({
            recordId: "",
            recordName: "",
            accessType: "Read",
            createdAt: new Date().toISOString().split("T")[0],
        });
    };

    // Reset form
    const handleReset = () => {
        setFormData({
            recordId: "",
            recordName: "",
            accessType: "Read",
            createdAt: new Date().toISOString().split("T")[0],
        });
    };

    return (
        <div className={styles.section}>
            <SubHeader title="Manage Records" />
            <div className={styles.formContainer}>
                <h2>Add New Record</h2>
                <form onSubmit={handleAddRecord} className={styles.form}>
                    <label>
                        Record ID:
                        <input
                            type="text"
                            name="recordId"
                            value={formData.recordId}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Record Name:
                        <input
                            type="text"
                            name="recordName"
                            value={formData.recordName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Access Type:
                        <select
                            name="accessType"
                            value={formData.accessType}
                            onChange={handleInputChange}
                        >
                            <option value="Read">Read</option>
                            <option value="Write">Write</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </label>
                    <label>
                        Created At:
                        <input
                            type="date"
                            name="createdAt"
                            value={formData.createdAt}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <div className={styles.formButtons}>
                        <button type="reset" onClick={handleReset}>
                            Reset
                        </button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>

            <div className={styles.tableContainer}>
                <h2>Record List</h2>
                <table className={styles.table}>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th>#</th>
                            <th>Record ID</th>
                            <th>Record Name</th>
                            <th>Access Type</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {records.map((record, index) => (
                            <tr key={index} className={styles.row}>
                                <td>{index + 1}</td>
                                <td>{record.recordId}</td>
                                <td>{record.recordName}</td>
                                <td>{record.accessType}</td>
                                <td>{record.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CreateRecords;
