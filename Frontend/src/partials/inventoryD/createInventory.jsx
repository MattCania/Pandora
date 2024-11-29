import { useState } from "react";
import styles from './create.module.css';

function InventoryForm() {
    const [formData, setFormData] = useState({
        recordId: "",
        recordName: "",
        description: "",
        category: "",
        unitPrice: "",
        accessType: "",
        createdAt: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            recordId: "",
            recordName: "",
            description: "",
            category: "",
            unitPrice: "",
            accessType: "",
            createdAt: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted successfully!");
        console.log("Submitted Data: ", formData);
    };

    return (
        <section className={styles.formSection}>
            <h1>Inventory Form</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="recordId">#</label>
                    <input
                        type="text"
                        id="recordId"
                        name="recordId"
                        value={formData.recordId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="recordName">Record Name</label>
                    <input
                        type="text"
                        id="recordName"
                        name="recordName"
                        value={formData.recordName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="unitPrice">Unit Price</label>
                    <input
                        type="number"
                        id="unitPrice"
                        name="unitPrice"
                        value={formData.unitPrice}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="accessType">Access Type</label>
                    <select
                        id="accessType"
                        name="accessType"
                        value={formData.accessType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Access Type</option>
                        <option value="Read">Read</option>
                        <option value="Write">Write</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="createdAt">Created At</label>
                    <input
                        type="date"
                        id="createdAt"
                        name="createdAt"
                        value={formData.createdAt}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button type="reset" onClick={handleReset} className={styles.resetButton}>
                        Reset
                    </button>
                    <button type="submit" className={styles.submitButton}>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
}

export default InventoryForm;
