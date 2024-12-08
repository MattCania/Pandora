import styles from './confirmPrompt.module.css';
import { faCheckCircle, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreatedPrompt({ subText, close }) {
    return (
        <div className={styles.blur}>
            <section className={styles.section}>
                <header className={styles.header}>
                    <h1>Success</h1>
                    <button onClick={close}><FontAwesomeIcon icon={faX} /></button>
                </header>
                <div className={styles.bodyCreated}>
                    <h1>
                        <FontAwesomeIcon icon={faCheckCircle} /> {subText ? subText : "Record Created Successfully!"}
                    </h1>
                </div>
                <div className={styles.buttonDiv}>
                    <button onClick={close} className={styles.cancel}>Close</button>
                </div>
            </section>
        </div>
    );
}

export default CreatedPrompt;
