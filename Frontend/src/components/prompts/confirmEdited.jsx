import styles from './confirmPrompt.module.css';
import { faCheckCircle, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ConfirmEdited ({ subtext, close }) {
    return (
        <div className={styles.blur}>
        <section className={styles.section}>
            <header className={styles.header}>
                <button onClick={close}><FontAwesomeIcon icon={faX}/></button>
            </header>
            <div className={styles.bodyDeleted}>
                <h1><FontAwesomeIcon icon={faCheckCircle}/>{ subText ? subText : "Editing Successful"}</h1>
            </div>
        </section>
    </div>
    );
}

export default ConfirmEdited;