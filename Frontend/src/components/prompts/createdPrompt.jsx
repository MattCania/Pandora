import styles from './confirmPrompt.module.css';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CreatedPrompt({ subText, close }) {
    return (
        <div className={styles.blur}>
            <section className={styles.section}>
                <header className={styles.header}>
                    <button onClick={close}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </header>
                <div className={styles.bodyCreated}>
                    <h1>
                        <FontAwesomeIcon icon={faCheckCircle} /> 
                        {subText ? subText : "Record Successfully Created"}
                    </h1>
                </div>
            </section>
        </div>
    );
}

export default CreatedPrompt;
