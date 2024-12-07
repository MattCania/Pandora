import React, { useState } from "react";
import styles from "./settings.module.css";
function Settings() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [username, setUsername] = useState("User123");
    const handleDarkModeToggle = () => setDarkMode(!darkMode);
    const handleNotificationsToggle = () => setNotifications(!notifications);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const saveChanges = () => {
        alert("Settings saved!");
    };
    return (
        <section className={styles.settingsSection}>
            <header className={styles.header}>
                <h1>Settings</h1>
            </header>
            <div className={styles.settingsContainer}>
                {/* Preferences */}
                <div className={styles.settingsGroup}>
                    <h2>Preferences</h2>
                    <div className={styles.setting}>
                        <span>Dark Mode:</span>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={handleDarkModeToggle}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    <div className={styles.setting}>
                        <span>Notifications:</span>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={handleNotificationsToggle}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
                {/* Save Button */}
                <div className={styles.actions}>
                    <button className={styles.saveButton} onClick={saveChanges}>
                        Save Changes
                    </button>
                </div>
            </div>
        </section>
    );
}
export default Settings;